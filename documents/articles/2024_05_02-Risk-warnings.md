Link: https://morpho.mirror.xyz/NH_jwAQuXuGvhUY_h7Bh6sDWs4_mCfB30cEY7PKlREw
Title: Introducing Risk Warnings: Transitioning to a Permissionless Interface

By Morpho Labs
On 02 May 2024

Morpho Blue is a permissionless lending primitive where anyone can lend/borrow, create a market, and tailor their risk profiles.
While not fully permissionless like Morpho contracts (Morpho Blue & MetaMorpho), the Morpho Interface is designed to make interacting with Morpho more accessible to end-users by displaying all Morpho Blue markets and MetaMorpho vaults.
As Morpho Blue continues to gain significant traction, liquidity, and Lindy, many new markets and vaults have appeared and will continue to appear on the Morpho interface. However, while growth creates new use cases and opportunities, it's also important to flag associated risks to users.
As anyone can create a market/vault, there is no guarantee that every market/vault on the interface is safe. For example, interactions with some markets may result in a loss of capital for lenders if bad debt is realized. Statistically, with every new market/vault, the likelihood of a poorly created market leading to a loss of funds increases.
To help users manage potential risks, new risk warnings have been added to the Morpho Interface. These warnings are live now and will alert users of possible risks and, in some cases, require them to "opt-in" before proceeding.

- What are risk warnings
A market on Morpho Blue is created by selecting five parameters which exist in perpetuity, or, in other words, are immutable:
    - Collateral Asset
    - Loan Asset
    - Liquidation-Loan-To-Value
    - Oracle
    - Interest Rate Model

Risk warnings will appear on the interface when there is an unrecognized parameter or potential abnormality with a market and are split into three categories: red, yellow, and blacklisted.

    - RED: Any collateral asset, loan asset, deposit asset, oracle, or vault curator that is not found on a recognized list. These will require a user to “opt-in” before proceeding with the interaction.
    - YELLOW: A “soft warning” that alerts a user to a potential abnormality, but does not require the user to “opt-in” to the action.
    - BLACKLISTED: markets created with tokens that violate trademarks, have proven to be scams, or otherwise based on legal considerations will be hidden from the interface.

Warnings are implemented using the morpho risk API and are not hard-coded. The table displayed in the article (https://morpho.mirror.xyz/NH_jwAQuXuGvhUY_h7Bh6sDWs4_mCfB30cEY7PKlREw) provides examples of why warnings may appear.

- Path to a permissionless interface
DeFi is a digital native system that should be built with the same foundational principles as the Internet, such as accessibility. One of Morpho’s goals is to establish an open lending stack where both back-end contracts and front-end interfaces are permissionless.

While Morpho Blue and MetaMorpho contracts are already permissionless, the interface is not. After implementing risk warnings, the next step is making the interface permissionless. This means any markets or vaults deployed on Morpho contracts will be accessible on the Morpho interface, subject to the warnings introduced today.

The transition to a permissionless architecture for the interface is anticipated before the end of Q2 2024.