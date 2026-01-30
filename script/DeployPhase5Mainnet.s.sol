// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console2.sol";

import "../contracts/src/MerkleRewardsV3.sol";
import "../contracts/src/SlashingModuleV3.sol";
import "../contracts/src/RewardDistributorProdV2.sol";

contract DeployPhase5Mainnet is Script {
    function run() external {
        address token = vm.envAddress("VIRD_TOKEN_ADDRESS");
        address daoSafe = vm.envAddress("DAO_SAFE");
        address treasurySafe = vm.envAddress("TREASURY_SAFE");

        vm.startBroadcast();

        // Production distributor (no force finalize; explicit roots)
        RewardDistributorProdV2 distributor = new RewardDistributorProdV2(daoSafe);

        // Freezable V3 contracts
        MerkleRewardsV3 rewards = new MerkleRewardsV3(token, address(distributor), daoSafe, treasurySafe);
        SlashingModuleV3 slashing = new SlashingModuleV3(token, daoSafe, treasurySafe);

        vm.stopBroadcast();

        console2.log("TOKEN:", token);
        console2.log("DAO_SAFE:", daoSafe);
        console2.log("TREASURY_SAFE:", treasurySafe);
        console2.log("DISTRIBUTOR_PROD:", address(distributor));
        console2.log("MERKLE_REWARDS_V3:", address(rewards));
        console2.log("SLASHING_V3:", address(slashing));
    }
}
