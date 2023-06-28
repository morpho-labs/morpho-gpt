Link: https://medium.com/morpho-labs/balancer-boosted-morpho-aave-one-of-defis-most-capital-efficient-stable-pools-3e7be7a1686c
Title: Balancer Boosted Morpho-Aave V2 Optimizer Article

Balancer Boosted Morpho-Aave: One of DeFi’s Most Capital-Efficient Stable Pools
07 Apr 2023
Simon Crotty

One of DeFi’s Most Capital-Efficient Stable Pools

Introducing bb-ma2-USD
We are thrilled to announce that the Boosted Morpho-Aave USD (bb-ma2-USD) is live on Balancer!

For those new to Morpho, it is a peer-to-peer layer built on top of Aave. It optimizes underlying lending pools by seamlessly matching lenders and borrowers, allowing them to enjoy better rates while preserving the same risk parameters and liquidity. Morpho users will always receive better, or at worst, the same rates as Aave users.

Just like Morpho-AaveV2 is a pure improvement of AaveV2, bb-ma2-USD is also a pure improvement of the bb-a-USD pool. By utilizing Morpho as its yield source rather than Aave, the yield generated from idle assets will also be better, or at worst, the same as bb-a-USD.

What was already an attractive option for liquidity providers has gotten even better with bb-ma2-USD.

Unfamiliar with Boosted Pools? Let’s revisit their rationale. In liquidity pools, swap prices are determined by pool balances. A large pool is great for traders: the larger the balances, the less the price changes from a given trade. However, a pool will only get large if it is attractive to liquidity providers. Historically, as a pool grows, the return to liquidity providers gets diluted which causes them to allocate their assets elsewhere.

So, what is the solution? Increase a pool’s capital efficiency by putting idle balances to work by supplying assets through yield-generating protocols such as Morpho. Remember, swaps in your typical weighted liquidity pool touch only a fraction of its depth and even less in a stable pool.

idle tokens
Idle tokens in weighted pools
By supplying idle tokens, the interest generated outweighs the negative impacts of dilution. Therefore, liquidity providers remain incentivized to supply assets regardless of pool size. A win-win for both liquidity providers and traders.

To summarize, a Boosted Pool is any pool that utilizes idle tokens to generate yield, improve the capital efficiency of typical liquidity pools, and offer better APRs for liquidity providers. And the best way to enhance a Boosted Pool is by using optimal yield sources, which is exactly what bb-ma2-USD achieves by supplying assets on Morpho.

Bribes for bb-ma2-USD are open
If you are a veBAL holder and want to earn $USDC incentives through voting, you can use the Warden app and take part in the bb-ma2-USD quest. Rewards are fixed at 0.11 USDC/veBAL for a total of ~$2000 USDC for the first round — there will be more in the future.

For liquidity providers who plan to supply assets in bb-ma2-USD, voting for the pool Gauge would make sense as more BAL incentives increase the total APR.

What is under the hood of bb-ma2-USD?
Boosted Morpho-Aave USD is a Composable Stable Pool that facilitates trades between three USD stablecoins: USDC, USDT, and DAI. Each asset is wrapped through Morpho-Aave V2’s market, providing liquidity providers with better yields than non-boosted pools.

bb-ma2-USD
bb-ma2-USD
The three underlying Linear Pools that make up bb-ma2-USD are:
bb-ma2-USDC (consisting of USDC and wrapped maUSDC)
bb-ma2-USDT (consisting of USDT and wrapped maUSDT)
bb-ma2-DAI (consisting of DAI and wrapped maDAI)

bb-ma2-USD linear pools
bb-ma2-USD linear pools
If you are a bb-a-USD liquidity provider, it may be worth switching liquidity to bb-ma2-USD to enjoy better capital efficiency and potentially higher APRs.

Website: morpho.org
Application: app.morpho.org
Whitepaper: whitepaper.morpho.org
Documentation: docs.morpho.org
Twitter: twitter.com/MorphoLabs
Discord: discord
