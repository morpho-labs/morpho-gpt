Link: https://snapshot.org/#/morpho.eth/proposal/0x0cfdd2f33a13975f6b85cf216d8c85ccf23d12ee6e325063477b0a219c532785
Title: MIP26 - Steakhouse's RWA-backed Flagship USDC MetaMorpho Vault Whitelisting

This submission proposes to whitelist the Steakhouse USDC MetaMorpho vault address to transfer MORPHO tokens. The vault address will be provided once launched.

As written in the forum on 9 november 2023, discussion related to that: https://forum.morpho.org/t/steakhouse-financial-rwa-backed-flagship-usdc-metamorpho-vault-whitlisting/375

Here was the discussion related to that:
1. TLDR:
- Steakhouse will be launching a USDC MetaMorpho vault that will initially lend against tokenized T-bills (Backed Finance’s bIB01 - https://www.backedassets.fi/products/bib01) on Morpho Blue markets.
- Backed’s bIB01 is a ERC-20 token (https://etherscan.io/token/0xCA30c93B02514f86d5C86a6e375E3A330B435Fb5) that tracks the price of the iShares $ Treasury Bond 0-1yr UCITS ETF.
- Going forward, Steakhouse’s focus will be on curating vaults that enable stablecoin lending backed by RWAs, bridging real-world yields with DeFi. Our roadmap includes adding new collateral assets and vaults.
  - Future collateral assets could include other tokenized T-bills (https://www.steakhouse.financial/projects/tokenized-tbills-2023), longer-term treasuries (e.g. bIBTA - https://www.backedassets.fi/products/bibta), corporate bonds (e.g. bERNA - https://www.backedassets.fi/products/berna), or other yield-bearing institutional securities.
  - Future vaults could include other stablecoins, including non-US denominated stablecoins and KYC-ed stablecoins.
 
2. Introducing RWA-backed Steakhouse USDC MetaMorpho Vault
MetaMorpho vaults make lending simple for passive lenders. By supplying their idle liquidity into the vault, lenders earn yield and delegate risk management to the vault curators, who abstract the complexities by selecting risk parameters (e.g. appropriate collateral, LLTV and oracles) on behalf of users.
The inaugural USDC vault curated by Steakhouse Financial will initially lend against tokenized T-bills, namely Backed Finance’s bIB01. bIB01 is an ERC-20 token backed by IB01 (Blackrock’s iShares 0-1 yr US Treasury ETF - https://www.ishares.com/uk/individual/en/products/307243/ishares-treasury-bond-0-1yr-ucits-etf). Suppliers to the vault can earn a passive yield by lending their USDC to over-collateralized borrowers, who in turn provide bIB01 as collateral for their loans.
We believe bIB01 makes an ideal collateral asset, thanks to the price stability of the underlying treasuries. At the time of the writing, IB01 had a 3-year standard deviation of 0.63% and a yield to maturity of 5.2%. Volatile and non-yielding assets like BTC and ETH are often subject to low Loan-To-Value ratios in lending markets to the detriment of capital efficiency. bIB01’s stability is a desirable attribute for enhancing capital efficiency.
With circulating supply of ~$47m (https://app.rwa.xyz/treasuries), bIB01 is currently available for issuance and redemption for non-US professional investors only. The registration process requires KYC - details can be found on Backed Finance’s website: https://www.backedassets.fi/create-an-account. As such, the borrowers on the USDC (bIB01) market on MorphoBlue will initially be restricted to authorized users. The USDC MetaMorpho vault is permissionless and open to anyone who supplies USDC.
While the USDC vault will start with only the USDC (bIB01) market, it is meant to be extended over time to other opportunities such as other T-bill like products from other issuers and/or other public securities. Depending on liquidity management, markets using cryptocurrencies as collateral might be added, though selection will remain on blue chips.
The objective of the vault will be to generate stable and low-risk yield by mainly supplying to markets with Real-World Assets (RWA) as collateral.

3. Whitelisting Vault Contract
It is possible that the USDC MetaMorpho vault will receive $MORPHO rewards from supplying to incentivized markets on Morpho Blue. To allow the vault to transfer these potential $MORPHO rewards to depositors, we propose whitelisting our vault address. The vault address will be provided once launched.

4. About Steakhouse
Steakhouse Financial 4 is a crypto-native advisory group dedicated to advancing and scaling blockchain-based financial infrastructure. Our team of collaborators brings a wealth of experience in financial advisory, analytics and legal research. Our chefs are consultants to some of the largest DAOs and DeFi projects and have amassed domain expertise in stablecoins and RWAs.
- @sebventures - https://twitter.com/SebVentures (Founding Chef)
Implemented RWA-strategy at MakerDAO since 2020
Focus on merging DeFi and traditional finance to create a better financial system: crypto-banking
Asset-Liability Management geek
PhD in Data Science from Strasbourg University
- @adcv - https://twitter.com/adcv_ (Founding Chef)
Lead contributor to the Finance Workstream at Lido DAO, contributor to the Strategic Finance Core Unit at MakerDAO
10 years of experience in finance, consulting, and operations including M&A advisory and investment banking and as a turnaround manager for a small business
MBA from INSEAD, MSc Industrial Engineering and BSc Electrical Engineering from EPFL
CFA Charterholder
- @aes - https://twitter.com/AesPoker (Founding Chef)
Team leader of the Strategic Finance Core Unit at MakerDAO
10 years of finance, consulting, and operations experience including Thermo Fisher Scientific (NYSE: TMO), and Deloitte Consulting LLP
BS in Finance & Management from Northeastern University
Passed all three levels of the CFA exam
- @equanimiti - https://twitter.com/sonyasunkim (Lead Financial Chef)
Contributor to the Finance Workstream at Lido DAO and manager of a liquid token fund
10 years of experience in investment management. Former equity fund manager overseeing few billions in assets on behalf of institutional clients
Master of Finance from Massachusetts Institute of Technology, BA in Mathematics from New York University
Passed all three levels of the CFA exam
- @dsm - https://twitter.com/dzidzoh (Chief Legal Chef)
Contributor to the Strategic Finance Core Unit at MakerDAO
8 years of experience including capital markets transactions and U.S. securities law at Latham & Watkins.
JD from Cornell Law School, BA in Philosophy & Political Science from University of Toronto
Admitted to practice in the state of New York

5. Disclaimers
PLEASE REFER TO OUR FULL DISCLAIMERS HERE: https://www.steakhouse.financial/disclaimers

The proposal was voted on and accepted on 8 december 2023.
