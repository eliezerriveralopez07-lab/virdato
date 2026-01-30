// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

import "../contracts/src/RewardDistributorDev.sol";
import "../contracts/src/MerkleRewardsV2.sol";
import "../contracts/src/SlashingModuleV2.sol";

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock", "MOCK") { }

    function mint(address to, uint amt) external {
        _mint(to, amt);
    }
}

contract VirdatoV2CleanTest is Test {
    address dao = makeAddr("dao");
    address treasury = makeAddr("treasury");
    address alice = makeAddr("alice");

    MockToken token;
    RewardDistributorDev dist;
    MerkleRewardsV2 rewards;
    SlashingModuleV2 slashing;

    function setUp() public {
        token = new MockToken();
        dist = new RewardDistributorDev(dao);
        rewards = new MerkleRewardsV2(address(token), address(dist), dao, treasury);
        slashing = new SlashingModuleV2(address(token), dao, treasury);

        token.mint(address(rewards), 1_000 ether);
    }

    // Empty bytes32` (prevents your local rewrite bug)
    function _emptyProof() internal pure returns (bytes32[] memory arr) {
        assembly {
            arr := mload(0x40)
            mstore(arr, 0)
            mstore(0x40, add(arr, 0x20))
        }
    }

    function testClaimFailsIfRootNotSet() public {
        vm.expectRevert(bytes("Merkle root not set"));
        vm.prank(alice);
        rewards.claim(0, 10 ether, _emptyProof());
    }

    function testSlashingDaoOnly() public {
        token.mint(alice, 10 ether);

        vm.startPrank(alice);
        token.approve(address(slashing), 10 ether);
        slashing.bond(2 ether);
        vm.stopPrank();

        vm.prank(alice);
        vm.expectRevert(bytes("Not DAO"));
        slashing.slash(alice, 1 ether, bytes32("fraud"));

        vm.prank(dao);
        slashing.slash(alice, 1 ether, bytes32("fraud"));
        assertEq(slashing.bonded(alice), 1 ether);
    }
}
