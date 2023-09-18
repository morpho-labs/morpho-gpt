Link: https://snapshot.org/#/morpho.eth/proposal/0xde4e145faee4f56ac3d6e9e245747ab8eeb458ee39da194a772197bba62da7ce
Title: MIP13 - Add a timelock to the AaveV3 ETH Optimizer owner
This submission proposes to set the Morpho Admin as the owner of the AaveV3 ETH Optimizer like other Morpho protocols. The Morpho Admin is a Safe without signers that is directly controlled by the Morpho DAO, but with a delay of 24 hours between submitting a transaction modifying the state of the protocol and its execution.

As written in the forum on 8 May 2023, discussion related to that: https://forum.morpho.org/t/mip-add-a-timelock-to-the-aavev3-eth-optimizer-owner/297

Here was the discussion related to that:
Summary
The Morpho Association proposes to set the Morpho Admin (https://etherscan.io/address/0x0b9915c13e8e184951df0d9c0b104f8f1277648b) as the owner of the AaveV3 ETH Optimizer (https://etherscan.io/address/0x33333aea097c193e66081e930c33020272b33333) like other Morpho protocols. The Morpho Admin is a Safe without signers that is directly controlled by the Morpho DAO, but with a delay of 24 hours between submitting a transaction modifying the state of the protocol and its execution.

Context
Recently MIP12 has successfully passed and been executed to set the multisig of the DAO as the owner of the AaveV3 ETH Optimizer and update the operator’s role to trigger some of the governance functions.
For the sake of resiliency, the Morpho Association proposes to take a step further and give ownership to the Morpho Admin. The Morpho Admin has a cooldown of 24 hours between a transaction submission by the multisig of the DAO and its potential execution through a Delay Modifier (https://etherscan.io/address/0x33333aea097c193e66081e930c33020272b33333).
You can follow this link (https://docs.morpho.xyz/usdmorpho-token/governance/dao-infrastructure#step-4-introduce-modular-decentralization-and-deploy-delay) to learn more about the DAO’s current governance setup.

Specification of the proposal
The process would be the following:
1) The DAO multisig sets the Morpho Admin as pending owner of the protocol.
2) The Safe accepts the ownership.

Addresses of the different contracts:
- AaveV3 ETH Optimizer: 0x33333aea097c193e66081e930c33020272b33333 (https://etherscan.io/address/0x33333aea097c193e66081e930c33020272b33333)
- DAO multisig: 0xcba28b38103307ec8da98377fff9816c164f9afa (https://etherscan.io/address/0xcba28b38103307ec8da98377fff9816c164f9afa)
- Delay Modifier: 0x68d11129a514c45716e55b9771813f117c4c2fa5 (https://etherscan.io/address/0x68d11129a514c45716e55b9771813f117c4c2fa5)
- Morpho Admin: 0x0b9915c13e8e184951df0d9c0b104f8f1277648b (https://etherscan.io/address/0x0b9915c13e8e184951df0d9c0b104f8f1277648b)

The proposal was voted on and accepted on 12 May 2023.
