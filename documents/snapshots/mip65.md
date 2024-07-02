Link: https://snapshot.org/#/morpho.eth/proposal/0x36baf3190e0bca7accde3a5d77af444ba9ec22928b610d7574e1af3a288f4e7f 
Title: MIP65 - New Scalable Rewards Model on Ethereum

This submission proposes to introduce a new framework for distributing MORPHO rewards to Morpho Blue users.

As written in the forum on 3 June 2024, discussion related to that: https://forum.morpho.org/t/mip65-new-scalable-rewards-model/617

Here was the discussion related to that:
- Summary
This proposal introduces a new framework for distributing MORPHO rewards to Morpho Blue users.
The framework defines a set of trusted vault curators and applies a uniform reward rate for each dollar supplied in a market listed by these curators. It also includes rewarding borrowers using a similar model.

- Context
Rewards are a powerful tool for bootstrapping a protocol. In an increasingly competitive lending landscape, attracting liquidity to reach the critical market sizes necessary for organic growth is a top priority.
On Morpho Blue, up until now, MORPHO rewards have been distributed to suppliers on a market-by-market basis, often within a co-incentive framework. Specifically, a certain amount of MORPHO was allocated to a market for a certain period of time, which was then shared among the lenders in that market.
While this approach allows for targeted, market-specific strategies, it also presents several challenges:
    - Scalability: As the number of markets with rewards programs grows, so does the number of operations to perform.
    - Incentive misalignment:
        - Differences in reward rates between markets can distort vault allocation and inhibit use case exploration.
        - Rewards from a market listed in a single vault are fully captured by that vault, regardless of the volume allocated to that market (assuming the volume is not zero).
    - Opinionated: While we emphasize that the allocation of rewards does not imply an endorsement of market risk, the incentives appear to be market specific.
We advocate for a revised method of distributing rewards on Morpho Blue to effectively address these challenges.

- Proposed new approach
    - Systematized Market Eligibility:
    The idea is to incentivize the overall growth of Morpho Blue, rather than individual markets, by incentivizing every dollar supplied on the protocol by regular users.
    Since market creation is permissionless, we can’t default to including every market. Instead, we propose to use established MetaMorpho vaults as a filter, assuming that markets with potential product market fit and traction will be listed on them.
    Specifically, a set of established curators consisting of each curator who meets the criteria to receive a Morpho Olympics grant (https://forum.morpho.org/t/mip60-introducing-morpho-olympics-rewarding-metamorpho-vault-curators/604/5) will be added to this set. Markets listed in vaults managed by curators in this set will receive MORPHO rewards by default.
    The DAO reserves the right to withhold rewards from specific markets through a dedicated vote. This includes but is not limited to, cases where rewards on a market are deemed unnecessary for its growth.

    - Global MORPHO rate:
    To encourage organic growth and prevent bias in vault allocation, we propose a uniform MORPHO rate across all eligible markets.
    Every dollar of supply in eligible markets, excluding supply from algorithmic market operations, will be rewarded with MORPHO at a uniform rate.
    This uniform rate will be determined by a formula detailed in the forum post.
    The formula ensures that each new dollar of supply is rewarded at a consistent MORPHO rate, up to a predetermined limit to cap the total daily distribution amount.
    Values for the variables $r_0$ and $S_lim$ are proposed in the post.

    - Transition from current to new system
    Current rewards programs with specific end dates will continue until they expire, then transition to the new reward system. Programs without specific end dates will be discontinued and transitioned directly to the new system.

- Rewarding borrowers
Historically, our focus has been on rewarding lenders, with the view that a robust supply side benefits borrowers by increasing liquidity and reducing rates. This strategy has proven effective, but we see value in also incentivizing borrowers directly.
Indeed, rewarding borrowers could address several important issues:
Market stability: During growth phases, markets often experience volume fluctuations that lead to rate volatility. Even if average rates are very competitive over time, rate spikes can be a pain point for borrowers that could be offset by rewarding them with some MORPHO. This is also strategic in the case of high competition on some assets with other protocols.
Attract Borrowers: Some loan assets have significant supply but struggle to attract borrowers.
We propose to incentivize borrowers in eligible markets through a uniform rate, defined as a fraction of $r_S$, set at the loan asset level. These values can be adjusted by governance as markets expand and customized for each chain where Morpho Blue is deployed.
We propose to start incentivising borrowers on Ethereum with a reward rate $r_B = r_S/10$ on the following loan assets: WETH, USDC, USDT, PYUSD.

The proposal was voted on and accepted on 9 June 2024.