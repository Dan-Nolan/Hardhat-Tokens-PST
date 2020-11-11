// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract Club {
    mapping(address => bool) public isMember;

    function join(address _addr) external {
        require(IERC20(_addr).transferFrom(msg.sender, address(this), 10 * 10 ** 18));
        isMember[msg.sender] = true;
    }
}
