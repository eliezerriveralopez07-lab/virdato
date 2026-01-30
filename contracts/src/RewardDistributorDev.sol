// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice Minimal distributor that stores merkle roots per epoch.
///         DAO finalizes epochs (publishes roots). This contract is the "source of truth"
///         for MerkleRewardsV2 verification.
contract RewardDistributorDev {
    address public dao;
    bool public frozen;

    uint public currentEpoch;
    mapping(uint => bytes32) public merkleRoots;

    event EpochFinalized(uint indexed epoch, bytes32 root, uint timestamp);
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

    constructor(address _dao) {
        require(_dao != address(0), "DAO=0");
        dao = _dao;
    }

    /// @notice Publish merkle root for currentEpoch and then increment epoch.
    function forceFinalizeEpoch(bytes32 root) external onlyDAO {
        // Root can be zero in dev, but for production you usually require non-zero.
        merkleRoots[currentEpoch] = root;
        emit EpochFinalized(currentEpoch, root, block.timestamp);
        currentEpoch += 1;
    }

    /// @notice Irreversible freeze (locks governance wiring).
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
}
