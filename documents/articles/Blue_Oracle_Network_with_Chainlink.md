Link: https://morpho.mirror.xyz/DUUExWjGRvp4Zyz9zXLFVwYCs-rSlfEQFYK3aG6-Wms
Title: Establishing Morpho Blue’s Oracle Network with Chainlink Price Feeds

By Morpho Labs
On 24 January 2024

Morpho Blue (https://x.com/MorphoLabs/status/1711744126184747077?s=20) is more flexible than any other lending protocol, with the ability to select any collateral asset, loan asset, liquidation LTV (LLTV), interest rate model (IRM), and oracle at market creation.
On Morpho Blue, as with any over-collateralized lending protocol, high-quality pricing is key. The LLTV must have a sufficient buffer so liquidators can liquidate unhealthy positions to avoid bad debt. The reliability of the oracle to provide accurate pricing of an asset impacts LLTV. A higher quality oracle means a higher LLTV can be set.
Secondly, a lending protocol needs a reliable notion of price to operate as designed. If a price delivered onchain diverges from the real value of an asset, it can lead to wrongful liquidations or unwarranted bad debt realization. Therefore, pricing accuracy and reliability are crucial, even amidst the most extreme market conditions.
When it comes to oracles (https://chain.link/education/blockchain-oracles), Morpho Blue is completely agnostic. It does not have a built-in oracle but instead lets the market creator specify an address responsible for returning a price for the collateral and loan asset. This grants market creators the ability to select the optimal price feed for assets in a given market.
Morpho Labs has developed an oracle wrapper for industry-standard Chainlink Price Feeds to help facilitate the creation of Morpho Blue’s first markets. Individual feeds can be combined to service a wide variety of markets, for example, using WBTC/BTC, BTC/USD, and USDC/USD to price WBTC/USDC. As a result, the ChainlinkOracle contract (https://github.com/morpho-org/morpho-blue-oracles/blob/main/src/ChainlinkOracle.sol) provides Morpho Blue market creators access to hundreds of high-quality, industry-standard Chainlink Price Feeds.

- Integrating Battle-Tested Price Feeds
Chainlink was integrated based on its merits of providing highly reliable pricing even throughout unexpected events. Chainlink has enabled over $9 trillion in transaction value (https://data.chain.link/) by providing financial institutions, protocols, and applications with access to real-world data, offchain computation, and secure cross-chain interoperability across any blockchain. Chainlink Price Feeds have proved effective during exchange downtimes, flash crashes, and data manipulation attacks via flash loans.
Chainlink Price Feeds possess several key features:
  - High-Quality Data — Data is sourced from numerous data aggregators, leading to price data that’s aggregated from hundreds of exchanges, weighted by volume, and cleaned of outliers and wash trading. The aggregation model helps generate precise market prices that are inherently resistant to inaccuracies or manipulation.
  - Secure Node Operators — Price feeds are secured by independent, security-reviewed, and Sybil-resistant oracle nodes which have a strong track record of reliability, even during high gas prices and infrastructure outages.
  - Decentralized Network — Diversified data sources, oracle nodes, and oracle network levels generate strong protections against downtime and tampering.
  - Reputation System — A robust reputation framework and set of onchain monitoring tools allow users to independently verify the historical and real-time performance of node operators and oracle networks.
 
- About Chainlink
Chainlink is the industry-standard decentralized computing platform powering the verifiable web. Chainlink has enabled over $9 trillion in transaction value by providing financial institutions, startups, and developers worldwide with access to real-world data, offchain computation, and secure cross-chain interoperability across any blockchain. Chainlink powers verifiable applications and high-integrity markets for banking, DeFi, global trade, gaming, and other major sectors.
Learn more about Chainlink by visiting chain.link (https://chain.link/) or reading the developer documentation at docs.chain.link (https://docs.chain.link/).
