// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SlashingModule {
    /// @notice VIRD / VDT token used for bonding
    IERC20 public immutable VDT;

    /// @notice DAO / admin authority that can slash
    address public dao;

    /// @notice user => bonded amount
    mapping(address => uint256) public bonded;

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    constructor(address vdt, address _dao) {
        VDT = IERC20(vdt);
        dao = _dao;
    }

    /// @notice User bonds tokens (must approve first)
    function bond(uint256 amount) external {
        require(amount > 0, "Amount=0");
        bonded[msg.sender] += amount;
        require(VDT.transferFrom(msg.sender, address(this), amount), "Bond failed");
    }

    /// @notice DAO slashes a user’s bond
    function slash(address user, uint256 amount) external onlyDAO {
        require(amount > 0, "Amount=0");
        require(bonded[user] >= amount, "Insufficient bond");
        bonded[user] -= amount;
        // Note: tokens remain in this contract after slashing (treasury logic comes later)
    }

    /// @notice Optional: allow DAO to change DAO address later (useful when moving to multisig)
    function setDAO(address newDao) external onlyDAO {
        require(newDao != address(0), "Zero address");
        dao = newDao;
    }
}
