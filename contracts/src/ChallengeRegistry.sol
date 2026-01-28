// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISlashingModuleV2 {
    function slash(address user, uint256 amount, bytes32 reason) external;
}

contract ChallengeRegistry {
    IERC20 public immutable vird;
    ISlashingModuleV2 public immutable slashing;

    address public dao;
    uint256 public minChallengeBond;

    struct Challenge {
        address challenger;
        address creator;
        bytes32 contentId;
        uint256 bond;
        bool resolved;
        bool upheld;
        bytes32 reason;
    }

    mapping(uint256 => Challenge) public challenges;
    uint256 public nextId;

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    event Challenged(uint256 indexed id, address indexed challenger, address indexed creator, bytes32 contentId, uint256 bond);
    event Resolved(uint256 indexed id, bool upheld, bytes32 reason, uint256 slashAmount);

    constructor(address _vird, address _slashing, address _dao, uint256 _minBond) {
        vird = IERC20(_vird);
        slashing = ISlashingModuleV2(_slashing);
        dao = _dao;
        minChallengeBond = _minBond;
    }

    function setDAO(address newDao) external onlyDAO { dao = newDao; }
    function setMinChallengeBond(uint256 newBond) external onlyDAO { minChallengeBond = newBond; }

    function openChallenge(address creator, bytes32 contentId) external returns (uint256 id) {
        uint256 bond = minChallengeBond;
        require(bond > 0, "Bond=0");
        require(vird.transferFrom(msg.sender, address(this), bond), "Bond transfer failed");

        id = nextId++;
        challenges[id] = Challenge({
            challenger: msg.sender,
            creator: creator,
            contentId: contentId,
            bond: bond,
            resolved: false,
            upheld: false,
            reason: bytes32(0)
        });

        emit Challenged(id, msg.sender, creator, contentId, bond);
    }

    function resolveChallenge(uint256 id, bool upheld, bytes32 reason, uint256 slashAmount) external onlyDAO {
        Challenge storage c = challenges[id];
        require(!c.resolved, "Already resolved");

        c.resolved = true;
        c.upheld = upheld;
        c.reason = reason;

        if (upheld) {
            if (slashAmount > 0) {
                slashing.slash(c.creator, slashAmount, reason);
            }
            require(vird.transfer(c.challenger, c.bond), "Return bond failed");
        } else {
            require(vird.transfer(dao, c.bond), "Bond to dao failed");
        }

        emit Resolved(id, upheld, reason, slashAmount);
    }
}
