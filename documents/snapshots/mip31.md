Link: https://snapshot.org/#/morpho.eth/proposal/0x9c11cca501de0b0ad58d20a4d60cae81eb08665768eb3dc988ce088ff8c5916d
Title: MIP31 - Re7 Lab's LST-backed ETH MetaMorpho Vault Whitelisting

This submission proposes to whitelist the Re7 Lab's LST-backed ETH MetaMorpho Vault address to allow the vault to transfer potential $MORPHO rewards to depositors.

As written in the forum on 12 January 2024, discussion related to that: https://forum.morpho.org/t/re7-labs-lst-backed-eth-metamorpho-vault-whitelisting/427

Here was the discussion related to that:
- TLDR
Re7 Labs will be launching a MetaMorpho vault that will lend ETH against various liquid staking tokens (LSTs). The goal is to drive adoption to LSTs by enabling leverage strategies and provide an above-market lending rate to ETH depositors.
Finding diversified sources of risk-adjusted yield on ETH is increasingly difficult. Further, participation in staking has continued to drive down the base rate on ETH yield. This is against the backdrop of even more staked ETH tokens coming onto the market, each offering unique benefits.
With this vault we want to drive further adoption of various liquid staked ETH tokens. By providing a stable money market for each, our vault will provide lenders an attractive opportunity to diversify their ETH yield sources.

- The LST Opportunity
Liquid staking tokens are one of the largest asset classes in DeFi and have found good product-market fit by allowing users to take a receipt token for staked ETH and use it within DeFi. Staked ETH have historically offered an attractive and steady rate of return between 3-4% annualized, making them a productive asset for users to hold.
LSTs have also found extensive use as collateral in lending protocols. One of the most popular use cases in money markets has been leveraged staked ETH strategies. By depositing an LST as collateral in a money market, borrowing ETH and swapping or depositing the borrowed ETH again in to an LST, users can take advantage of the spread between the staked ETH return and the borrow rate to create a leveraged position that earns a multiple of vanilla staked ETH yield.
While a popular strategy, because of constraints around liquidity, oracles and protocol approaches to risk management, many LSTs have historically not been listed on current leading lending platforms. This means their holders have not been able to access this kind of leveraged staking strategy or otherwise utilize the asset as collateral. This reality has also reduced lending rates for ETH lenders, as borrow demand is capped by the yield available from collateral assets.
This has been a prudent step from pooled lending markets as these newer LSTs have taken time to build up reputation, deposits and secondary market liquidity. Some have only just turned on withdrawal functionality, or are in the process of decentralizing their governance mechanisms. Each LST has a unique profile and has to be evaluated against a number of potential risk factors.
We think this is a great opportunity to apply Morpho Blue’s isolated lending markets. By distributing ETH deposits across LSTs that have been thoroughly vetted our vault will provide liquidity against a diverse basket of markets. This reduces risk for the depositor and enables appropriate sizing for each market.

- A MetaMorpho Vault Curated by Re7
Re7 will be launching a MetaMorpho vault that takes ETH deposits and allocates to various LST / ETH markets on Morpho Blue.
Our LST-backed ETH MetaMorpho vault aims to:
Provide lending liquidity for longer-tail LST assets that currently can’t be used as collateral, enabling their holders to access leverage staking strategies.
Provide attractive yield for ETH holders by lending against LST assets that have historically higher yields.
We expect to launch with vault allocations to a set of LSTs and expand to further LST markets as vault liquidity grows.
We have been in discussions with all major liquid staking protocols to enable Morpho Blue markets for their LSTs and include them for allocation from our MetaMorpho vault. We have a number of staked ETH protocols we are working with to launch LST/ETH markets with their respective token.
Further, we have talked with multiple teams on how to enable incentive plans in order to bootstrap their markets and provide extremely attractive yields to ETH depositors in our vault. We plan to include many more LSTs once the vault has a baseline of liquidity, and already are in active discussions with various LST teams. Multiple teams have expressed strong commitments to provide incentives to bootstrap liquidity on their markets, at inception. Incentive packages will target a yield meaningfully above base staking rates to be attractive to depositors. More details will be given on this in the coming weeks.

- Roadmap
  - Re7 Labs deploys LST / ETH Vault
  - Morpho Blue Markets for LST / ETH launched
  - Vault opens for deposits
  - Project incentives seeded and announced to markets
  - Additional LST markets activated

- Whitelisting Vault Contract to $MORPHO
It is possible that the MetaMorpho vault will receive $MORPHO rewards from supplying to incentivized markets on Morpho Blue. To allow the vault to transfer these potential $MORPHO rewards to depositors, we propose whitelisting our vault address. The vault address will be provided once launched.

- About Re7 Labs
Re7 (https://re7.capital/) has been providing liquidity in DeFi since 2019 having deployed over $100m of assets. We bring practical experience (https://re7research.substack.com/p/defi-and-a-credit-crunch) to risk management from years of managing stablecoin and ETH yield strategies as well as further strategies like our Liquid Token fund. As DeFi-native managers, we have focused on enabling yield strategies, providing early liquidity to various DeFi protocols, and have worked with teams throughout the space on a close basis to grow DeFi liquidity while managing risk.
From our experience deploying capital we bring a unique perspective to risk management as practitioners and power users of DeFi. We have built extensive tooling to provide a deep view into risks in the market (https://re7research.substack.com/p/introducing-re7-risk-index) including liquidity monitoring, price alerts and a large suite of custom analytics tools. This has allowed us to stay on top of the ever-changing DeFi market, and we will bring this expertise to our MetaMorpho vault.
In addition to leveraging our experience for risk management, we bring an extensive rolodex of DeFi teams and have worked with over 500 projects across DeFi for liquidity provision and advisory. This has involved deployment on over 15 chains and dealing with all kinds of conditions within DeFi. We plan to use our contacts and experience to onboard further assets to Morpho Blue and ultimately our MetaMorpho vault.

The proposal was voted on and accepted on 21 january 2024.
