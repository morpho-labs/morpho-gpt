Link: https://snapshot.org/#/morpho.eth/proposal/0x31f83c6839e20ef0d230f3df83042ec4d44e18d87edb9e4d403ce45ddd6a59f9
Title: MIP15 - List rETH as collateral only on the AaveV3-ETH Optimizer
This submission proposes to list rETH from Rocket Pool as collateral only on the AaveV3-ETH Optimizer. Note that rETH won't be borrowable.

As written in the forum on 26 May 2023, discussion related to that: https://forum.morpho.org/t/mip-listing-reth-on-morpho-aavev3/310

Here was the discussion related to that:
Summary
This publication presents the Morpho community the opportunity to onboard rETH - the most decentralized Liquid Staking Token (LST) - to Morpho-Aave-v3.

Abstract
Liquid staking tokens benefit greatly from efficient borrowing for leveraged staking strategies. Morpho-Aave-v3 can tap the deeply liquid rETH markets and become a major venue for staking activity in a new market.

Motivation
The rETH token is a prime candidate for inclusion on Morpho-Aave-v3. It is the second largest decentralized LST by market cap and has deep liquidity across several DEX markets. The recent Atlas upgrade enabled users to launch validators with only 8 ETH instead of 16 ETH (compared to 32 ETH for a normal validator) and as a result the protocol’s throughput has increased dramatically - regularly topping 10k rETH minted per day.
Rocket Pool strives to embody the core ethos of Ethereum and DeFi, specifically the non-custodial, trustless nature that allows self-sovereignty to truly thrive. This leads to reduced Counter Party risk relative to other LST providers.
Rocket Pool stakers deposit ETH into the deposit pool, enabling a node operator to create a new Ethereum Network validator. You can stake as little as 0.01 ETH.
In doing so, users are given a token called rETH. rETH represents both how much ETH is deposited, and when the user deposited it. The ratio includes rewards that Rocket Pool node operators earn from:
- The Ethereum network itself
- Priority fees from block proposals
- MEV rewards from block proposals
rETH is a staked, interest earning wrapper of ETH that can be exchanged at any time.
Since the Beacon Chain rewards, priority fees, and MEV rewards will constantly accumulate, this means that rETH’s value effectively always increases relative to ETH.
The rETH/ETH exchange rate is updated approximately every 24 hours based on the Ethereum network rewards earned by Rocket Pool node operators.

Use Case
rETH serves as a great collateral due to its multi-level productive yield features.
- Base rETH Yield
Users gain ~85% of the standard Ethereum staking APR at baseline. The trailing 1-month APR for rETH is 5.06%
- Queued ETH Yield
With the Atlas upgrade on April 17th, the Rocket Pool protocol grew much more capital efficient. Part of the upgrade was making the queue system more efficient. When there is an excess in minipool supply, a queue builds up as node operators wait for rETH deposits. Previously, these node operators would have been unproductive. Now, the earlier minipools can be launched using ETH from later minipools in the queue.
The effect of this queue is that the rETH supply can remain constant, but the amount of ETH productively staked can increase. Currently, with a queue of 62k ETH, the boost is quite substantial. This is reflected in the 7 day rolling APR becoming tightly competitive between rETH and stETH.
Read more about the queue here (https://mirror.xyz/0xfornax.eth/zPz2lRePTYc7m0EfbKwpzO0vLQooSS8tzANshJ3utsM) and see this dune board here (https://dune.com/queries/1916466/3158416).

Specifications
Risk Considerations
Like other positions on Morpho, the risks associated with rETH are multifacet in nature.
The following details risk specific to rETH and includes a comprehensive technical and risk analysis performed by Maker DAO.
[rETH] ERC20 Token Smart Contract Technical Assessment (https://forum.makerdao.com/t/reth-erc20-token-smart-contract-technical-assessment/12885)
[rETH] Collateral Onboarding Risk Evaluation (https://forum.makerdao.com/t/reth-collateral-onboarding-risk-evaluation/15286)
Currently, 1inch enables users to swap 50,000 ETH for 46,629.9 rETH, a 0.02% price impact swap thanks to the new deposit pool allowing for the matching of the entire queue.
This is more than sufficient to enable Morpho users to borrow wETH and leverage rETH without incurring any large loss. On the reverse side, a price impact swap of 1.34% is incurred selling 25,000 rETH for 26,443.6 ETH

Market Volatility
As a soft-pegged asset, rETH is beholded to market forces. The nature of this relationship to the peg has varied through the protocol’s history. When it was launched in 2021, the rETH token traded at a slightly premium as node operator supply was outstripped by demand. This changed in May of 2022 when the stETH liquidation cascade sent all LST pegs underwater, however, by the time of the Merge later that year, rETH had fully recovered.
Between the Merge and the most recent Atlas upgrade accommodating the Shanghai hardfork, rETH had traded at a premium. Thanks to the Atlas upgrade, there has been a 300% increase in the rETH capacity provided by node operators and therefore the protocol is no longer limited by node operator supply. It is currently trading at less than a 0.1% premium.
You can see the history of the peg here (https://dune.com/drworm/rocketpool).

Contract Address
rETH: 0xae78736Cd615f374D3085123A210448E74Fc6393

Oracle
Chainlink Oracle:
rETH Oracle: 536218f9E9Eb48863970252233c8F271f554C2d0

Risk Parameter Configuration
Morpho can uniquely suggest parameters and these should only be seen as a starting point. We believe that the rETH market presents a similar quality to the stETH market and similar parameters are worthwhile.

Go To Market
As a plan to boost attraction to the protocol, Rocket Pool is proposing a two-fold approach. First, relevant Rocket Pool community members will educate the more DeFi savy side of the community on the opportunities provided by Morpho. This may include Twitter Spaces and other media coverage. Further, we will pursue simplified frontends for collaboration such as Instadapp.
In addition to the social awareness front, we propose bootstrapping a liquidity pool between rETH/maETH on Balancer. This pool will drive utility towards both rETH and the Morpho ecosystem enabling bilateral growth.

Next Steps
- refine MIP for snapshot vote
- prepare maETH/rETH Balancer pool for optimal incentivization
- spread the word

References
- Website: https://rocketpool.net/
- Dune: https://dune.com/rp_community/rocketpool

Audits
- 5/2021: https://rocketpool.net/files/sigma-prime-audit.pdf
- 11/2021: https://rocketpool.net/files/sigma-prime-fix-review.pdf
- 6/2022: https://rocketpool.net/files/sigma-prime-audit-redstone.pdf
- 6/2022: https://rocketpool.net/files/consensys-audit-redstone.pdf

The proposal was voted on and accepted on 8 June 2023.
