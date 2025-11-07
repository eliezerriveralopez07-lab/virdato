// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {MyToken} from "../src/MyToken.sol";

contract Deploy is Script {
    function run() external {
        uint256 pk = vm.envUint("PK");
        address admin = vm.envAddress("ADMIN");
        vm.startBroadcast(pk);
        new MyToken(admin, 1_000_000 ether);
        vm.stopBroadcast();
    }
}
