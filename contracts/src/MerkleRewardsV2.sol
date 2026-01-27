// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDistributorV2 {
    function merkleRoots(uint256 epoch) external view returns (bytes32);
    function finalizedAt(uint256 epoch) external view returns (uint256);
}

contract MerkleRewardsV2 {
    IERC20 public immutable TOKEN;
    IDistributorV2 public immutable DISTRIBUTOR;

    address public dao;
    address public treasury;

    // C3: claim expiry window (tune as you like)
    uint256 public constant CLAIM_WINDOW = 16 weeks;

    mapping(uint256 => mapping(address => bool)) public claimed;

    event Claimed(uint256 indexed epoch, address indexed user, uint256 amount);
    event Swept(address indexed to, uint256 amount);
    event DAOChanged(address indexed oldDao, address indexed newDao);
    event TreasuryChanged(address indexed oldTreasury, address indexed newTreasury);

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    constructor(address token, address distributor, address _dao, address _treasury) {
        require(token != address(0) && distributor != address(0), "Zero address");
        require(_dao != address(0) && _treasury != address(0), "Zero admin");
        TOKEN = IERC20(token);
        DISTRIBUTOR = IDistributorV2(distributor);
        dao = _dao;
        treasury = _treasury;
    }

    function claim(uint256 epoch, uint256 amount, bytes32[] calldata proof) external {
        require(!claimed[epoch][msg.sender], "Already claimed");

        bytes32 root = DISTRIBUTOR.merkleRoots(epoch);
        require(root != bytes32(0), "Merkle root not set");

        uint256 tFinal = DISTRIBUTOR.finalizedAt(epoch);
        require(tFinal != 0, "Epoch not finalized");
        require(block.timestamp <= tFinal + CLAIM_WINDOW, "Claim window closed");

        // C2: epoch-aware leaf prevents proof reuse across epochs
        bytes32 leaf = keccak256(abi.encode(epoch, msg.sender, amount));
        require(MerkleProof.verify(proof, root, leaf), "Invalid Merkle proof");

        claimed[epoch][msg.sender] = true;
        require(TOKEN.transfer(msg.sender, amount), "Transfer failed");

        emit Claimed(epoch, msg.sender, amount);
    }

    // C3: sweep leftovers after claim period (DAO controls)
    function sweepToTreasury(uint256 amount) external onlyDAO {
        require(amount > 0, "Amount=0");
        require(TOKEN.transfer(treasury, amount), "Sweep failed");
        emit Swept(treasury, amount);
    }

    function setDAO(address newDao) external onlyDAO {
        require(newDao != address(0), "Zero DAO");
        emit DAOChanged(dao, newDao);
        dao = newDao;
    }

    function setTreasury(address newTreasury) external onlyDAO {
        require(newTreasury != address(0), "Zero treasury");
        emit TreasuryChanged(treasury, newTreasury);
        treasury = newTreasury;
    }
}
