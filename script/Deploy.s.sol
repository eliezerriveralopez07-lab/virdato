// forge script script/Deploy.s.sol:Deploy --rpc-url $AMOY_RPC --private-key $PK --broadcast --verify
pragma solidity ^0.8.20;
import "forge-std/Script.sol";
import "../src/contracts/Token.sol";

contract Deploy is Script {
  function run() external {
    uint256 pk = vm.envUint("PK");
    vm.startBroadcast(pk);
    VirdToken token = new VirdToken("Vird Token", "VIRD", vm.addr(pk), 1_000_000 ether);
    console2.log("TOKEN", address(token));
    vm.stopBroadcast();
  }
}
