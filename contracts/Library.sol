// SPDX-License-Identifier: NONE
pragma solidity ^0.8.9;

library ArrayLibrary{
  modifier checkLength(uint[] storage arr){
    require(arr.length>0,"not remove arr");
    _;
  }
  function remove(uint[] storage arr,uint _index) public checkLength(arr){
    for(uint i=_index;i<arr.length - 1;i++){
      arr[i]=arr[i+1];
    }
    arr.pop();
  }
}
contract TestArray{
  using ArrayLibrary for uint[];

  uint[] public arr=[1,2,3,4];
  uint public deleteArr;

//1
  function arrayRemove(uint _index) public {
      deleteArr=arr[_index];
      arr.remove(_index);
  }
  //2
//    function arrayRemove(uint _index) public {
//       Array.remove(_index);
//   }
}