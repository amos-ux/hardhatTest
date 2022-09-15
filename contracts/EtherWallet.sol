// SPDX-License-Identifier: NONE
pragma solidity ^0.8.9;

contract EtherWallet {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier checkOwner() {
        require(msg.sender == owner, "not is owner");
        _;
    }
    
    //receive
    receive() external payable {}

    function withdraw(uint256 _amount) external checkOwner {
        // tranfer
        payable(msg.sender).transfer(_amount);
        //send
        // bool sent = payable(msg.sender).send(_amount);
        // require(sent,"send filed");

        //Call
        // (bool success, ) = payable(msg.sender).call{value: _amount}("");
        // require(success,"call filed");
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
