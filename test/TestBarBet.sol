pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BarBet.sol";

contract TestBarBet {
  BarBet barBet = BarBet(DeployedAddresses.BarBet());

}
