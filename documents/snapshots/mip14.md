Link: https://snapshot.org/#/morpho.eth/proposal/0x329b3761ab293642cb6ee8db3d99b4f3b303d7987af2973c90ea7d8b3bf12a7f
Title: MIP14 - MORPHO rewards Age 5
This submission proposes to define the framework for the distribution of rewards for Age 5 starting on May 22nd and ending on July 6th. 

As written in the forum on 16 May 2023, discussion related to that: https://forum.morpho.org/t/mip-morpho-rewards-age-5/303

Here was the discussion related to that:
Summary
The purpose of this post is to define the framework for the distribution of rewards for Age 5 starting on May 22nd and ending on July 6th. We propose to:
- Distribute a total of 1.1 million $MORPHO;
- Focus rewards distribution on markets where peer-to-peer matching is activated;
- Start incentivizing the supply side of the WETH market on the AaveV3-ETH Optimizer.

Details
As a reminder, the previous Age (https://forum.morpho.org/t/mip-morpho-rewards-age-4/281/5) scoped the length of Ages, and reduced rewards emissions. The rationale behind the latter was that the bootstrapping phase of CompoundV2 and AaveV2 optimizers could be considered over and that they could now rely on organic growth as they offer natively better rates than their counterparts.
We suggest cutting rewards in markets where peer-to-peer matching is disabled to focus on markets where Morpho has a clear added value. Moreover, we propose a decrease of 30% in emitted rewards on assets where P2P matching is enabled.
Age 4 has also seen the launch of the AaveV3-ETH optimizer. It represents a significant use case in ETH borrowing with very competitive rates. Incentivizing the supply side could unleash strong growth potential.
Applying the same model as in previous ages (detailed in this forum post https://forum.morpho.org/t/age3-epoch1-gauges-optimized-distribution/233) to compute the distribution of rewards but setting markets with P2P disabled to zero and integrating AaveV3-ETH Optimizer, the markets would receive the shares of rewards during Age 5 as detailed in the forum post there: https://forum.morpho.org/t/mip-morpho-rewards-age-5/303

The allocation of rewards between the supply and borrow side for a given market would follow the repartition of supply and borrow on the market at the beginning of the Age, except for WETH on AaveV3-ETH where it will be focused on the supply side to bootstrap liquidity available for matching.

The proposal was voted on and accepted on 20 May 2023.
