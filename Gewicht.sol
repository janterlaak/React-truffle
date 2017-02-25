
pragma solidity ^0.4.4;

contract Gewicht {
  uint public value;

  event ValueSet(uint val);

  function setValue(uint val) {
    value = val;
    ValueSet(value);
  }

  function getValue() constant returns (uint) {
    return value;
  }
}
