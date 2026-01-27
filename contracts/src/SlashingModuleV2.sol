// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SlashingModuleV2 {
    IERC20 public immutable TOKEN;
    address public dao;
    address public treasury;

    // max slash per call (basis points). 5000 = 50%
    uint256 public maxSlashBps = 5000;

    mapping(address => uint256) public bonded;

    event Bonded(address indexed user, uint256 amount);
    event Slashed(address indexed user, uint256 amount, bytes32 reason);
    event WithdrawnToTreasury(uint256 amount);
    event DAOChanged(address indexed oldDao, address indexed newDao);
    event TreasuryChanged(address indexed oldTreasury, address indexed newTreasury);
    event MaxSlashBpsChanged(uint256 oldBps, uint256 newBps);

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    constructor(address token, address _dao, address _treasury) {
        require(token != address(0), "Zero token");
        require(_dao != address(0), "Zero dao");
        require(_treasury != address(0), "Zero treasury");
        TOKEN = IERC20(token);
        dao = _dao;
        treasury = _treasury;
    }

    function bond(uint256 amount) external {
        require(amount > 0, "Amount=0");
        bonded[msg.sender] += amount;
        require(TOKEN.transferFrom(msg.sender, address(this), amount), "Bond failed");
        emit Bonded(msg.sender, amount);
    }

    function slash(address user, uint256 amount, bytes32 reason) external onlyDAO {
        require(amount > 0, "Amount=0");
        uint256 b = bonded[user];
        require(b >= amount, "Insufficient bond");

        uint256 maxAmount = (b * maxSlashBps) / 10000;
        require(amount <= maxAmount, "Slash exceeds max");

        bonded[user] = b - amount;
        emit Slashed(user, amount, reason);
    }

    function withdrawToTreasury(uint256 amount) external onlyDAO {
        require(amount > 0, "Amount=0");
        require(TOKEN.transfer(treasury, amount), "Withdraw failed");
        emit WithdrawnToTreasury(amount);
    }

    function setDAO(address newDao) external onlyDAO {
        require(newDao != address(0), "Zero dao");
        emit DAOChanged(dao, newDao);
        dao = newDao;
    }

    function setTreasury(address newTreasury) external onlyDAO {
        require(newTreasury != address(0), "Zero treasury");
        emit TreasuryChanged(treasury, newTreasury);
        treasury = newTreasury;
    }

    function setMaxSlashBps(uint256 newBps) external onlyDAO {
        require(newBps <= 10000, "Bps>10000");
        emit MaxSlashBpsChanged(maxSlashBps, newBps);
        maxSlashBps = newBps;
    }
}
