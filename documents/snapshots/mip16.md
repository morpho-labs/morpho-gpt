Link: https://snapshot.org/#/morpho.eth/proposal/0x51c4e5904ec5b4e75743eb9829d93cd7f0bf4ccda8c38dd0bd3375b2a205d207
Title: MIP16 - Accept ownership of the vault ma3WETH
This submission proposes that the DAO accepts the ownership of the SupplyVault for WETH on the AaveV3-ETH Optimizer.

As written in the forum on 20 June 2023, discussion related to that: https://forum.morpho.org/t/mip-accept-ownership-of-the-vault-ma3weth/322

Here was the discussion related to that:
Summary
The Morpho Association proposes that the DAO accepts the ownership of the SupplyVault for WETH on the AaveV3-ETH Optimizer.

Motivation
The Morpho Association has deployed a SupplyVault (https://github.com/morpho-org/morpho-aave-v3/blob/dev/src/extensions/SupplyVault.sol) contract after it was audited by Spearbit. The SupplyVault contract is an ERC4626 contract that allows assets to be deposited as supply only on AaveV3 Optimizers. In this case, the deployed contract allows WETH to be deposited into the AaveV3-ETH Optimizer called ma3WETH. This unlocks various integrations, such as creating Balancer pools paired with ma3WETH. At deployment, ownership was transferred to the DAO using a 2-step process for ownership transfer. The Morpho Association proposes that the DAO accepts the ownership to grant it the ability to trigger the following functions:
- `setMaxIterations`: sets the maximum iterations to use when this vault interacts with Morpho.
- `setRecipient`: sets the recipient for the `skim` function. The `skim` function allows the owner to skim ERC20 tokens (usually reward tokens) lying on the vault to a specific recipient (which could be a rewards distributor).

Specification
The steps are the following:
- Submit a call triggering the `acceptOwnership` function on the ma3WETH contract through the `MorphoAdmin` contract.
- After a delay of 14 hours, execute the transaction.

Testing
Here is a test (https://github.com/morpho-org/morpho-seatbelt/pull/49) of the transaction to be submitted.

References
SupplyVault code: morpho-aave-v3/src/extensions/SupplyVault.sol at dev morpho-org/morpho-aave-v3 GitHub (https://github.com/morpho-org/morpho-aave-v3/blob/dev/src/extensions/SupplyVault.sol)
ma3WETH address: TransparentUpgradeableProxy | Address 0x39dd7790e75c6f663731f7e1fdc0f35007d3879b | Etherscan (https://etherscan.io/address/0x39dd7790e75c6f663731f7e1fdc0f35007d3879b)

The proposal was voted on and accepted on 24 June 2023.

The proposal has been successfully executed on 3 July 2023 with this transaction: https://etherscan.io/tx/0x687807ac3c21434fed4d749892aaa98d59cd54bd5090438bc942d5b2128f3326
