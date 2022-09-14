// SPDX-License-Identifier: MIT LICENSE

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This contract is an example of how to add external contracts as trusted controllers with ERC20.
// Created within the context of allowing contracts to directly mint tokens. 
// Developed by ho-oh.eth

contract Token is ERC20, ERC20Burnable, Ownable {
  
  constructor() ERC20("Token", "TKN") { }

  mapping(address => bool) controllers;

  function mint(address to, uint256 amount) external {
    require(controllers[msg.sender], "Only controllers can mint");
    _mint(to, amount);
  }

  function burnFrom(address account, uint256 amount) public override {
      if (controllers[msg.sender]) {
          _burn(account, amount);
      }
      else {
          super.burnFrom(account, amount);
      }
  }

  function addController(address controller) external onlyOwner {
    controllers[controller] = true;
  }

  function removeController(address controller) external onlyOwner {
    controllers[controller] = false;
  }

}
