Link: https://medium.com/morpho-labs/morpho-the-best-of-two-worlds-1d8b641b8393
Title: Morpho: the best of two worlds.

Limitations of past and current lending systems.
In the first article (https://medium.com/morpho-labs/lending-pools-an-imperfect-breakthrough-357962c34364), we saw that lending protocols with a pool-to-peer design provide instant liquidity and allow for the fungibility of loans. However, it comes at the cost of capital efficiency which generates a spread between borrowing and lending (few lenders, many borrowers). Moreover, in order for the market to remain fully liquid, a lot of capital has to constantly sits idle. This is incentivized with algorithmically designed (and thus constrained) rates. Despite those limitations, peer-to-pool has gained a lot of traction in the past years.
Conversely, peer-to-peer (P2P) lending protocols have historically remained niche even though they could have offered much more capital efficiency than pools. The reasons behind their lack of success are explained in detail in a second article (https://medium.com/morpho-labs/peer-to-peer-lending-too-early-to-work-the-ethlend-case-6b50e1234ec6) but can be summarized by the non-liquidity of fixed terms loans as well as the limited number of users and assets to borrow (only ETH). But in my opinion, the main defect was that lenders were carrying most of the risk. Indeed, in case of default at the loan expiry date, they would get paid with the borrower’s collateral. However, without any mechanism to deal with price volatility (e.g. liquidation), lenders could receive almost valueless tokens and be a at severe loss in ETH terms.
So, is peer-to-peer lending dead? Are pools the best model we can hope for? Well, obviously I wouldn’t be writing a series of articles about it if it was the case. So, what is Morpho bringing to the table in the current landscape? It’s pretty simple: the best advantages of both systems and none of their tradeoffs.
But first, let’s take a minute to understand what Morpho is.

Introducing Morpho: the best of two worlds.
Morpho is a new gateway to decentralized lending. Instead of borrowing or lending on your favorite pool like Compound or Aave, you would be better off using Morpho-Compound or Morpho-Aave directly. From a user experience standpoint, you use Morpho the exact same way you would be using Aave, Compound, or any other lending pool.
Indeed, Morpho is a lending pool optimizer: it improves the capital efficiency of positions on lending pools by seamlessly matching users peer-to-peer. Morpho improves your rates all the while preserving the same experience, the same liquidity, and the same parameters (collateral factors, oracles, …) as the underlying pool. It means that you are getting boosted P2P rates or, in the worst-case scenario, the APY of the pool.
In a nutshell, Morpho is a Pareto-improving protocol, it doesn’t degrade the performance of the underlying money market and offers better rates for both lenders and borrowers.

Let’s take a simplified example.
Bob wants to supply 10 ETH. He deposits it on Morpho. The protocol deposits those ETH on Compound and gets cETH. Bob then earns exactly the same APY as if he supplied his assets directly on Compound.
Enters Alice, who wants to borrow 10 ETH. In order to do so, she deposits BAT as collateral. The deposit triggers Morpho’s matching engine which matches her with Bob peer-to-peer. Morpho takes Bob’s cETH and converts it back to ETH which it gives to Alice.
Bob and Alice or not relying on Compound’s pools anymore, Bob doesn’t have to share the profits with other lenders, and the capital he deposited is fully utilized. Alice doesn’t have to pay interest to many lenders. Both get the improved P2P APY that is always above the supply APY and below the borrow APY of Compound.

So, by combining pool-to-peer and peer-to-peer, Morpho solves the main issues that peer-to-peer and pool-to-peer protocols are facing:

1. Instant liquidity. Borrowers can get a loan in a split second. The same goes for lenders who can get their money back instantly whether they are in the pool or matched peer-to-peer.
2. The assets are in the pool. Morpho just removes them from there and gives them back to the lender.
3. The lender is matched in peer-to-peer. Morpho gives the asset back to the lender, and the borrower is either matched again peer-to-peer or goes back into the pool (and gets the pool APY). Obviously, the same logic applies when a borrower repays the lender.
4. Perpetual loans. Borrowers matched peer-to-peer don’t have a fixed date to repay their loans. Lenders don’t have to regularly scout for borrowing offers.
5. Easy to use. Just like Aave, you are 3 clicks away from your yield. No need to actively manage your assets if you don’t want to. Lenders can just deposit and forget, knowing they will at least get the same APY as the underlying pool.
6. Capital efficient. As a lender, your capital is either in the pool and thus as efficient as it can be in such a system or is 100% utilized when matched peer-to-peer.
7. Near zero-spread. With peer-to-peer, there is no difference between the lending and borrowing APY (outside of potential protocol fees).
8. Assets are plentiful. There are as many assets to borrow and lend as in the underlying protocol. Even if Morpho will initially focus on Aave and Compound, it can be integrated to other lending pools as well (and I don’t mean only forks of Aave and Compound), giving endless possibilities in terms of diversity of assets.
9. Mechanism to control price volatility. Liquidation parameters are the same as the underlying pool even when matched P2P thanks to Morpho’s own set of liquidators.
10. Lenders are repaid with the asset they deposited in case of default.

Using Morpho does introduce one additional risk: smart contract risk. A user will be using Morpho’s smart contract on top of the underlying pools, adding one level of complexity.

The team is well aware of this and considers security paramount. This is why Morpho Labs aims at formally proving all smart contracts (formal proving done both in-house and by external companies), and hires best-in-class security engineers and audit firms. As of today, Morpho already passed 2 audits (one from Solidified (https://solidified.io/), and one from Pessimistic(https://pessimistic.io/)) and is awaiting the third one from Trail of Bits (https://www.trailofbits.com/) before launching.

Improved capital efficiency with the same liquidity and liquidation parameters as the underlying pools all with a slick user interface. What are you waiting for? If you’re still not convinced to take the leap, wait for our next article regarding Morpho’s added value for other protocols.
