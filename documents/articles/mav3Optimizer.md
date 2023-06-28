Link: https://morpho.mirror.xyz/tQzkRt9Ro12DdQMNNoA0bQeyvhz8xpEbBkp8P5jhQuI
Title: Morpho AAVEV3-ETH Optimizer

Introducing Morpho-Aave-V3: An improved lending experience
8 March 2023
Simon Crotty

As a core contributor to the Morpho Protocol, Morpho Labs is excited to present Morpho-Aave-V3 — the latest version of Morpho to be deployed on Aave V3.

morpho-aave-v3
Morpho is a peer-to-peer layer built on top of existing pool-based lending protocols such as Aave and Compound. It works as a lending pool optimizer by seamlessly matching lenders and borrowers peer-to-peer to increase capital efficiency and provide users with better rates.

This will be the third instance of Morpho:

Morpho-Compound
Morpho-Aave-V2
Morpho-Aave-V3
Overall, Morpho-Aave-V3 will be a similar experience to previous versions — Morpho-Aave-V2 and Morpho-Compound. However, there are a few differences in the code: new features, improvements, and design changes. A new front-end will also be available. All of which we'll cover in this article.

If you are not familiar with Morpho, you can learn about it here.

New Features

1. New & Improved Matching Engine
   Morpho-Aave-V3 will feature a fairer matching engine. One that is not biased towards large borrowers and suppliers. Previously used data structures — doubly linked lists (DLL) and the heap — were replaced with logarithmic buckets.

Logarithmic buckets are a set of 256 queues, which store accounts for whom the amounts have the same logarithm. In this way, the matching engine has a high chance of matching everything in one iteration by looking at the bucket just above the one that corresponds to the amount to match.

Imagine the following scenario with the Heap or the DLL. One user first supplies 100 ETH, and ten more supply 10 ETH each. Then ten borrowers arrive, all borrowing 10 ETH. They will get matched with the first supplier (100 ETH) because they have the largest supplied volume. If another borrower wants to borrow 100 ETH, he will loop through all the ten remaining suppliers on the pool, possibly only matching a few because of the gas limit.

previous matching engine illustration
Original Matching Engine: Using doubly linked lists
Now the scenario with logarithmic buckets. When the ten borrowers come to Morpho to borrow 10 ETH each, they will get matched with the ten users supplying 10 ETH each as these buckets sort users according to size. Then, the user borrowing 100 ETH with be matched with the person supplying 100 ETH.

improve matching engine illustration
New & Improved Matching Engine: Using logarithmic buckets
As you can see from the example above, using logarithmic buckets allows the matching engine to pair users with similar volumes to the protocol, leading to:

reduced gas costs;
better fairness; and
increased efficiency.
With this change to data structures, more users will be able to enjoy Morpho's peer-to-peer rate!

2. Efficiency Mode
   Aave V3 introduced efficiency mode (E-mode), a new feature designed to maximize capital efficiency when collateral and borrowed assets are correlated in price.

In E-mode, assets correlated in price can be grouped into E-mode categories. For example, DAI, USDC, and USDT are all Stablecoins pegged to USD and would be one E-mode category.

Each category can have risk parameters' configured independently, allowing users to have higher collateralization and enhanced borrowing power when borrowing assets within a category. When in a specific E-Mode, you can only borrow assets in that category.

Currently, there's ETH E-mode is the only category available. It includes WETH and wstETH with the following risk parameters:

Max LTV 90.00%
Liquidation Threshold 93.00%
Liquidation Penalty 1.00%
Under this configuration, risk-seeking users can get up to 10x leverage!

A new instance of Morpho can be deployed on any E-mode category to improve capital efficiency further.

3. Gasless token approvals
   Utilizing the Permit2 contract, Morpho users can benefit from gasless approvals for any wallet that has already been approved on Uniswa

Before Permit2, users had to submit separate transactions approving every new token on every new protocol. Batching approvals was impossible, leading to users being stuck on max approvals and unnecessarily high gas costs when interacting with DeFi.

Now, you no longer have to execute multiple transactions when you connect to a new app. After approving Permit2, any app can request approval through a signature, allowing you to do multiple actions (like approve & swap) in a single transaction.

