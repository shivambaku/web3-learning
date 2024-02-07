// Get funds from users
// Withdraw funds
// Set a minimum funding value of 50 USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

// Errors are more gas efficient than string messages
error NotOwner();


// 923,913
// constant and immutable will decrease the cost
// 904,383 with constant for minimum usd
// 880,900 with immutable for owner
contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner;

    // called when deployed the contract
    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        // Want to be able to set a minimum fund amount in USD
        
        // If require fails everything will revert
        // It will still cost gas to do everything above but no more gas will be needed
        require(msg.value.getConversionRate() > MINIMUM_USD, "Didn't send enough");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        // reset the array
        funders = new address[](0);

        // withdraw the funds (three ways)
        // transfer

        // msg.sender = address
        // payable(msg.sender) = payable address
        // to send ETH you need to be payable
        // transfer automatically fails
        payable(msg.sender).transfer(address(this).balance);

        // send
        bool sendSuccess = payable(msg.sender).send(address(this).balance);
        require(sendSuccess, "Send failed");
        
        // call
        // low level call
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");

        // using call is the recommended way
    }

    modifier onlyOwner {
        // require(msg.sender == i_owner, "Sender is not owner!");
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        // Do the rest of the original function
        _;
    }

    // What happens if someone sends this contract ETH without calling fund
    // Two special functions
    // receive()
    // fallback()
}