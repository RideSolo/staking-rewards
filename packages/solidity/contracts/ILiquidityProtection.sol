// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ILiquidityProtectionDataStore.sol";

/**
 * @dev Liquidity protection minimal interface
 */
interface ILiquidityProtection {
    function store() external view returns (ILiquidityProtectionDataStore);

    function addLiquidityFor(
        address owner,
        IERC20 poolToken,
        IERC20 reserveToken,
        uint256 reserveAmount
    ) external payable returns (uint256);
}
