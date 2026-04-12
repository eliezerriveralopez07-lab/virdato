// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/src/RewardDistributorDev.sol";

contract DeployRewardDistributorDevScript is Script {
    function run() external {
        address dao = vm.envAddress("DAO_ADDRESS");

        vm.startBroadcast();
        RewardDistributorDev distributor = new RewardDistributorDev(dao);
        vm.stopBroadcast();

        console2.log("RewardDistributorDev deployed at:", address(distributor));
        console2.log("DAO set to:", dao);
    }
}