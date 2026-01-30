// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RewardDistributorProd {
    address public dao;

    uint public constant EPOCH_LENGTH = 7 days;
    uint public currentEpoch;
    uint public epochStart;

    mapping(uint => bytes32) public merkleRoots;
    mapping(uint => uint) public finalizedAt; // epoch => timestamp
    mapping(uint => bool) public finalized;

    event EpochFinalized(uint indexed epoch, bytes32 root, uint finalizedAt);
    event DAOChanged(address indexed oldDao, address indexed newDao);

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    constructor(address _dao) {
        require(_dao != address(0), "Zero DAO");
        dao = _dao;
        epochStart = block.timestamp;
    }

    function finalizeEpoch(bytes32 root) external onlyDAO {
        require(!finalized[currentEpoch], "Epoch finalized");
        require(block.timestamp >= epochStart + EPOCH_LENGTH, "Epoch ongoing");
        require(root != bytes32(0), "Zero root");

        merkleRoots[currentEpoch] = root;
        finalized[currentEpoch] = true;
        finalizedAt[currentEpoch] = block.timestamp;

        emit EpochFinalized(currentEpoch, root, block.timestamp);

        currentEpoch++;
        epochStart = block.timestamp;
    }

    function setDAO(address newDao) external onlyDAO {
        require(newDao != address(0), "Zero DAO");
        emit DAOChanged(dao, newDao);
        dao = newDao;
    }
}
