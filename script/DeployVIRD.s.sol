// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {VirdatoToken} from "../src/VirdatoToken.sol";

contract DeployVirdato is Script {
    function run() external {
        address owner = vm.envAddress("OWNER");
        uint256 supply = vm.envUint("INITIAL_SUPPLY"); // e.g., 1e24 for 1,000,000 VIRD

        vm.startBroadcast();
        new VirdatoToken(owner, supply);
        vm.stopBroadcast();
    }
}
