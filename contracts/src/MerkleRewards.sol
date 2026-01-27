// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IRewardDistributor {
    function merkleRoots(uint256 epoch) external view returns (bytes32);
}

contract MerkleRewards {
    /// @notice VIRD / VDT token used for rewards
    IERC20 public immutable VDT;

    /// @notice Reward distributor that publishes Merkle roots
    IRewardDistributor public immutable DISTRIBUTOR;

    /// @notice epoch => user => claimed
    mapping(uint256 => mapping(address => bool)) public claimed;

    constructor(address vdt, address distributor) {
        VDT = IERC20(vdt);
        DISTRIBUTOR = IRewardDistributor(distributor);
    }

    /**
     * @notice Claim rewards for a given epoch
     * @param epoch Reward epoch number
     * @param amount Amount of VDT allocated to the caller
     * @param proof Merkle proof proving (caller, amount) is in the epoch root
     */
    function claim(
        uint256 epoch,
        uint256 amount,
        bytes32[] calldata proof
    ) external {
        require(!claimed[epoch][msg.sender], "Already claimed");

        bytes32 root = DISTRIBUTOR.merkleRoots(epoch);
        require(root != bytes32(0), "Merkle root not set");

        bytes32 leaf = keccak256(abi.encode(msg.sender, amount));
        require(
            MerkleProof.verify(proof, root, leaf),
            "Invalid Merkle proof"
        );

        claimed[epoch][msg.sender] = true;
        require(VDT.transfer(msg.sender, amount), "Token transfer failed");
    }
}
