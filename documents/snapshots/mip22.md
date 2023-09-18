Link: https://snapshot.org/#/morpho.eth/proposal/0x5e0410251d0e03dfc316feaa6ef7ce56f52328e22215e85b600adfa123e0918a
Title: MIP22 - List sDAI and USDT as Collateral on the AaveV3-ETH Optimizer
This submission proposes to list sDAI and USDT as collateral only on the AaveV3-ETH Optimizer as it would unlock new usecases for sDAI and USDT holders.

As written in the forum on 2 September 2023, discussion related to that: https://forum.morpho.org/t/mip-list-sdai-and-usdt-as-collateral-on-the-aavev3-eth-optimizer/349

Here was the discussion related to that:
Summary
The Morpho Association proposes to list sDAI and USDT as collateral only on the AaveV3-ETH Optimizer as it would unlock new usecases for sDAI and USDT holders.

Abstract
The Morpho Labs’ team has carefully reviewed the implementation contracts and run productions tests (https://github.com/morpho-org/morpho-aave-v3/blob/main/test/prod/TestProdLifecycle.sol) on a fork and seatbelt tests (https://github.com/morpho-org/morpho-seatbelt/pull/53) to make sure those assets are safe to be listed. As the Optimizer is in ETH emode, the same configuration as for rETH or cbETH recently listed should be applied.

Specification
The proposal can be translated into the following steps to be batched on the MorphoAdmin for sDAI:
1) `createMarket(sDAI, reserveFactor = 0, p2pIndexCursor = 0)`
2) `setAssetIsCollateralOnPool(sDAI, true)`
3) `setAssetIsCollateral(sDAI, true)`
4) `setIsSupplyPaused(sDAI, true)`
5) `setIsWithdrawPaused(sDAI, true)`
6) `setIsBorrowPaused(sDAI, true)`
7) `setIsRepayPaused(sDAI, true)`
8) `setIsLiquidateBorrowPaused(sDAI, true)`
9) `setIsP2PDisabled(sDAI, true)`

And for USDT:
1) `createMarket(USDT, reserveFactor = 0, p2pIndexCursor = 0)`
2) `setAssetIsCollateralOnPool(USDT, true)`
3) `setAssetIsCollateral(USDT, true)`
4) `setIsSupplyPaused(USDT, true)`
5) `setIsWithdrawPaused(USDT, true)`
6) `setIsBorrowPaused(USDT, true)`
7) `setIsRepayPaused(USDT, true)`
8) `setIsLiquidateBorrowPaused(USDT, true)`
9) `setIsP2PDisabled(USDT, true)`

References
- [ARFC] sDAI Aave V3 Onboarding - #7 by ghostlyenergy - Governance - Aave (https://governance.aave.com/t/arfc-sdai-aave-v3-onboarding/14410/7)
- [ARC] Aave V3 Ethereum Deployment: Assets and Configurations - #22 by Pauljlei - General - Aave (https://governance.aave.com/t/arc-aave-v3-ethereum-deployment-assets-and-configurations/10238/22)
- https://github.com/morpho-org/morpho-aave-v3/blob/main/test/prod/TestProdLifecycle.sol

The proposal was voted on and accepted on 9 September 2023.
