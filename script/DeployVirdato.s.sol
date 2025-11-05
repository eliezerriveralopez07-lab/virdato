// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {VirdatoToken} from "../src/VirdatoToken.sol";

contract DeployVirdato is Script {
    function run() external {
        address owner = vm.envAddress("OWNER");
        uint256 supply = vm.envUint("INITIAL_SUPPLY"); // in wei (e.g., 1e24 for 1M VIRD with 18 decimals)

        vm.startBroadcast();
        new VirdatoToken(owner, supply);
        vm.stopBroadcast();
    }
}
