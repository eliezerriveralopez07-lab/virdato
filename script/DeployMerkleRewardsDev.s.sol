// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import { MerkleRewardsV2 } from "../contracts/src/MerkleRewardsV2.sol";

contract DeployMerkleRewardsDevScript is Script {
    function run() external {
        address token = 0xAEAc353180809F99437c4F9F23aE9204cA6A123B;
        address distributor = 0xDA0b955259feb479D58a652FA8FFe43B2E973f75;
        address dao = 0x59ff2fDaA71606e4eb63050454ab9D8A418fCAf6;
        address treasury = 0x59ff2fDaA71606e4eb63050454ab9D8A418fCAf6;

        vm.startBroadcast();
        MerkleRewardsV2 rewards = new MerkleRewardsV2(
            token,
            distributor,
            dao,
            treasury
        );
        vm.stopBroadcast();

        console2.log("MerkleRewardsDev deployed at:", address(rewards));
    }
}