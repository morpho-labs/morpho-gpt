Link: https://snapshot.org/#/morpho.eth/proposal/0x3f0e19f22d337442903fe3db0fd3da25e36e4e3d4e1dc51f5577baf5e68399e5
Title: MIP25 - MORPHO Rewards Age 9

This submission proposes to define the framework for the distribution of rewards for Age 9, starting on November 18th.

As written in the forum on 10 november 2023, discussion related to that: https://forum.morpho.org/t/mip-morpho-rewards-age-9/379

Here was the discussion related to that:
Summary
The purpose of this post is to define the framework for the distribution of rewards for Age 9, starting on November 18th.
We propose making the age duration flexible, ending at the official launch of Morpho Blue (date to be determined), and distributing a total of 16k $MORPHO per day during this period.

Details
- Age duration
Once Morpho Blue becomes operational, most growth efforts will focus on its expansion. To fully optimize the reward incentive strategy for Blue, it’s logical to have a flexible end date for Age 9. To ensure that ages align with the launch of Blue, Age 10 would start when Morpho Blue’s address is set at blue.morpho.eth.
- Distribution rate
As Morpho Optimizers continue to gain maturity in their market adoptions, we propose to continue reducing the rewards incentives, decreasing the emission rate by 10%.
During Age 8, 800k $MORPHO tokens were distributed over a span of 45 days. Reducing this distribution rate by 10% results in a daily distribution of 16k $MORPHO tokens.
Applying the same model as in previous ages (detailed in this forum post 1) to compute the distribution of rewards (setting markets with P2P disabled to zero), the markets would receive the shares of rewards described in the proposal: https://forum.morpho.org/t/mip-morpho-rewards-age-9/379

The allocation of rewards between the supply and borrow side for a given market will follow the repartition of supply and borrow on the market at the beginning of the Age, except for WETH where it will be only on the supply side on AaveV3-ETH Optimizer and shared equally on both sides on AaveV2 Optimizer.

The proposal was voted on and accepted on 22 november 2023.
