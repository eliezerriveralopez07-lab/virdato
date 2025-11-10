// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {VIRD} from "../contracts/VIRD.sol";

contract DeployVIRD is Script {
    function run() external {
        uint256 key = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(key);
        VIRD token = new VIRD();
        vm.stopBroadcast();
        console2.log("VIRD deployed at:", address(token));
    }
}

