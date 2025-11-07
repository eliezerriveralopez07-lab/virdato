// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {MyToken} from "../src/MyToken.sol";

contract MyTokenTest is Test {
    MyToken token;
    address admin = address(0xA11CE);
    address bob   = address(0xB0B);

    function setUp() public {
        token = new MyToken(admin, 1_000_000 ether);
    }

    function testInitialSupplyToAdmin() public {
        assertEq(token.balanceOf(admin), 1_000_000 ether);
    }

    function testMintRequiresRole() public {
        // Grant MINTER_ROLE to bob as the admin
        vm.startPrank(admin);
        token.grantRole(token.MINTER_ROLE(), bob);
        vm.stopPrank();

        // Bob can mint now
        vm.prank(bob);
        token.mint(bob, 100 ether);
        assertEq(token.balanceOf(bob), 100 ether);
    }

    function test_RevertWhen_MintWithoutRole() public {
        vm.expectRevert(); // no MINTER_ROLE
        token.mint(bob, 1 ether);
    }
}

