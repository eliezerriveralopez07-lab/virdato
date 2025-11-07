// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Pausable} from "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract VirdatoToken is ERC20, ERC20Permit, ERC20Pausable, Ownable {
    constructor(address owner_, uint256 initialSupply)
        ERC20("Virdato", "VIRD")
        ERC20Permit("Virdato")
        Ownable(owner_) // <-- v5 requires this
    {
        _mint(owner_, initialSupply);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }
}
