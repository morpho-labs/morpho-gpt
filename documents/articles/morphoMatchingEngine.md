Link: https://medium.com/morpho-labs/the-secret-to-better-apys-meet-morphos-matching-engine-d071abe00a05
Title: Morpho's Matching Engine Article
The Secret to Better APYs? Meet Morpho's Matching Engine
13 Dec 2022
Simon Crotty

If you have heard of Morpho, you may be wondering how the protocol pairs lenders and borrowers to offer better APYs than on native Aave and Compound.

It's all thanks to Caterpillar, Morpho's current matching engine.

For those new to the protocol, Morpho is a peer-to-peer (“P2P”) layer built on top of existing pool-based lending protocols such as Aave and Compound. It works as a lending pool optimizer by seamlessly matching lenders and borrowers P2P. This allows Morpho to improve rates for both sides of the lending market while preserving the same liquidity mechanism and liquidation guarantees.

The role of Caterpillar is to programmatically create and break peer-to-peer credit lines, by moving users in (demote) and out (promote) of the underlying pool. It is the brains behind the P2P rate that Morpho users have come to know and love, but it is often overlooked.

Here we disassemble the matching engine: what it is, the problem it solves, and exactly how it works.

The problem with lending pools
If you have used Aave or Compound, you probably noticed the wide spread between the cost to borrow and interest earned for supplying.

This spread is intentional and exists because these protocols are designed to ensure users can withdraw current funds or borrow new funds at any time. While the pool model preserves the liquidity of positions, it is hugely capital inefficient due to a sizable mismatch between total supply and total borrow.

Illustration of lending pool
Illustration of lending pool capital flow
On top of that, yields are socialized, meaning all lenders must share the interest paid by a limited amount of borrowers. As a lender, only part of your supplied capital is utilized at any time, and the interest earned is split across every supplier. As a borrower, your costs are increased to compensate for this low utilization.

Large APY spread
Large APY spread present in lending pools
Improving rates
Morpho solves this by dynamically matching suppliers and borrowers peer-to-peer as they come and go. Two things happen when matched P2P:

Users benefit from a 100% utilization rate
The yields are no longer socialized
Lenders receive interest payments directly corresponding to those paid by the borrowers, at a rate that's better for both parties.

Lending pools are optimized for managing liquidity, but to achieve this they must make a huge trade-off: sacrifice capital efficiency for instant liquidity. This is why the interest rate algorithms on Aave and Compound are designed to target utilization rates well below 100%. Morpho is different.

The matching engine allows Morpho to pair borrowers and lenders directly, creating peer-to-peer credit lines between users. When lenders and borrowers are matched P2P, the rate is unconstrained by that of the underlying protocol. Morpho can freely choose the P2P rate, but to be an improvement for both parties, it should remain within the spread of the underlying protocol's pool.

P2P APY
P2P APY set in the middle of the spread:

The formula (defined by governance) used to determine the P2P rate (APY)

When the P2P Index Cursor (changeable through governance) is set to 0.5, the P2P APY is the mid-rate of the Pool Borrow APY and Pool Supply APY.

For example, let's assume the Pool Supply APY for USDC is 1% on Aave, while its Pool Borrow APY stands at 3%. When matched via Morpho, the rate earned (paid) by a lender (borrower) is 2%.

The borrower pays 1% less, while the supplier earns 1% more when using Morpho. That's a Pareto improvement for the lending markets and a win-win for both sides.

Note some edge cases may have a small spread applied on either side due to the delta mechanism, a scaling system designed to guarantee that funds remain liquid in all situations.

How matching works
To understand the matching engine fully, you should first have some knowledge of the fallback mechanism. You can find more information about it here.

When it comes to matching on Morpho, there are three potential scenarios: no match, full match, and partial match. Let's run through some examples.

Scenario #1: No match
Example: a user comes to Morpho wanting to borrow $10M USDC, but no one is lending USDC. The matching engine recognizes this, so Morpho automatically borrows USDC from the underlying pool to fulfill the borrower's order. The borrower pays the Pool Borrow APY.

Scenario 1: no match
Scenario 1: no match
Scenario #2: Full match
Example: a user comes to Morpho wanting to borrow $10M USDC, and exactly $10M is supplied. The engine removes the supplied USDC from the underlying pool and matches the borrower and lender P2P, with both parties receiving the P2P APY.

Scenario 2: full match
Scenario 2: full match
Scenario #3: Partial match
Example: $10M USDC is supplied on Morpho, but there is only $6M USDC of borrow. Here, the protocol matches $6M peer-to-peer while forwarding the residual $4M into the underlying pool. The supplier earns a blended rate — P2P APY on the $6M and the Pool Supply APY on the $4M. Meanwhile, the borrower pays a P2P APY only.

Scenario 3: partial match
Scenario 3: partial match
Remember, all these examples represent a one-time event; a new user supplying or borrowing an asset on Morpho. Whatever the result, it is not permanent. Every time someone enters or leaves the market, the matching engine cycles through the priority queue (as explained later) to determine if your capital is not matched, fully matched, or partially matched. So starting matched does not mean you remain matched forever, and vice versa if you were not matched initially.

The scenarios covered above also make a crucial assumption: that there is only one borrower and one lender. However, we know that is not the case in reality. The matching engine can and needs to scale for thousands, if not hundreds of thousands, of users.

Caterpillar tackles efficiency by utilizing an on-chain priority queue to match users, sorting users by the amount they wish to lend or borrow, from largest to smallest. Suppose you supply liquidity to Morpho: your liquidity is matched with the largest borrower first, followed by the second, third, and so on, until the liquidity supplied is fully matched or there are no more borrowers.

As a borrower, your demand is matched with the largest lender first, then the second, until the borrowed liquidity is fully matched or there are no more lenders to match.

Why sort the queue by descending order instead of first come, first matched?

Imagine that Alice has supplied $1 USDC from 1000 accounts totaling $1000 USDC, then Bob supplies $1000 USDC from a single account after her. Under first come, first match, the system would prioritize Alice and her 1000 accounts. When John comes to borrow $1000 USDC, it would cost a lot of gas to match against all of Alice's small accounts. In contrast, matching $1000 USDC from Bob's one account would be far more efficient. You can see why sorting by largest to smallest is preferable for end users.

The performance of the matching engine has supported the design of the priority queue. To date, the average matching efficiency — the percentage of volume matched P2P out of total P2P volume available for matching — of Morpho-Aave and Morpho-Compound has been 99.82% and 96.11%(!)

Building an efficient engine on chain is challenging, largely due to gas constraints. If built off-chain, it could run an infinite loop, cycling through every user in the priority queue until matches occur. But on chain, every transaction costs gas, and cycling through a queue can become highly costly. This is why a predefined maximum gas cost defined by governance was introduced.

If the gas limit is reached at any time, the engine stops cycling through the queue, and any unmatched liquidity falls back on the underlying pool. An appropriate guardrail to ensure matching P2P is always economically beneficial.

Sure it's possible to run computations off chain, but doing so limits composability. Deploying the system on chain makes it possible for any contract to integrate Morpho.

Combining all of the above, we get an impressive mechanism optimized for economic and gas efficiency, simplicity, and fairness, which looks something like this 👇

Illustration of the matching engine
Illustration of the matching engine
If you're using Aave or Compound, you can try aave.morpho.org or compound.morpho.org and enjoy better (or at worst, the same) APY with the same risk parameters.

Quick links 👇
Website: morpho.org
Application: app.morpho.org
Whitepaper: whitepaper.morpho.org
Documentation: docs.morpho.org
Twitter: twitter.com/MorphoLabs
Discord: discord
