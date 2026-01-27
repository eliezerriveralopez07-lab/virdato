// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RewardDistributor {
    address public dao;

    uint256 public constant EPOCH_LENGTH = 7 days;
    uint256 public currentEpoch;
    uint256 public epochStart;

    mapping(uint256 => bytes32) public merkleRoots;
    mapping(uint256 => bool) public finalized;

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    constructor(address _dao) {
        require(_dao != address(0), "Zero DAO");
        dao = _dao;
        epochStart = block.timestamp;
    }

    /// @notice Production path: finalize only after epoch length has passed
    function finalizeEpoch(bytes32 merkleRoot) external onlyDAO {
        require(!finalized[currentEpoch], "Epoch finalized");
        require(block.timestamp >= epochStart + EPOCH_LENGTH, "Epoch ongoing");

        merkleRoots[currentEpoch] = merkleRoot;
        finalized[currentEpoch] = true;

        currentEpoch++;
        epochStart = block.timestamp;
    }

    /// @notice DEV/TESTNET ONLY: finalize immediately (no 7-day wait)
    /// @dev Do NOT deploy this version to mainnet unless you intentionally keep this.
    function forceFinalizeEpoch(bytes32 merkleRoot) external onlyDAO {
        require(!finalized[currentEpoch], "Epoch finalized");

        merkleRoots[currentEpoch] = merkleRoot;
        finalized[currentEpoch] = true;

        currentEpoch++;
        epochStart = block.timestamp;
    }

    /// @notice Optional: update DAO/admin (useful when moving to multisig)
    function setDAO(address newDao) external onlyDAO {
        require(newDao != address(0), "Zero DAO");
        dao = newDao;
    }
}
