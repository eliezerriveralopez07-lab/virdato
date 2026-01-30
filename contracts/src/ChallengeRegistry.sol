// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISlashingModuleV2 {
    function bonded(address account) external view returns (uint);
}

/// @notice Minimal challenge registry (Phase 4A concept).
///         Stores challenges for off-chain resolution.
///         Optional gate: can require an account to be bonded >= minBond to open a challenge.
///         Phase-4: governance wiring can be frozen.
contract ChallengeRegistry {
    IERC20 public immutable vird;
    ISlashingModuleV2 public immutable slashing;

    address public dao;
    bool public frozen;

    uint public minBondWei = 1 ether;

    struct Challenge {
        address challenger;
        address target;
        bytes32 reason;
        uint timestamp;
    }

    Challenge[] public challenges;

    event ChallengeOpened(
        uint indexed id, address indexed challenger, address indexed target, bytes32 reason
    );
    event MinBondUpdated(uint oldMin, uint newMin);
    event DaoUpdated(address indexed oldDao, address indexed newDao);
    event Frozen(uint timestamp);

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    modifier notFrozen() {
        require(!frozen, "Frozen");
        _;
    }

    constructor(address _vird, address _slashing, address _dao) {
        require(_vird != address(0), "VIRD=0");
        require(_slashing != address(0), "SLASHING=0");
        require(_dao != address(0), "DAO=0");

        vird = IERC20(_vird);
        slashing = ISlashingModuleV2(_slashing);
        dao = _dao;
    }

    function challengeCount() external view returns (uint) {
        return challenges.length;
    }

    /// @notice Open a challenge (requires challenger bonded >= minBondWei)
    function openChallenge(address target, bytes32 reason) external returns (uint id) {
        require(target != address(0), "TARGET=0");
        require(slashing.bonded(msg.sender) >= minBondWei, "Not bonded enough");

        challenges.push(
            Challenge({
                challenger: msg.sender, target: target, reason: reason, timestamp: block.timestamp
            })
        );

        id = challenges.length - 1;
        emit ChallengeOpened(id, msg.sender, target, reason);
    }

    function freeze() external onlyDAO notFrozen {
        frozen = true;
        emit Frozen(block.timestamp);
    }

    function setDAO(address newDao) external onlyDAO notFrozen {
        require(newDao != address(0), "DAO=0");
        emit DaoUpdated(dao, newDao);
        dao = newDao;
    }

    function setMinBondWei(uint newMin) external onlyDAO notFrozen {
        emit MinBondUpdated(minBondWei, newMin);
        minBondWei = newMin;
    }
}
