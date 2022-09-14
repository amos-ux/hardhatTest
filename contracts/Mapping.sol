// SPDX-License-Identifier: NONE
pragma solidity ^0.8.9;

contract Mapping {
    struct BalanceStruct{
      address adr;
      bool complete;
    }
    BalanceStruct[] public BalanceList;
    mapping(address => uint256) public balances;
    mapping(address => bool) public interted;
    address[] public keys;
    uint public index;
    // set balance
    function set(address _address, uint256 _value) external {
        if (!interted[_address]) {
            interted[_address] = true;
        }
        balances[_address]=_value;
        keys.push(_address);
        index+=1;


        // struct
        BalanceList.push(BalanceStruct({adr:_address,complete:true}));
    }
    //get balance
    function get(uint _index) external view returns(uint) {
      return balances[keys[_index]];
    }
    //size
    function getSize() external view returns(uint){
      return index;
    }

    // update strcut
    function updateStruct(uint _index,address _address) external {
      // 1
      // BalanceList[_index].adr=_address;
      //2
      BalanceStruct storage Balance=BalanceList[_index];
      Balance.adr=_address;
    }
  // get strcut
     function getStrcut(uint256 _index) external view returns (address) {
        BalanceStruct memory Balance = BalanceList[_index];
        return Balance.adr;
    }
}
