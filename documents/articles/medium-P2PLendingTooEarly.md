Link: https://medium.com/morpho-labs/peer-to-peer-lending-too-early-to-work-the-ethlend-case-6b50e1234ec6
Title: Peer-to-peer lending: too early to work? — The ETHLend case.

Lending protocols are one of the main primitives of DeFi but lending pools have only been around for a couple of years. Before that, during the infancy of DeFi, protocols on Ethereum have tried and tested other approaches. ETHLend was one of them.
Launched in 2017, ETHLend offered peer-to-peer lending and even if it was not the only protocol that offered such service, it was one of the main ones. However, ETHLend never really gained enough traction and in September 2018, less than 2 years after its launch, it was integrated into a new parent company: Aave.
In this article, we will dive deep into how ETHLend functioned and will try to explain why it never took off.
The press release (https://www.prnewswire.com/news-releases/ethlend-announces-launch-of-new-parent-company-aave-300713825.html) announcing the creation of Aave perfectly sums up what ETHLend was. The core principle of current DeFi lending is already there.
"A decentralized financial marketplace for peer-to-peer digital asset-backed loans using smart contracts. Borrowers can request secure loans by pledging their cryptocurrency assets as collateral to receive spendable funds. This enables borrowers to retain their exposure to cryptocurrency without the need for selling the assets when the borrower has sudden expenses."
Here’s how it worked:
1. Borrowers created smart contracts, via the ETHLend interface, to ask for a loan in ETH (only) for predefined duration and a predefined interest rate. They would then offer any ERC20 of their choice as collateral. The collateral amount was defined by the borrower
2. Potential lenders could browse all pending offers and accept the one they wanted. Once accepted, the borrower would receive the requested ETH and his collateral would be locked.
3. At expiry, the borrower would pay back the lender with interest and get the collateral back. In case of default, the lender would receive the collateral (not ETH).
4. As you can see, it was very different from how lending pools work. Let’s have a closer look at the benefits and limitations of such a system.

Benefits
- Capital efficiency. When fully matched, lenders were able to put 100% of their capital to work. However, as we will see in the limits, it required multiple transactions as each loan corresponded to a different smart contract.
- Permissionless collaterals. Any ERC20 token with a price could be used as collateral. This opens possibilities far greater than what currently exists on the main liquidity protocols (even current semi-permissionless lending protocols such as Euler do not offer permissionless collaterals).
- Tight spread. Since the interests paid by the borrower were all going to the lender, with the exception of protocol fees.
- Unconstrained rates. Borrowers asking for loans could freely decide the interest rates they were willing to pay. However, lenders were not able to publish their own offers and could only choose from existing loan requests.

Limitations
- Limited assets to borrow. Only ETH was available at the time (but the whitepaper mentioned future assets such as wrapped BTC).
- Fixed-term loans. Unlike current lending markets who offer loans in perpetuity, all loans on ETHLend had an expiry date, which required lenders looking for yield to actively manage their assets.
- Lenders did not get back the asset they lent in case of default. They were repaid with the collateral. They then had to manually trade the token received for ETH. At the time, DEXs were barely emerging and were very different from the AMMs that we have today. Ether Delta, a “proto DEX”, had a clunky interface with a slow order book and offered low liquidity. So a lender had to take the risk of not being able to swap the asset or, if he was lucky, he could use a CEX if the collateral was listed there.
- No liquidation or mechanism to deal with price volatility. It was up to borrowers to assess the amount of collateral needed, meaning that they had to try to predict potential price fluctuations in order to make their offers enticing enough for potential lenders to accept them despite the risk. And the risk was not trivial: in case of strong depreciation of the collateral vs ETH, coupled with a default, lenders could potentially get back a lot less (in ETH terms) than what they lent.
- Waiting period. There was no automated offer and demand matching due to the very nature of peer-to-peer lending at the time, where each loan corresponded to a smart contract. Anyone using the interface had to do it manually. A lender had to check all offers and choose the ones that suited him/her. Although it was certainly possible for a tech-savvy user to automate it somehow for personal use, it was not done automatically by the protocol and thus not available for all users as easily as with a peer-to-pool model.

All those limitations coupled with a clunky user interface (the beginning of DeFi was not user-friendly) and the fact that users and capital were scarce at the time led to the realization that the peer-to-peer model can be quite inefficient especially when only one side of the market (borrowers) is present or, as Finematics (https://finematics.com/aave-explained/) perfectly puts it “if there is no one on the other side who wants to interact with us”.
The final nail in the coffin was the creation of Compound and Uniswap in 2018. Both used a peer-to-pool model. Shortly after, the ETHLend team made the switch to peer-to-pool as well and rebranded to Aave, which became the lending behemoth that we know today.

So, is decentralized peer-to-peer lending dead then? Far from it, but that’s a story for our next article, about the paradigm shift that Morpho is.
