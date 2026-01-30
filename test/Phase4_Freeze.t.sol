// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

import "../contracts/src/RewardDistributorDev.sol";
import "../contracts/src/MerkleRewardsV2.sol";
import "../contracts/src/SlashingModuleV2.sol";
import "../contracts/src/ChallengeRegistry.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock", "MOCK") { }

    function mint(address to, uint amt) external {
        _mint(to, amt);
    }
}

contract Phase4FreezeTest is Test {
    address dao = makeAddr("dao");
    address treasury = makeAddr("treasury");
    address other = makeAddr("other");

    MockToken token;
    RewardDistributorDev dist;
    MerkleRewardsV2 rewards;
    SlashingModuleV2 slashing;
    ChallengeRegistry registry;

    function setUp() public {
        token = new MockToken();
        dist = new RewardDistributorDev(dao);
        rewards = new MerkleRewardsV2(address(token), address(dist), dao, treasury);
        slashing = new SlashingModuleV2(address(token), dao, treasury);
        registry = new ChallengeRegistry(address(token), address(slashing), dao);
    }

    function testFreeze_DisablesSetters_MerkleRewards() public {
        vm.prank(dao);
        rewards.freeze();

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        rewards.setTreasury(other);

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        rewards.setDAO(other);
    }

    function testFreeze_DisablesSetters_Slashing() public {
        vm.prank(dao);
        slashing.freeze();

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        slashing.setTreasury(other);

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        slashing.setDAO(other);

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        slashing.setMaxSlashBps(1000);
    }

    function testFreeze_DisablesSetters_Distributor() public {
        vm.prank(dao);
        dist.freeze();

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        dist.setDAO(other);
    }

    function testFreeze_DisablesSetters_ChallengeRegistry() public {
        vm.prank(dao);
        registry.freeze();

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        registry.setDAO(other);

        vm.prank(dao);
        vm.expectRevert(bytes("Frozen"));
        registry.setMinBondWei(2 ether);
    }
}
