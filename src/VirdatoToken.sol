// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {Pausable} from "openzeppelin-contracts/contracts/utils/Pausable.sol";

contract VirdatoToken is ERC20, ERC20Permit, Ownable, Pausable {
    constructor(address owner_, uint256 initialSupply)
        ERC20("Virdato", "VIRD")
        ERC20Permit("Virdato")
    {
        _transferOwnership(owner_);
        _mint(owner_, initialSupply);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override
    {
        require(!paused(), "VIRD: paused");
        super._beforeTokenTransfer(from, to, amount);
    }
}
