Link: https://snapshot.org/#/morpho.eth/proposal/0xaa8fa1f68664d92b1c8724f4f3b23cea4d9ea34ae1b5cbfb048218efcb04dfdf
Title: MIP42 - Gauntlet's vaults whitelisting

This submission proposes to whitelist Gauntlet vaults address to allow the transfer of potential $MORPHO rewards to their depositors.

As written in the forum on 7 March 2024, discussion related to that: https://forum.morpho.org/t/gauntlet-weth-prime-vault-whitelisting/495

Here was the discussion related to that:

- Introduction
This is a proposal to whitelist the Gauntlet WETH Prime Vault on MetaMorpho. The WETH vault will strategize to allocate supply of WETH towards liquid staking recursive yield markets.

For the initialization of this Vault, we will be whitelisting only the WSTETH/WETH market for supply.


- About Gauntlet
Gauntlet (https://www.gauntlet.xyz/) is a DeFi-native quantitative research firm specializing in risk management. We use battle-tested techniques (https://www.gauntlet.xyz/product/gauntlet-risk-for-defi-protocols) from the algorithmic trading industry to help protocols manage risk.

Gauntlet’s team of experienced quants are used to trading in milliseconds and will use their expertise to curate a series of MetaMorpho vaults on top of Morpho Blue and contribute to the sophistication of the Morpho Ecosystem. The lending vaults will give users a simple and optimal way to earn yield on their assets.


- Market Specifications
The Gauntlet WETH Prime Vault will be initially whitelisting only this market:
wstETH/WETH (94.5%)
We will also whitelist the below market once it is created:

New Market:
Collateral asset: WSTETH
Borrow asset: WETH
LLTV: 0.965
Oracle: Exchange Rate Oracle


- Gauntlet WETH Prime Vault
Symbol: gtWETH
Objective: The WETH vault will strategize to optimize supply of WETH towards liquid staking recursive yield markets.


- Vault Fee
We’re excited to share that the WETH vault performance fee will be 0% for the first six months of launch.

Whitelisting Vault Contracts
MetaMorpho vaults may receive $MORPHO rewards from supplying to incentivized markets on Morpho Blue. To allow the vaults to transfer these potential $MORPHO rewards to suppliers, we propose whitelisting our vault addresses. The vault addresses will be provided once launched.


The proposal was voted on and accepted on 11 March 2024.