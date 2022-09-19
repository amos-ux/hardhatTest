// SPDX-License-Identifier: NONE
pragma solidity ^0.8.9;

import "./Proxiable.sol";
contract MySol is Proxiable {
    uint public count;
    uint public x;
    event CodeUpdated(address indexed newCode); 
    function updateCode(address newCode) external {
            updateCodeAddress(newCode);
            emit CodeUpdated(newCode);
    }
    function add() external{
            count+=1;
    }
}