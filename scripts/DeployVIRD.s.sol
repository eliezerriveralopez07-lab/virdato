// script/DeployVIRD.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol"; // <-- correct path

contract DeployVIRD is Script {
    function run() external {
        vm.startBroadcast();
        // deploy your contracts here...
        vm.stopBroadcast();
    }
}

