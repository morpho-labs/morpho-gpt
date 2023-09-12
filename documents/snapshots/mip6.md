Link: https://snapshot.org/#/morpho.eth/proposal/0x3a092cac286c9afdebc899bbb04c3a1787f82284b7aa885a7608d7e1eeab93a3
Title: MIP6 - Add granular pausing and asset deprecation
This submission proposes to give the governance more granularity over its power on the protocols, by adding granular pausing, asset deprecation, and increase peer-to-peer deltas.

As written in the forum on 3 December 2022, discussion related to that: https://forum.morpho.org/t/mip-add-granular-pausing-and-asset-deprecation/213

Here was the discussion related to that:
Context
Morpho Labs believes that adding granularity to governance-controlled functions like market pausing or asset depreciation, similar to the ones present in Aave and Compound, could improve the resilience of the protocol.

Proposal
The Morpho Labs team would like to give the governance more granularity over its power on the protocols.
Currently, a market can be “partially paused”, preventing any supply or borrow, or “paused”, preventing any interaction with this market. We propose partitioning these two pausing categories into 6. Governance would be able to pause supply, borrow, withdraw, and repay functions for each market, as well as pause liquidators from seizing or repaying any specific asset. Thus, governance can disable certain functions without applying inappropriate restrictions. This power would be given to the Morpho operator 3/5 multisig. (see Zodiac and Future Decentralization (https://docs.morpho.org/governance/organization/contracts-architecture#future-decentralization)).
Also, we would like to add a native market deprecation feature, very similar to Compound’s one. When the market would be set as deprecated, all the debt on this market could be instantly liquidated, leaving the market with 0 borrowers. Only the DAO multisig and the Reality Module (https://github.com/gnosis/zodiac-module-reality) would have the rights to trigger these functions.
Finally, we would like to add a way for the governance to manually increase peer-to-peer deltas on a given market. This function would allow to put some liquidity back on the pool, in constant time, as there would be no need to demote anyone. It would be useful in a market deprecation process, or when the peer-to-peer matching mechanism cause problems for example. The Morpho operator would receive the access to this function.

Implementation
To be able to pause the 6 different scenarios granularly, we need 6 new storage variables. We also need one storage variable for the deprecated status. In order not to break the previous contract’s ABI, we added a new storage slot at the end of the existing ones, which contains a struct with those 7 variables.
At the moment, the two pause statuses are given by two variables per market: isPartiallyPaused pausing the supply and borrow functions, and isPaused pausing the supply, borrow, withdraw, repay and liquidate (both on the collateral and on the debt) functions. The proposed changes would mean that variables isPaused and isPartiallyPaused would no longer be used. They will be set to false, and never read nor written again by the protocol. We are calling both on-chain and off-chain integrators to give their opinion on this choice.
We also added 7 governance functions to set those 7 variables, as well as an increaseP2PDeltas function to increase the peer-to-peer delta by a given amount, on a given market.
Two external security audits by Pessimistic (https://pessimistic.io/) and Spearbit (https://spearbit.com/) are being finalized, we will share the reports as soon as they are ready.

Next steps
After a discussion with the community, Morpho Labs would open a vote on Snapshot. If it passes, the Morpho association would upgrade both Morpho-Compound and Morpho-Aave with the new contracts implementing these new features. It would also update the Zodiac Roles module, to grant the pausing rights to the Morpho operator, as discussed in the proposal.

The proposal was voted on and accepted on 9 December 2022.

The upgrade has been successfully conducted.

Here are the relevant smart contract addresses:
Morpho-Compound
Morpho Proxy: 0x8888882f8f843896699869179fb6e4f7e3b58888 (https://etherscan.io/address/0x8888882f8f843896699869179fb6e4f7e3b58888)
Morpho Implementation: 0xbbb011b923f382543a94e67e1d0c88d9763356e5 (https://etherscan.io/address/0xbbb011b923f382543a94e67e1d0c88d9763356e5)
PositionsManager: 0x309a4505d79fcc59affaba205fdcb880d400ef39 (https://etherscan.io/address/0x309a4505d79fcc59affaba205fdcb880d400ef39)
InterestRatesManager: 0x3e483225666871d192b686c42e6834e217a9871c (https://etherscan.io/address/0x3e483225666871d192b686c42e6834e217a9871c)
RewardsManager Proxy: 0x78681e63b6f3ad81ecd64aecc404d765b529c80d (https://etherscan.io/address/0x78681e63b6f3ad81ecd64aecc404d765b529c80d)
RewardsManager Implementation: 0xf47963cc317ebe4b8ebcf30f6e144b7e7e5571b7 (https://etherscan.io/address/0xf47963cc317ebe4b8ebcf30f6e144b7e7e5571b7)
Lens Proxy: 0x930f1b46e1d081ec1524efd95752be3ece51ef67 (https://etherscan.io/address/0x930f1b46e1d081ec1524efd95752be3ece51ef67)
Lens Implementation: 0xe54dde06d245fadcba50dd786f717d44c341f81b (https://etherscan.io/address/0xe54dde06d245fadcba50dd786f717d44c341f81b)
CompRewardsLens: 0x9e977f745d5ae26c6d47ac5417ee112312873ba7 (https://etherscan.io/address/0x9e977f745d5ae26c6d47ac5417ee112312873ba7)
Morpho-AaveV2
Morpho Proxy: 0x777777c9898d384f785ee44acfe945efdff5f3e0 (https://etherscan.io/address/0x777777c9898d384f785ee44acfe945efdff5f3e0)
Morpho Implementation: 0x206a1609a484db5129ca118f138e5a8abb9c61e0 (https://etherscan.io/address/0x206a1609a484db5129ca118f138e5a8abb9c61e0)
EntryPositionsManager: 0x2a46cad23484c15f60663ece368395b3a249632a (https://etherscan.io/address/0x2a46cad23484c15f60663ece368395b3a249632a)
ExitPositionsManager: 0xfa652aa169c23277a941cf2d23d2d707fda60ed9 (https://etherscan.io/address/0xfa652aa169c23277a941cf2d23d2d707fda60ed9)
InterestRatesManager: 0x4f54235e17eb8dcdfc941a77e7734a537f7bed86 (https://etherscan.io/address/0x4f54235e17eb8dcdfc941a77e7734a537f7bed86)
Lens Proxy: 0x507fa343d0a90786d86c7cd885f5c49263a91ff4 (https://etherscan.io/address/0x507fa343d0a90786d86c7cd885f5c49263a91ff4)
Lens Implementation: 0xce23e457fb01454b8c59e31f4f72e4bd3d29b5eb (https://etherscan.io/address/0xce23e457fb01454b8c59e31f4f72e4bd3d29b5eb)