You may think this sacrifices security, but it's not the case. For every new application using Permit2, you'll have to sign a gasless transaction permitting the protocol. In this way, your assets are only shared with explicit approval.

Bring on better DeFi UX!

4. Account Management
   Morpho-Aave-V3 introduces “Account Management” at the contract level. Users gain the ability to approve a so-called manager in a gasless way that will be able to borrow/withdraw on behalf of the delegator. Let's look at some potential use cases.

On Ethereum, you can only call one contract at a time. So to perform multiple actions such as supply and borrow means calling the contract numerous times, and may come with high gas costs.

One solution is bulker contracts: a contract that can call protocol any number of times on your behalf. As a user, you only need to call the bulker once. For this to be possible, the bulker contract needs permission to act on your behalf. This is where the account management features come in. It allows Morpho users to sign a gasless transaction, approving the bulker contract to act on behalf of the user's wallet and enabling batching multiple actions into a single transaction. Note this is not available on day one but will likely be added soon.

Smart wallet enabled platforms should also find these features particularly useful. Previously users could not import positions from an Externally Owned Account (EOA) wallet to Instadapp smart contract wallet because it could not act on behalf of the EOA. Having the option to enable “act on behalf” functions makes it possible for a single-click import of all your positions on an EOA into a smart contract wallet.

The complete list of account manager functions available to different types of users (covered in the next section) is shown in the graphic below:

morpho-aave-v3
Mechanism Changes
The new supply and borrow caps instated by Aave V3 would severely constrain liquidity under Morpho's current design. Morpho-Aave-V3 includes a new mechanism to split supply to mitigate the risk associated with such constraints.

In Morpho-Aave-V3 there will be two types of suppliers: suppliers and collateral providers.

Suppliers, who aren't borrowing against their assets, can be matched peer-to-peer and enjoy improved rates. For collateral providers, their assets are deposited directly into the pool to ensure liquidations can occur regardless of any borrow or supply caps. Therefore, borrowers can't receive the peer-to-peer rate for supplied collateral, but they can for borrowed assets. So for borrowers using Morpho instead of Aave, it's still a pure improvement!

It's important to note that, unlike Morpho-Aave-V2, when using Morpho-Aave-V3 as a supplier, you are accepting a liquidity tradeoff: if the borrow cap is reached on Aave V3 there is a possibility, although highly unlikely, that you might not be able to withdraw your peer-to-peer matched funds instantly.

In the case where the liquidity of a given asset is completely matched peer-to-peer, Morpho would not have any deposits in the underlying pool. When a supplier exits a peer-to-peer position, Morpho would normally borrow from the underlying pool to fulfill the withdrawal. However, if the borrow cap is reached on the pool, withdrawals may be delayed. The withdrawal would become available when any borrow is repaid to the underlying pool or if a peer-to-peer borrower on Morpho repays their debt. This is a rare scenario and is not expected to happen often.

Updated User Interface
Morpho dApp's front end for Morpho-Aave-V3 is getting an overhaul. Users will see two separate tabs on the user interface: one for supply only and another for borrowers. Each tab is designed with those use cases in mind and displays only relevant information, reducing the amount of data displayed on a single screen. It'll be cleaner, easier to follow, and improve the user experience.

new UI illustration
Borrow UI — No open positions
Note that the UI is undergoing continuous improvement so the final version may differ from what is pictured above.

Timeline
The build is complete, but there are still several steps before the DAO can deploy Morpho-Aave-V3:

Complete audits (Runtime Verification & Spearbit)
Proposal to deploy
Snapshot vote of deployment
Deployment
Assuming no critical issues are found during audits and the governance proposal is successful, the expected timeline for deployment is late March. Still, this is a rough estimate and subject to change.

Integrations
Morpho-Aave-V2 has proven itself as a core building block for many protocols, and we expect the same for Morpho-Aave-V3.

If you are a builder that wants to integrate with Morpho and still need to get in touch, feel free to reach out to Morpho Labs (Twitter or Discord). We can provide access to the repo and are always happy to help.

Conclusion
Morpho-Aave-V3 is coming very soon (subject to governance), bringing with it the improved rates users know and love, several new features, and a new interface designed to enhance the user experience!

Keep an eye on the upcoming proposal in forum.morpho.org!
