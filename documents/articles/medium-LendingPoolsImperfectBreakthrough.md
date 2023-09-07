Link: https://medium.com/morpho-labs/lending-pools-an-imperfect-breakthrough-357962c34364
Title: Lending pools: an imperfect breakthrough.

What are decentralized lending pools (aka liquidity protocols)?
The principle behind DeFi lending pools such as Aave or Compound is rather easy to understand. It all boils down to supplying and borrowing assets.
Lenders can supply their crypto-assets (ETH, DAI, WBTC, amongst others) into a pool and earn interests on their tokens according to the supply APY (Annual Percentage Yield) of the pool. The supplied tokens are then sent to a smart contract and become available for other users to borrow. The smart contract issues another token (cTokens on Compound, aTokens on Aave) to the lender, that represents the supplied tokens with interests.
Borrowers can take a loan on any listed crypto-assets provided that they supply enough crypto-assets of their own as collateral (a borrower is necessarily a lender first). They can then do whatever they want with the borrowed asset but will not be able to get their collateral back from the pool until the debt has been repaid (with interests). The loans do not have terms and thus never expire.
This is a peer-to-pool model. Individual lenders deposit their assets into a common pool and the pool earns the interest paid by the borrowers. Earnings are then shared pro rata amongst lenders.
Let’s assume that 1 ETH = 5 000$ and that interest rates for borrowing DAI is 1% per year. Bob supplies 50 000 DAI to Aave and earns 5% annual interest on it. Bob gets aDAI (interest bearing DAI token) in exchange for depositing his DAI into the pool. Now enters Alice, who has 10 ETH and doesn’t want to sell them but she needs cash for expenses. Alice supplies 10 ETH as collateral to Aave ETH pool and borrows 40 000 DAI. A year later, Alice pays back the loan with interest and deposits 40 400 DAI back into the pool, repaying her debt. She can now get her collateral back (or leave it in the pool to keep earning interests on ETH).

Why use a peer-to-pool model? What are the benefits?
When Compound was launched in 2018, DeFi was barely starting and TVL (Total Value Locked) was in the hundred of thousands, not in the hundreds of billions. Liquidity was extremely poor and not suitable for peer-to-peer lending and borrowing. Pool-to-peer was a real breakthrough that completely changed the game for several reasons:
- Instant liquidity: In a peer-to-peer system, there needs to be a match between borrowers and lenders which can take time or even worse, not happen at all. With a peer-to-pool system, you can borrow immediately as long as there is liquidity in the pool. There’s no need to match Alice and Bob.
- Deposit and forget: For the same reason, you can deposit an asset and forget about it. It will accrue interest no matter what. In the case of peer-to-peer lending, you would earn interests only when your capital is effectively borrowed by someone else, so you have to monitor whether it is productive.
- Transparent rates : The interest rate on both sides is defined by the utilization rate of the assets in a pool. If nearly all assets in a pool are borrowed, both interest rates are high to entice liquidity providers to deposit more capital and reduce borrowing. Conversely, if nearly no assets in a pool are used, both interest rates are low to entice borrowing.
- Deposit X, borrow Y: It’s very easy to deposit one asset (e.g. DAI) and borrow another (e.g. WBTC). It is much more complicated to do when you have to match lenders and borrowers individually, especially if you do it fully on chain as it will require more complex transactions, thus increase gas fees to a point where it might not be profitable.
- Permanent loans: Loans have no expiry date. Let’s take a minute to explain why.

Bob supplied 100 DAI. Now Bob wants his money back
- In a peer-to-peer system, there are three scenarios.
1. The borrower (Alice) repays Bob who can now withdraw his money.
2. Alice is matched to another lender and Bob gets his money back.
3. There are no other lenders and Alice cannot repay Bob. Bob’s funds are stuck until Alice pays back (or the protocol pays back from its treasury).
- In a peer-to-pool system, Bob doesn’t have to worry about getting his money back as long as there is liquidity in the pool. Similarly, Alice doesn’t have to worry about paying back her loan until she wants to. All loans are fungible.
Instant liquidity, fungible loans in perpetuity thanks to incentivizing dynamic rates. What’s not to like? Unfortunately, such a design comes with necessary tradeoffs.

Limitations
- Capital inefficiency: We just saw that interests paid by borrowers are distributed among lenders pro rata of their share of the pool. However, to allow for instant liquidity there needs to be more liquidity brought in that is being borrowed. It means that a a good chunk of capital sits idle, not generating any income. Even in very active markets with high utilization rate, there is always around between 10% to 25% of the capital that remains unused, reducing revenue for borrowers.
- APY Spread: The direct consequence of this capital inefficiency generates the spread (=difference of APY between lending and borrowing, the latter always being higher than the first) that you can see on Aave or Compound. With a pool model, all funds are mutualized so you have to reward all equally, even if their capital is idle. It means that borrowers basically pays all lenders, even if they are inactive. This is the cost of instant fungible liquidity.
- Constrained rates. In the peer-to-pool model, lenders and borrowers do not chose the interest rate they get. It is algorithmically designed to keep the market liquid and the utilization rate below 100% by either incentivizing lenders and/or borrowers. Since rates are constrained by an interest rate model and not freely determined, there is no competition between lenders.

The above mentioned limitations are not bugs, they are necessary tradeoffs that comes with peer-to-pool designs. We will see in the next articles how P2P lending works as well as how Morpho tackles those limitations.
