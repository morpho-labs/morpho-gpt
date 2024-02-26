Link: https://snapshot.org/#/morpho.eth/proposal/0x040d49f72c9fc89d950cd0adcc3832f46951401a790e502fb4551536c20cc3f2
Title: MIP38 - Flagship USDT and sDAI MetaMorpho Vaults whitelisting

This submission proposes to whitelist Flagship USDT and sDAI MetaMorpho vaults address to allow the transfer of potential $MORPHO rewards to their depositors.

As written in the forum on 7 February 2024, discussion related to that: https://forum.morpho.org/t/flagship-usdt-and-sdai-metamorpho-vaults-whitelisting/458

Here was the discussion related to that:
- Introduction
After a successful launch of both Flagship ETH and USDC (bbETH & bbUSDC) and as we continue to monitor the market, adjust and scale up our infrastructure, we think it is the right time to launch two new Flagship vaults.
Our goal is to give users access to passive yield on top of Morpho Blue for the biggest assets and today we’re happy to announce that we are launching Flagship USDT and Flagship sDAI Vaults (bbUSDT & bbSDAI). These two vaults similarly to Flagship USDC will initially supply to stETH, WETH and WBTC collateral markets, focusing only on blue-chip crypto collateral markets.
This proposal seeks Morpho DAO’s approval to whitelist the vaults’ smart contracts and make them eligible to transfer potential $MORPHO rewards to depositors.

- Block Analitica and B.Protocol Partnership
Read our original forum post (https://forum.morpho.org/t/block-analitica-b-protocol-flagship-eth-and-usdc-metamorpho-vaults-whitelisting/372) to learn more about our partnership. A few links for the community to keep up to date with our recent contributions to Morpho:
    - Morpho dashboard (https://morpho.blockanalitica.com/)
    - Decentralized guardian setup (https://forum.morpho.org/t/flagship-vault-guardian-voting-tutorial-for-lps/422) to give users control over critical vault decisions
    - The combinations of our approaches to assessing risks: SmartLTV (https://medium.com/b-protocol/setting-up-risk-levels-in-metamorpho-markets-with-smartltv-7e15487a15c9), MetaMorpho risk model (https://forum.morpho.org/t/introducing-metamorpho-risk-model/447)
    - Our most recent market update (https://forum.morpho.org/t/update-on-bbeth-and-morphos-market-state-at-launch/450)
    - pymorpho (https://github.com/kakagri/pymorpho), a python implementation of Morpho to use for simulations

- The Flagship USDT and sDAI MetaMorpho vaults
Flagship USDT and sDAI will be rolled out consecutively, both vaults aim to generate yield from blue-chip collateral markets.

Why USDT and sDAI ?
The choice of USDT and sDAI for our two new vaults is grounded in the established and widely embraced use cases within decentralized lending today. USDT is the biggest stablecoin and one of the biggest borrow markets in DeFi today. The choice of sDAI instead of DAI will simplify yield generation for (s)DAI holders and will give holders a new venue to generate yield on top of the DSR.

Which markets will we target ?
Our flagship USDT and sDAI vaults will concentrate on supplying to blue-chip crypto collateral markets. The vaults will initially supply to stETH, WETH and WBTC collateral markets and subsequently explore stablecoin and other LST collateral markets.

Who is it for?
These vaults will be tailored for lenders seeking a set-and-forget solution with primary exposure to blue-chip crypto collateral markets.

Vault Objective
The goal of the flagship USDT and sDAI vaults is to optimize interest earned from blue-chip crypto collateral markets. This will be done by dynamically allocating funds between the different Morpho Blue markets based on the best risk-return ratios at any given time.

- Roadmap
The Flagship USDT MetaMorpho vault will be available from today, followed by the launch of the sDAI MetaMorpho vault. This methodical sequence as has been the case with bbETH and bbUSDC ensures our unwavering focus, a smooth and gradual growth process, offering users a seamless experience with MetaMorpho.
As Morpho Blue and MetaMorpho continue to build a track record, we look forward to continuing our active work and collaboration with stakeholders in the Morpho Ecosystem and remain dedicated to shaping its continued success.

Whitelisting the Vault Contracts
MetaMorpho vaults curated by us may receive $MORPHO rewards from supplying to incentivized markets on Morpho Blue. To allow the vaults to transfer these potential $MORPHO rewards to depositors, we propose whitelisting our vault addresses.
bbUSDT: 0x2C25f6C25770fFEC5959D34B94Bf898865e5D6b1 (https://etherscan.io/address/0x2C25f6C25770fFEC5959D34B94Bf898865e5D6b1)
Flagship sDAI address will be provided when launched.

The proposal was voted on and accepted on 25 February 2024.