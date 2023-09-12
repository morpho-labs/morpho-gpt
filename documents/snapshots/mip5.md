Link: https://snapshot.org/#/morpho.eth/proposal/0x816e4971cd3919bc8df7ad0892ead985f8eba8d72a7644a6b5a022847b123059
Title: MIP5 - Whitelist Morpho's vaults and Sense contracts to transfer $MORPHO tokens
This submission proposes to whitelist Morpho’s ERC4626 vaults and the rewards distributor contract to transfer $MORPHO tokens to users. Moreover, the proposal includes the whitelisting of the Sense contracts.

As written in the forum on on 9 November 2022, discussion related to that: https://forum.morpho.org/t/mip-erc4626-adapter-whitelisting/178/1

Here was the discussion related to that:
Summary
Proposal to whitelist Morpho’s ERC4626 vaults and the rewards distributor contract to transfer $MORPHO tokens to users. Moreover, this proposal includes the whitelisting of the Sense contracts.

Context
The Morpho DAO recently deployed Morpho’s vaults. To be able to redistribute $MORPHO rewards among vault users, a set of smart contracts must be whitelisted to transfer MORPHO tokens.
As of now, the $MORPHO token (deployed here (https://etherscan.io/address/0x9994e35db50125e0df82e4c2dde62496ce330999) and the repository can be found here (https://github.com/morpho-dao/morpho-token)) is not transferrable. However, the $MORPHO token implementation has different roles:
- 0) Allows triggering transfer and transferFrom functions.
- 1) Allows to mint tokens (only the DAO multisig has this role) and Allows 0).
The RewardsDistributor (https://etherscan.io/address/0x3b14e5c73e0a56d607a8688098326fd4b4292135) for Morpho-Aave and Morpho-Compound has the role 1), so that users can claim their $MORPHO rewards.

Rewards Distribution for Vaults
Morpho’s vaults are considered regular Morpho’s users which means that they are entitled to $MORPHO rewards. Anyone can claim the vault’s rewards on their behalf by sending $MORPHO tokens to the vault. On each vault, a transfer function lets the transfer of ERC20 tokens (only by the DAO).
To be able to redistribute those rewards to the Vault’s users (like Sense which has written a similar proposal that we could bundle into one single snapshot vote), we are proposing the following:
- The function mentioned above can be used to then send $MORPHO tokens to a fresh new RewardsDistributor specific to the vaults deployed here (https://etherscan.io/address/0x60345417a227ad7e312eaa1b5ec5cd1fe5e2cdc6).
- The mechanism of this RewardsDistributor would be exactly the same as for Morpho’s core protocol. Thus, a Merkle tree must be updated after the end of each epoch.
This solution avoids modifying the construction of the Merkle tree related to Morpho’s core protocol and thus allows a more scalable way to manage rewards.
For this mechanism to work, the new RewardsDistributor contract as well as all vaults’ contracts must be granted the role 1).
You can find vault addresses in the Morpho developer’s documentation (https://developers.morpho.org/links/deployments).

Conclusion
We propose to grant role 1) on the $MORPHO token to:
- The new RewardsDistributor (https://etherscan.io/address/0x60345417a227ad7e312eaa1b5ec5cd1fe5e2cdc6) for the vaults
- All Morpho’s vaults (https://developers.morpho.org/links/deployments)
We also propose bundling this proposal with Sense’s one to whitelist their contracts so they can redistribute rewards among their users.

The proposal was voted on and accepted on 6 December 2022.
