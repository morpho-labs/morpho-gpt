Link: https://snapshot.org/#/morpho.eth/proposal/0xfdabf7dd37ba8f0d304842690edf3a6638743194bcf8e39e485ac8e0720258ea
Title: MIP59 - Morpho DAO as owner of Morpho Blue on Base

This submission proposes to start distributing rewards on markets with a MetaMorpho vault as collateral listed in either the RE7 USDA vault or the Gauntlet USDA vault. The rate on these markets would be 100 MORPHO per day.

As written in the forum on 14 May 2024, discussion related to that: https://forum.morpho.org/t/mip59-morpho-dao-as-owner-of-morpho-blue-on-base/599

Here was the discussion related to that:
- Context
Morpho Blue and its periphery smart contracts have been deployed on Ethereum for just over four months. During this period, the protocol has seen significant traction, with total deposits reaching $1.2B.
Since Morpho Blue’s deployment on Mainnet, there has been growing demand from integrators and users to access Morpho Blue on Layer 2 blockchains (L2s) where they can benefit from significantly lower transaction costs.
To date, there is notable interest from integrators already present on Base, an Ethereum L2 built using the Optimism Stack, who have expressed willingness to integrate Morpho Blue as soon as it’s deployed. Hence, Base presents the best opportunity to expand the Morpho Ecosystem and increase accessibility to Morpho Blue, particularly for cost-sensitive users.

- Specification
The Morpho Association has recently deployed Morpho Blue and its periphery contracts with the same configuration as on Ethereum.
    - Deployment Addresses
Morpho Blue: 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb
AdaptiveCurveIrm (the Interest Rate Model): 0x46415998764C29aB2a25CbeA6254146D50D22687
Oracle Factory: 0x2DC205F24BCb6B311E5cdf0745B0741648Aebd3d
MetaMorpho Vault Factory: 0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101
URD Factory: 0x7276454fc1cf9C408deeed722fd6b5E7A4CA25D8
PublicAllocator: 0xA090dD1a701408Df1d4d0B85b716c87565f90467
    - Morpho Blue Configuration
Enabled LLTVs: 0%; 38.5%; 62.5%; 77.0%; 86.0%; 91.5%; 94.5%; 96.5%; 98%.
Enabled IRMs: AdaptiveCurveIRM and address(0) to enable “idle” markets, i.e., markets whose only purpose is to deposit idle funds that can’t be borrowed. These markets are especially useful for risk and liquidity management for MetaMorpho vaults.

- Now, the Morpho Association proposes that the Morpho DAO becomes the owner.
After the transfer of ownership, the DAO will be able to:
Enable new IRMs.
Enable new LLTVs.
Set a per-market fee.
Set the fee recipient.
Set the owner.
As a reminder, Morpho Blue’s smart contract is immutable and the functions above are the only functions with an admin role.

In case the Morpho DAO members accept the proposal, the Morpho Association will transfer the ownership to the Morpho DAO (0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa) whose multisig must be deployed.

The proposal was voted on and accepted on 20 May 2024.