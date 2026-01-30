// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

interface IRewardDistributor {
    function merkleRoots(uint epoch) external view returns (bytes32);
}

/// @notice Merkle-claim rewards. Leaf: keccak256(abi.encode(epoch, account, amount))
///         DAO can sweep unclaimed tokens to treasury.
///         Phase-4: DAO can freeze governance wiring (setDAO/setTreasury) irreversibly.
contract MerkleRewardsV2 {
    IERC20 public immutable token;
    IRewardDistributor public immutable distributor;

    address public dao;
    address public treasury;
    bool public frozen;

    mapping(uint => mapping(address => bool)) public claimed;

    event Claimed(uint indexed epoch, address indexed account, uint amount);
    event Swept(address indexed treasury, uint amount);
    event DaoUpdated(address indexed oldDao, address indexed newDao);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event Frozen(uint timestamp);

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    modifier notFrozen() {
        require(!frozen, "Frozen");
        _;
    }

    constructor(address _token, address _distributor, address _dao, address _treasury) {
        require(_token != address(0), "TOKEN=0");
        require(_distributor != address(0), "DISTRIBUTOR=0");
        require(_dao != address(0), "DAO=0");
        require(_treasury != address(0), "TREASURY=0");

        token = IERC20(_token);
        distributor = IRewardDistributor(_distributor);
        dao = _dao;
        treasury = _treasury;
    }

    /// @notice Claim rewards for epoch.
    /// @dev Proof can be empty for 1-leaf trees.
    function claim(uint epoch, uint amount, bytes32[] calldata proof) external {
        require(!claimed[epoch][msg.sender], "Already claimed");

        bytes32 root = distributor.merkleRoots(epoch);
        require(root != bytes32(0), "Merkle root not set");

        bytes32 leaf = keccak256(abi.encode(epoch, msg.sender, amount));
        bool ok = MerkleProof.verify(proof, root, leaf);
        require(ok, "Invalid Merkle proof");

        claimed[epoch][msg.sender] = true;

        require(token.transfer(msg.sender, amount), "Transfer failed");
        emit Claimed(epoch, msg.sender, amount);
    }

    /// @notice Sweep tokens to treasury (DAO only).
    function sweepToTreasury(uint amount) external onlyDAO {
        require(token.transfer(treasury, amount), "Transfer failed");
        emit Swept(treasury, amount);
    }

    /// @notice Freeze governance wiring (DAO only). Irreversible.
    function freeze() external onlyDAO notFrozen {
        frozen = true;
        emit Frozen(block.timestamp);
    }

    /// @notice Update DAO (disabled after freeze).
    function setDAO(address newDao) external onlyDAO notFrozen {
        require(newDao != address(0), "DAO=0");
        emit DaoUpdated(dao, newDao);
        dao = newDao;
    }

    /// @notice Update treasury (disabled after freeze).
    function setTreasury(address newTreasury) external onlyDAO notFrozen {
        require(newTreasury != address(0), "TREASURY=0");
        emit TreasuryUpdated(treasury, newTreasury);
        treasury = newTreasury;
    }
}
