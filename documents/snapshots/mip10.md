Link: https://snapshot.org/#/morpho.eth/proposal/0xacdce6c39493066ee934ec2b679422b783d9508bf648853e9fc081ee97476471
Title: MIP10 - Morpho, Lenses & Vaults upgrades
This submission proposes to upgrade the Morpho, Lenses & Vaults for the reasons mentioned in the forum post attached to the description.

As written in the forum on 25 January 2023, discussion related to that: https://forum.morpho.org/t/mip-morpho-lenses-vaults-upgrades/252

Here was the discussion related to that:
Morpho & Lenses Upgrades
Following Spearbit’s recommendation, Morpho Labs proposes to upgrade both Morpho and Lens contracts to:
- Make contracts more maintainable and resilient.
- Prevent the deprecation of a market if it hasn’t been paused earlier.
- Deprecate pool rewards on Morpho-AaveV2 since no rewards are planned on Aave V2, and Aave V3 is to be deployed on mainnet. The unnecessary logic is removed and thus saves gas.
- Update Lenses to reflect changes and fix specific getters (`getNextUserSupplyRatePerYear` and `getNextUserBorrowRatePerYear`).
- Remove the useless function `setAssetAsCollateral` in Morpho-AaveV2.
- Eliminate cumbersome code duplication by implementing shared interest rates logic between Morpho’s `InterestRatesManager` contract and Lens.

Vaults Upgrade
The Morpho Labs team proposes to upgrade the vaults to:
- Make vaults more gas efficient. Some variables will be set to `immutable` to avoid reading the storage at each interaction with a vault.
- Make the redistribution of rewards more secure and maintainable. After this upgrade, the DAO would no longer need to specify the amount and the recipient to transfer $MORPHO rewards from a vault to the vault rewards distributor (https://etherscan.io/address/0x60345417a227ad7e312eaa1b5ec5cd1fe5e2cdc6). The recipient of the rewards will be set, at construction time, to the vault rewards distributor. All $MORPHO tokens held in a vault can be then transferred to the rewards distributor through a public function `transferRewards` to the recipient. The DAO’s multisig can still trigger the function, but any EOA can also trigger it to accelerate the process.

Security
As always, security is a principal concern for the Morpho Labs team. Below are the measures that have been or will be taken:
- The PR (https://github.com/morpho-dao/morpho-v1/pull/1554) of the Morpho contracts will be reviewed by Spearbit (https://spearbit.com/).
- The PR (https://github.com/morpho-dao/morpho-tokenized-vaults/pull/193) of the vaults’ upgrade will be reviewed by Pessimistic (https://pessimistic.io/).
- Production tests have been run to test both upgrades.
- Our CI tool has been run to check any storage clashes introduced by upgrades.
- For the upgrade process, the upgrade checklist (https://github.com/morpho-dao/morpho-security/blob/main/upgrade-checklist.md) will be followed.

Delay
The upgrade will only happen once the audits have been performed and a delay modifier is added to the DAO multisig. This delay adds 24 hours between the moment a tx is submitted to the DAO multisig and the moment it can be executed.

Upgrade Process for Morpho and Lens
- Deploy implementation contracts with an EOA.
- Upgrade contracts with the DAO multisig and set the correct new contracts to Morpho’s storage.

Upgrade Process for Vaults
- Deploy the SupplyVault implementations for Morpho-Aave and Morpho-Compound (2 contracts to deploy).
- Upgrade all vaults proxy to point to the correct implementation.

Morpho Labs received the reports from Pessimistic (https://forum.morpho.org/uploads/short-url/kraJwpivzbznQa2Bgwu7VXQD2Z0.pdf) for the vaults and Spearbit (https://forum.morpho.org/uploads/short-url/1XJ8PetG847mR9H8TLRdnMQPhif.pdf) for the Morpho protocol

The proposal was voted on and accepted on 5 Marsh 2023.

The payloads to upgrade the vaults have been submitted to the DelayModifier (0x68d11129a514c45716e55b9771813f117c4c2fa5):
- Upgrade of the Aave vaults
- Upgrade of the Compound vaults
The 2 upgrades were batched in this transaction (https://etherscan.io/tx/0x91e291d4c5efb918869dbddba4653e3119aebff8cd8ce13c607d9ef7aaa5dc37) on 12 Marsh 2023.
You can find detailed information about these transactions on this Notion page (https://morpho-labs.notion.site/Vaults-Upgrade-0-74b129a149944385b101a4502b3f4b7f).
Anyone can execute the upgrade on the DelayModifier (unless revoked by the DAO) by calling `executeNextTx` with the right parameters in 24 hours.

The payloads to upgrade the contracts and the lenses have been recently submitted to the `DelayModifier` (0x68d11129a514c45716e55b9771813f117c4c2fa5):
- Upgrade of the Morpho-Aave contracts
- Upgrade of the Morpho-Compound contracts
- Revoke some of the accessible functions of the Operator
The 2 upgrades were batched in this transaction (https://etherscan.io/tx/0x6344834e348cdd48f80dbf5826717a33397cadddbf76689d19500dd38152d5c1).
Anyone can execute the upgrade on the DelayModifier (unless revoked by the DAO) by calling `executeNextTx` with the right parameters in 24 hours.

The upgrades have been successfully accomplished on 19 Marsh 2023
New addresses for Morpho-AaveV2:
Morpho: 0xFBc7693f114273739C74a3FF028C13769C49F2d0 (https://etherscan.io/address/0xFBc7693f114273739C74a3FF028C13769C49F2d0)
EntryPositionsManager: 0x029Ee1AF5BafC481f9E8FBeD5164253f1266B968 (https://etherscan.io/address/0x029Ee1AF5BafC481f9E8FBeD5164253f1266B968)
ExitPositionsManager: 0xfd9b1Ad429667D27cE666EA800f828B931A974D2 (https://etherscan.io/address/0xfd9b1Ad429667D27cE666EA800f828B931A974D2)
InterestRatesManager: 0x22a4ecf5195c87605ae6bad413ae79d5c4170ff1 (https://etherscan.io/address/0x22a4ecf5195c87605ae6bad413ae79d5c4170ff1)
Lens: 0x4bf26012b64312b462bf70f2e42d1be8881d0f84 (https://etherscan.io/address/0x4bf26012b64312b462bf70f2e42d1be8881d0f84)

New addresses for Morpho-CompoundV2:
Morpho: 0xe3d7a242614174ccf9f96bd479c42795d666fc81 (https://etherscan.io/address/0xf29cc0319679b54bd25a8666fc0830b023c6a272)
PositionsManager: 0x79a1b5888009bB4887E00EA27CF52551aAf2A004 (https://etherscan.io/address/0x79a1b5888009bB4887E00EA27CF52551aAf2A004)
InterestRatesManager: 0xD9B7209eD2936b5c06990A8356D155c3665d43Ab (https://etherscan.io/address/0xD9B7209eD2936b5c06990A8356D155c3665d43Ab)
RewardsManager: [0x581c3816589ad0de7f9c76bc242c97fe96c9f100 (https://etherscan.io/address/0x581c3816589ad0de7f9c76bc242c97fe96c9f100)
Lens: 0x834632a7c70ddd7badd3d21ba9d885a9da66b0de (https://etherscan.io/address/0x834632a7c70ddd7badd3d21ba9d885a9da66b0de)
LensExtension: 0xc5c3bB32c70d1d547023346BD1E32a6c5BC7FD1e (https://etherscan.io/address/0xc5c3bB32c70d1d547023346BD1E32a6c5BC7FD1e)
