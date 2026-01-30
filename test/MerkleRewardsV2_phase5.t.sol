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

contract Phase5RewardsAndSlashingTest is Test {
    MockToken token;
    RewardDistributorDev distributor;
    MerkleRewardsV2 rewards;
    SlashingModuleV2 slashing;

    address dao = makeAddr("dao");
    address treasury = makeAddr("treasury");
    address alice = makeAddr("alice");

    function setUp() public {
        token = new MockToken();
        distributor = new RewardDistributorDev(dao);
        rewards = new MerkleRewardsV2(address(token), address(distributor), dao, treasury);
        slashing = new SlashingModuleV2(address(token), dao, treasury);

        // fund rewards so claims can pay
        token.mint(address(rewards), 10_000 ether);
    }

    function _emptyProof() internal pure returns (bytes32[] memory arr) {
        // returns
        assembly {
            arr := mload(0x40)
            mstore(arr, 0)
            mstore(0x40, add(arr, 0x20))
        }
    }

    // finalize a 1-leaf epoch root for alice using distributor.currentEpoch()
    function _finalizeOneLeafForAlice(uint amount) internal returns (uint epoch, bytes32 root) {
        epoch = distributor.currentEpoch();
        root = keccak256(abi.encode(epoch, alice, amount));

        vm.prank(dao);
        distributor.forceFinalizeEpoch(root);

        // sanity check: distributor stored the root
        assertEq(distributor.merkleRoots(epoch), root);
    }

    // ----------------------------
    // MerkleRewardsV2
    // ----------------------------

    function testHappyPathClaim_OneLeaf() public {
        uint amount = 100 ether;
        (uint epoch,) = _finalizeOneLeafForAlice(amount);

        vm.prank(alice);
        rewards.claim(epoch, amount, _emptyProof());

        assertEq(token.balanceOf(alice), amount);
    }

    function testInvalidProofFails_WhenAmountDiffers() public {
        uint amount = 100 ether;
        (uint epoch,) = _finalizeOneLeafForAlice(amount);

        vm.prank(alice);
        vm.expectRevert(bytes("Invalid Merkle proof"));
        rewards.claim(epoch, 101 ether, _emptyProof());
    }

    function testDoubleClaimFails() public {
        uint amount = 50 ether;
        (uint epoch,) = _finalizeOneLeafForAlice(amount);

        vm.prank(alice);
        rewards.claim(epoch, amount, _emptyProof());

        vm.prank(alice);
        vm.expectRevert(bytes("Already claimed"));
        rewards.claim(epoch, amount, _emptyProof());
    }

    function testClaimFails_IfRootNotSet() public {
        uint epoch = distributor.currentEpoch();
        vm.prank(alice);
        vm.expectRevert(bytes("Merkle root not set"));
        rewards.claim(epoch, 1 ether, _emptyProof());
    }

    // ----------------------------
    // SlashingModuleV2
    // ----------------------------

    function testBondAndSlashBounds() public {
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
