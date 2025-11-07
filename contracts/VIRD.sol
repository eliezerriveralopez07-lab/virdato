// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20}  from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract VIRD is ERC20, Ownable {
    constructor() ERC20("Virdato", "VIRD") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 ether); // optional bootstrap
    }
    function mint(address to, uint256 amount) external onlyOwner { _mint(to, amount); }
}
