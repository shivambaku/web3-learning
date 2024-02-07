// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FallbackExample {
    uint256 public result;

    // called when calldata with no data
    receive() external payable {
        result = 1;
    }

    // called if calldata with some data
    fallback() external payable {
        result = 2;
    }
}