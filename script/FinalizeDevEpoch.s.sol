// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";

interface IRewardDistributorDev {
    function currentEpoch() external view returns (uint256);
    function finalizeEpoch(bytes32 root) external;
}

contract FinalizeDevEpochScript is Script {
    address constant DISTRIBUTOR = 0xDA0b955259feb479D58a652FA8FFe43B2E973f75;

    function run() external {
        string memory rootStr = vm.envString("MERKLE_ROOT");
        bytes32 root = vm.parseBytes32(rootStr);

        vm.startBroadcast();

        uint256 epochBefore = IRewardDistributorDev(DISTRIBUTOR).currentEpoch();

        IRewardDistributorDev(DISTRIBUTOR).finalizeEpoch(root);

        uint256 epochAfter = IRewardDistributorDev(DISTRIBUTOR).currentEpoch();

        vm.stopBroadcast();

        console2.log("===================================");
        console2.log("Epoch before finalize:", epochBefore);
        console2.log("Epoch after finalize:", epochAfter);
        console2.log("Finalized root:");
        console2.logBytes32(root);
        console2.log("===================================");
    }
}