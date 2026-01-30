// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @notice Bond + slash module.
///         - participants bond tokens
///         - DAO can slash up to maxSlashBps per call (default 50%)
///         Phase-4: governance wiring can be frozen irreversibly.
contract SlashingModuleV2 {
    IERC20 public immutable token;

    address public dao;
    address public treasury;
    bool public frozen;

    // bonded amounts per address
    mapping(address => uint) public bonded;

    // 10_000 = 100%. Default 5_000 = 50% max per slash() call.
    uint public maxSlashBps = 5000;

    event Bonded(address indexed account, uint amount);
    event Unbonded(address indexed account, uint amount);
    event Slashed(address indexed account, uint amount, bytes32 reason);
    event DaoUpdated(address indexed oldDao, address indexed newDao);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event MaxSlashBpsUpdated(uint oldBps, uint newBps);
    event Frozen(uint timestamp);

    modifier onlyDAO() {
        require(msg.sender == dao, "Not DAO");
        _;
    }

    modifier notFrozen() {
        require(!frozen, "Frozen");
        _;
    }

    constructor(address _token, address _dao, address _treasury) {
        require(_token != address(0), "TOKEN=0");
        require(_dao != address(0), "DAO=0");
        require(_treasury != address(0), "TREASURY=0");

        token = IERC20(_token);
        dao = _dao;
        treasury = _treasury;
    }

    function bond(uint amount) external {
        require(amount > 0, "AMOUNT=0");
        bonded[msg.sender] += amount;
        require(token.transferFrom(msg.sender, address(this), amount), "transferFrom failed");
        emit Bonded(msg.sender, amount);
    }

    function unbond(uint amount) external {
        require(amount > 0, "AMOUNT=0");
        uint bal = bonded[msg.sender];
        require(bal >= amount, "Insufficient bond");
        bonded[msg.sender] = bal - amount;
        require(token.transfer(msg.sender, amount), "transfer failed");
        emit Unbonded(msg.sender, amount);
    }

    /// @notice Slash bonded amount and send to treasury (DAO only).
    function slash(address account, uint amount, bytes32 reason) external onlyDAO {
        require(account != address(0), "ACCOUNT=0");
        require(amount > 0, "AMOUNT=0");

        uint bal = bonded[account];
        require(bal >= amount, "Insufficient bond");

        // enforce maxSlashBps per call
        uint maxPerCall = (bal * maxSlashBps) / 10000;
        require(amount <= maxPerCall, "Slash exceeds max per call");

        bonded[account] = bal - amount;
        require(token.transfer(treasury, amount), "transfer failed");

        emit Slashed(account, amount, reason);
    }

    /// @notice Freeze governance wiring (DAO only). Irreversible.
    function freeze() external onlyDAO notFrozen {
        frozen = true;
        emit Frozen(block.timestamp);
    }

    function setDAO(address newDao) external onlyDAO notFrozen {
        require(newDao != address(0), "DAO=0");
        emit DaoUpdated(dao, newDao);
        dao = newDao;
    }

    function setTreasury(address newTreasury) external onlyDAO notFrozen {
        require(newTreasury != address(0), "TREASURY=0");
        emit TreasuryUpdated(treasury, newTreasury);
        treasury = newTreasury;
    }

    function setMaxSlashBps(uint newBps) external onlyDAO notFrozen {
        require(newBps <= 10000, "BPS>100%");
        emit MaxSlashBpsUpdated(maxSlashBps, newBps);
        maxSlashBps = newBps;
    }
}
