Link: https://snapshot.org/#/morpho.eth/proposal/0x8a0c9e3675fb9a53d0816c03b048b82f77aa132bca068a682756b27904ba775a
Title: MIP52 - Winding down low usage assets on Optimizers

This submission proposes to wind down low usage assets on Optimizers

As written in the forum on 11 April 2024, discussion related to that: https://forum.morpho.org/t/mip-winding-down-low-usage-assets-on-optimizers/566

Here was the discussion related to that:
- Summary
We propose to slowly deprecate low-usage assets (assets with less than $1m of deposit) and stopping rewards on those markets on the different Optimizer instances. We also propose divide the total number of MORPHO rewards distributed by 2 on Optimizers.

- Motivations
The usage of CompoundV2 Optimizer has slowly decreased over time, and CompoundV2 has recently entered Phase 10 of its deprecation process. As a consequence, the P2P has already been disabled on all of its markets. Hence, we proposed to pause the supply and borrow from those markets.
In the case of AaveV2 Optimizer, there’s still a lot of usage compared to the CompoundV2 Optimizer, but the protocol is slowly being deprecated as well. Hence, we propose to move more slowly and only deprecate the CRV asset.
In the case of AaveV3 Optimizer, most of the borrow positions are collateralized by wstETH, USDC, and rETH. The other assets can be safely wind-down as well due to their very low usage.
Moreover, users can now migrate their positions from AaveV2/V3 and AaveV3 Optimizers here. Morpho Blue was deployed 3 months ago and has already reached $900m of total deposit making it an ideal venue for lending/borrowing on Ethereum.
Finally, to encourage users to move to Morpho Blue, we propose dividing the total number of MORPHO rewards currently distributed to Optimizer’s markets by 2 and removing rewards on the markets in scope listed below.
The assets under scope are the following:
CompoundV2 Optimizer: COMP ($827.59), WETH ($67.1k), UNI ($117.57k), USDT ($319.28k)
AaveV2 Optimizer: CRV ($275.16k)
AaveV3 Optimizer: DAI ($486.78), WBTC ($74.73), cbETH ($8919.33), sDAI ($0.10), USDT ($0)

- Specification
The wind-down actions would be the following:
1. Pause supply and borrow on all markets listed above.
2. Deprecate CRV on AaveV2 Optimizer.
3. Stop MORPHO rewards on these markets.
4. Divide by 2 the total number of MORPHO rewards distributed to Optimizers’ users.

The proposal was voted on and accepted on 19 April 2024.