// script/Deploy.s.sol
// forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --private-key $PK --broadcast
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/Token.sol";

contract Deploy is Script {
    function run() external {
        // Use whichever broadcaster forge is given via CLI (--private-key, --ledger, etc.)
        vm.startBroadcast();

        VirdToken token = new VirdToken(
            "Vird Token",
            "VIRD",
            msg.sender,          // initial owner
            1_000_000 ether      // initial supply
        );

        console2.log("TOKEN", address(token));

        vm.stopBroadcast();
    }
}
