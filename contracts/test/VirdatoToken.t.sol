// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import {VirdatoToken} from "../src/VirdatoToken.sol";

contract VirdatoTokenTest is Test {
    VirdatoToken token;
    address owner = address(0xA11CE);

    function setUp() public {
        token = new VirdatoToken(owner, 1_000_000e18);
    }

    function testInitialSupply() public {
        assertEq(token.balanceOf(owner), 1_000_000e18);
    }

    function testPauseFlow() public {
        vm.prank(owner); token.pause();
        vm.expectRevert(); token.transfer(address(1), 1);
        vm.prank(owner); token.unpause();
        token.transfer(address(1), 1);
    }
}
