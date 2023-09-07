Link: https://docs.morpho.org/concepts-overview/core-concepts/fallback-mechanisms
Title: Fallback Mechanisms

A solution ensuring user funds are always available while benefiting from optimal capital efficiency.
Morpho is a hybrid interest rate mechanism that combines the current liquidity pool model used in Compound and AAVE with the capital efficiency of peer-to-peer (P2P) matching engines used in order books.
It is built in such a way that, if either a borrower or lender is unable to be matched via the P2P mechanism, Morpho falls back onto the underlying pool (Aave, Compound, etc.) by depositing/borrowing the user’s funds in the pool's smart contract. Under this configuration, the underlying pool is considered the "supplier/borrower of last resort": the user receives the same rate as they would from using the pool directly.
Let's dive into a few scenarios to get familiar with the matching engine. Let's take the case of a supplier, Alice, who deposits her assets on Morpho.
Scenario 1. Morpho's matching engine instantly pairs Alice with one or multiple borrowers. In that case, there is no need for a fallback, and both parties enjoy an improved APY.
Scenario 2. Morpho's matching engine cannot find any match due to a lack of borrowing demand. All of Alice's funds will be supplied into the underlying pool and earn the pool's supplying APY.
Scenario 3. Morpho's matching engine only finds a partial match because there are borrowers, but not enough to fill the entire order. Some of Alice's funds are matched, and the residual amount is supplied into the pool. Alice will enjoy an improved APY on her matched capital; the residual will receive the same lending APY as the one of the underlying pool.
The symmetric scenarios exist when Alice is borrowing funds. But what if she tries to withdraw funds? For example, what happens if Alice needs to cash out while matched P2P?
First, Morpho will try to replace Alice's P2P credit line with other suppliers waiting on the pool. If there are no other suppliers, then the fallback mechanism kicks in. It ensures a fallback to the underlying pool in every scenario where a Morpho user would otherwise be unable to leave.
Looking at the following scenario:
Every lender is matched with one or multiple borrowers in a given market. No excess liquidity is available.
In the same market, a lender wants to withdraw all of their supplied funds, and the withdrawal reaches the gas consumption limit (cf. ) without completion.
This triggers the fallback mechanism: using the collateral from suppliers of other markets, Morpho borrows the remaining liquidity the withdrawer is entitled to directly from the underlying protocol's pool. By doing so, the lender can withdraw all of his assets seamlessly.
Conversely, the fallback mechanism can be triggered in case of a repayment: Morpho supplies the excess liquidity repaid by the repayer to the underlying protocol's pool.
Morpho's position in the underlying pool is an aggregate of all its user's positions. In particular, it is thus always healthier than the worst position of its users, as long as there is more than one user. With high usage, efficient & profitable liquidations will impact Morpho users before the protocol's overall position gets eligible for liquidation. This is proven in-depth in Morpho's Yellow Paper which will be published later.
Let's take an example.
First, Alice supplies 100 DAI on Morpho. Then, Bob provides 1 ETH as collateral and borrows 100 DAI. Morpho is going to match Alice and Bob P2P with Alice.
After some time, Alice wants her 100 DAI back, but Bob has not repaid yet.
To give her 100 DAI back to Alice, Morpho's matching engine will first try to replace her with another supplier waiting on the pool. Let's imagine there are no other suppliers on Morpho.
Morpho will use Bob's ETH collateral to borrow 100 DAI directly from the pool and give them to Alice. Alice is now out of Morpho, and Bob is reconnected with the pool, seamlessly.
The symmetric scenario exists for users trying to repay.
But, what if a lender or borrower cannot be matched, not due to a lack of liquidity, but because the maximum gas limit for matching has been reached? Fear not; Morpho's algorithm still has tricks up its sleeves that are detailed in the and section.
