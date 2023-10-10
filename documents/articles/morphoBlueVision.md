Link: https://morpho.mirror.xyz/hfVXz323zp9CmJ1PLDL4UhdLITGQ865VIJUyvZYyMA4
Title: Morpho Blue and how it enables our vision for DeFi lending

We published the whitepaper and released the code of Morpho Blue, a new lending protocol, the 10 th of October 2023.
At that time, Morpho protocols represent $1b worth of deposited assets.

Morpho Blue’s narrow focus enables trustless and efficient lending and borrowing of assets. It provides users with higher collateralization factors, improved interest rates, significantly reduced gas costs, and permissionless market creation.

By separating risk management from the immutable core protocol, Morpho Blue will serve as an open base layer capable of bringing a previously unimaginable level of flexibility to decentralized lending.

Why we decided to build Morpho Blue
Within a year, Morpho has become the third-largest lending platform on Ethereum, with over $1B in deposited assets.

Morpho's initial version, Morpho Optimizer, operates on top of Compound and Aave to enhance the efficiency of their interest rate model. But consequently, Morpho Optimizer’s growth is constrained by the current underlying lending pool design.

In particular, the current lending paradigm is:

Not Trustless: It relies heavily on its DAO and trusted contractors to monitor and update hundreds of risk parameters daily or upgrade large smart contracts.

Not Efficient: It provides inefficient rate spread, low collateralization factors, and charges fees to maintain the platform itself.

Not Flexible: It has a limited number of assets listed. Users have no choice but to subscribe to the one-size-fits-all risk-return profile proposed by the DAO.

Although DeFi lending has grown rapidly under existing protocols like Aave and Compound, we need to rethink decentralized lending from the ground up to reach the next order of magnitude. Having spent two years developing the most significant platform built on top of these onchain funds, Morpho is uniquely positioned to recognize and address its limitations. As anticipated in the initial whitepaper, Morpho must metamorphose to become fully autonomous and improve the current state of DeFi lending.

We call this evolution Morpho Blue 🟦.

What is Morpho Blue
Morpho Blue is a trustless and efficient lending primitive with permissionless market creation.

It enables the deployment of minimal and isolated lending markets by specifying one loan asset, one collateral asset, a liquidation LTV (LLTV), and an oracle. The protocol is trustless and was designed to be more efficient and flexible than any other decentralized lending platform.

1. Trustless

- Immutable

Morpho Blue is not upgradable. The protocol will run and behave the same way forever.

- Governance-minimized

Morpho Governance cannot halt the operation of a market or manage funds on users’ behalf, nor does it impose specific oracle implementations. Instead, risk management is externalized to the above layers.

- Simple

The protocol consists of only 650 lines of Solidity code. This simplicity makes it particularly easy to understand and safe.

All those last elements makes Blue trustless.

2. Efficient

- Higher collateralization factors

Morpho Blue’s Lending markets are isolated. Unlike multi-asset pools, liquidation parameters for each market can be set without consideration of the most risky asset in the basket. Therefore, suppliers can lend at a much higher LLTV while being exposed to the same market risk as when supplying to a multi-asset pool with a lower LLTV.

- Improved interest rates

Collateral assets are not lent out to borrowers. This alleviates the liquidity requirements for liquidations to function properly in current lending platforms and allows Morpho Blue to offer higher capital utilization. Moreover, Morpho Blue is fully autonomous, so it does not need to introduce fees to cover costs for platform maintenance, risk managers, or code security experts.

- (Very) low gas costs

Morpho Blue is a remarkably simple protocol built in a singleton smart contract that groups every possible primitive market in the same place. This reduces gas consumption by 70% compared to existing lending platforms.
All those last 3 elements make Blue efficient.

3.  Flexible

- Permissionless market creation

Morpho Blue features permissionless asset listing. Markets with any collateral and loan assets and any risk parametrization can be created. The protocol also supports permissioned markets, enabling a broader range of use cases, including RWAs and institutional markets.

- Permissionless risk management

Morpho Blue is designed to serve as a simple, foundational building block that allows adding more logic layers on top. These layers can enhance the core functionality by handling risk management and compliance or simplify the user experience for passive lenders.

For example, risk experts could build noncustodial curated vaults for lenders to earn yield passively. Those vaults recreate the current multi-collateral lending pools but on top of a trustless and efficient protocol. In fact, any lending pool with any asset and any risk management method can be built on this unique primitive.

- Developer-friendly

Morpho Blue features several modern smart contract patterns. Callbacks enable liquidators and sophisticated users to chain advanced actions without any flash loans. Account management facilitates gasless interactions and account abstractions. Free flash loans on the singleton contract allow anyone to access the assets of all markets simultaneously with a single call, as long as they are repaid in the same transaction.
All those last 3 elements makes Blue Flexible.

Governance & License
Morpho Blue’s code is released under a Business Source License 1.1. under the name of the nonprofit Morpho Association but controlled by the Morpho Governance, made up of MORPHO token holders. It is important to note that the license will convert to GPL after two years or if the protocol fee switch is activated.

What’s next?
We believe that finance should function similarly to the internet, with applications built on open and trustless protocols.

Morpho Blue is designed to serve as the foundation for DeFi lending. Onchain and offchain applications can be built on top to manage risk-return, handle compliance, enhance usability, and more. Users can interact with the primitive directly or can delegate certain tasks to different layers depending on their specific needs.

We believe multiple highly specialized layers that enrich the protocol's core functionality — similar to UniswapX for UniswapV4 — are crucial for unlocking DeFi’s true potential. In particular, we believe the risk management layer deserves its own protocol. More information will be released as we move closer to testnet deployment in the coming weeks.

You can find the full whitepaper and code for Morpho Blue.
