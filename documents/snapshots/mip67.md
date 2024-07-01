Link: https://snapshot.org/#/morpho.eth/proposal/0xba7284013de55d81f934e6aa6086d72fece7a421113f05339a068d1fd1dbe03d
Title: MIP67 - Update of MORPHO rewards on Base

This submission proposes several adjustments in the rewards strategy on Base.

As written in the forum on 27 June 2024, discussion related to that: https://forum.morpho.org/t/mip65-new-scalable-rewards-model/617/9

Here was the discussion related to that:
Morpho Blue was launched on Base 10 days ago and has grown strongly since then, with over $40M in deposits already. The Morpho Association proposes several adjustments in the rewards strategy on Base:
- Update supply rewards rate setting:
The initial S_lim set has been far exceeded. We suggest updating the reward model settings on Base with the following values:
r^S_0=2.20E-04 MORPHO per dollar deposited per day
S_lim= $50,000,000
- Start incentivizing borrow:
The supply volumes are significantly higher than the borrowing volumes, resulting in utilization levels below target. To address this, we propose incentivizing the borrowing side on the following loan assets: WETH, USDC. The incentive rate, r^B is proposed to be r^S/3 (0.73E-04 MORPHO per dollar borrowed per day).
- Include idle markets in rewards:
The bootstrapping phase of new markets can be challenging for MetaMorpho vaults. To streamline this process, we suggest including idle markets in both the reward system and the accounting of Morpho Olympics grants (this would apply to Base only).

The vote ended on 1 July 2024 but the necessary quorum was not reached.