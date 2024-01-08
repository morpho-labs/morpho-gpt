Link: https://snapshot.org/#/morpho.eth/proposal/0xc4ef99d017fb95149bb6c1effbc582fa5be636670dba9cf6de154adf25294cc2
Title: MIP29 - MORPHO Rewards on Optimizers post Morpho Blue launch

This submission proposes define the distribution of rewards on Morpho Optimizers after the Morpho Blue launch on January 9th.

As written in the forum on 4 January 2024, discussion related to that: https://forum.morpho.org/t/mip-morpho-rewards-on-optimizers-post-morpho-blue-launch/416

Here was the discussion related to that:
Summary
This post outlines the distribution of rewards on Morpho Optimizers after the Morpho Blue launch on January 9th.
We propose to:
- Stop using a defined schedule in favor of a flexible daily rate;
- Set the daily rate at 10k $MORPHO;
- Stop distributing rewards on CompoundV2 Optimizer.

Details
For Age 9 (https://forum.morpho.org/t/mip-morpho-rewards-age-9/379), we implemented a constant daily rate of 16k $MORPHO, which was planned to last until the Blue launch.
We propose to keep this flexible way of doing things, with a daily rate that can be adjusted without a defined schedule. As the concept of Ages loses its relevance, it will be abandoned.
Morpho Blue will be launched on January 9th. Most growth efforts will now focus on its expansion. Incentives for Optimizers should therefore be reduced, but not eliminated, as Optimizers are a strong source of user acquisition for the Morpho ecosystem. We propose to set the rate to 10K $MORPHO per day on Optimizers after the launch of Morpho Blue.
We propose to cease incentivizing the CompoundV2 Optimizer, given that Compound V2 is being deprecated, aligning with the logic of focusing rewards on areas with growth potential. Currently only $40M is deposited on the optimizer and less than $3M is matched.
Applying the same model as in previous ages (detailed in this forum post: https://forum.morpho.org/t/age3-epoch1-gauges-optimized-distribution/233) to compute the distribution of rewards (setting markets with P2P disabled to zero), the markets would receive the shares of rewards detailed in the forum post.
The allocation of rewards between the supply and borrow side for a given market will follow the repartition of supply and borrow on the markets on January 9th, except for WETH where it will be only on the supply side on AaveV3-ETH Optimizer and shared equally on both sides on AaveV2 Optimizer.

The proposal was voted on and accepted on 8 january 2024.
