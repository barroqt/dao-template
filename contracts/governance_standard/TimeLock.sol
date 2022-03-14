// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    constructor(
        uint256 minDelay, // time to wait before executing
        address[] memory proposers, // who can propose
        address[] memory executors // who can execute when a proposal passes
    ) TimelockController(minDelay, proposers, executors) {}
}