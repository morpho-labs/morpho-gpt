Link: https://morpho.mirror.xyz/EG-jRfnw3gr2pwYQccBLxpC-H89WQ1FpYzSepn6EQIc
Title: Understanding MetaMorpho: Aggregating & Amplifying Liquidity For Lenders

By Morpho Labs
On 23 february 2024

MetaMorpho combines the best of isolated markets and multi-asset lending pools to create a better way to lend. In time, we believe MetaMorpho vaults will become the default lending solution.

Part One: Intro to the Morpho Approach & Simplifying Isolated Markets (https://morpho.mirror.xyz/ydE_6frnAMMXDHaDX33y76ATmf0h3UH6tfFd5BMMfmU)
Part Two: Enabling Diverse Risk Profiles (https://morpho.mirror.xyz/DnVfUdGAKRMql_gq7gFfvC3juYWDZPvbUqgxoFCTcYU)

Part three of the Understanding MetaMorpho series explains one of the most powerful features of the Morpho Approach: how MetaMorpho vaults aggregate and then amplify withdrawable liquidity to give lenders a better liquidity profile than multi-asset lending pools.

It is broken down into three sections:
Why isolated markets fragment liquidity
How a MetaMorpho vault reaggregates liquidity to match the liquidity profile of a multi-asset lending pool
How multiple MetaMorpho vaults sharing liquidity amplifies withdrawable liquidity beyond what is possible in monolithic instances of lending pools

- Isolated markets fragment liquidity
One of the main drawbacks of isolated markets is liquidity fragmentation.
For lending protocols, liquidity is the assets available for users to withdraw or borrow from the market immediately which can be calculated by:

Liquidity=totalSupply*(1-utilizationRate)

For example, a market with $1000 supply and a 90% utilization rate has $100 liquidity.
When $1000 is supplied to a single lending pool versus equally across five isolated markets, the lending pool would have much more liquidity ($100) than individual markets ($20).

- Aggregating Liquidity with a MetaMorpho Vault
Lending to isolated markets via a MetaMorpho vault solves liquidity fragmentation. The chart below illustrates how liquidity from each market is aggregated resulting in users having the same liquidity profile as a multi-asset lending pool, despite the underlying markets remaining isolated.

- Sharing and Amplifying Liquidity with Multiple Vaults
Now, the key realization: With MetaMorpho vaults, the liquidity profile for lenders is even better than a lending pool. This works as liquidity from each vault is is aggregated on Morpho Blue and therefore shared by anyone lending to the same markets.
The article's chart illustrates how liquidity increases when there is a second MetaMorpho (MM) Vault.

Let us break it down:
    1. MM Vault #2 supplies an additional $500 to market #5.
    2. Total supply on market #5 increases from $200 to $700 ($630 borrowed + $70 liquid)
    3. The liquidity in market #5 increases from $20 to $70

Now, the crucial part:
    1. Liquidity available in MM Vault #1 increases 50% from $100 to $150 because MM Vault #2 supplied to market #5.
    2. Liquidity available in MM Vault #2 is $80 rather than $60 or 33% higher than it would be if MM Vault #1 was supplying on market #5.

We call this effect 'liquidity amplification’, which occurs when multiple vaults share liquidity from the same markets. The benefits of liquidity amplification grow with the number of vaults, leading to greater liquidity, efficiency, and scalability.

Until now, we've discussed how liquidity can be aggregated, shared, and amplified for lenders. But, that’s only half the equation. Soon, we will unveil a new feature that enables shared liquidity between isolated markets for borrowers. Stay tuned.