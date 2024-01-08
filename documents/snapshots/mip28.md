Link: https://snapshot.org/#/morpho.eth/proposal/0x07f6f6d9b6b17c7df4797ee5e87105627ca713cb10a5815451cd61d283fe7e59
Title: MIP28 - Morpho DAO as owner of Morpho Blue

This submission proposes that the Morpho DAO multisig becomes the owner of the new Morpho Blue protocol.

As written in the forum on 31 december 2023, discussion related to that: https://forum.morpho.org/t/mip-morpho-dao-as-owner-of-morpho-blue/409

Here was the discussion related to that:
Context
The Morpho core contributors have been developing the Morpho Blue (https://morpho.mirror.xyz/hfVXz323zp9CmJ1PLDL4UhdLITGQ865VIJUyvZYyMA4) protocol over the last year.
As a reminder, Morpho Blue is a noncustodial lending protocol implemented for the Ethereum Virtual Machine. Morpho Blue offers a new trustless primitive with increased efficiency and flexibility compared to existing lending platforms. It provides permissionless risk management and permissionless market creation with oracle agnostic pricing. It also enables higher collateralization factors, improved interest rates, and lower gas consumption. The protocol is designed to be a simple, immutable, and governance-minimized base layer that allows for a wide variety of other layers to be built on top. Morpho Blue also offers a convenient developer experience with a singleton implementation, callbacks, free flash loans, and account management features.
More detailed information about Morpho Blue is available in its whitepaper (https://github.com/morpho-org/morpho-blue/blob/main/morpho-blue-whitepaper.pdf).

Specification
After several security reviews and a contest (https://github.com/morpho-org/morpho-blue/tree/main/audits), the Morpho Association has recently deployed the Morpho Blue smart contract (https://etherscan.io/address/0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb#code) with the setup below.
- Enabled LLTVs: 0%; 38.5%; 62.5%; 77.0%; 86.0%; 94.5%; 96.5%; 98%.
- Enabled IRMs:
  - address(0) to enable “idle” markets, i.e., markets whose only purpose is to deposit idle funds that can’t be borrowed. It’s especially useful for risk management in MetaMorpho vaults.
  - AdaptiveCurveIrm (https://etherscan.io/address/0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC#readContract)

Now the Morpho Association proposes that the Morpho DAO become its owner.

After transfer of the ownership, the DAO will be able to:
- Enable new IRMs.
- Enable new LLTVs.
- Set a per-market fee.
- Set the fee recipient.
- Set the owner.
As a reminder, Morpho Blue’s smart contract is immutable and the functions above are the only functions with an admin role.

Next Steps
The Morpho Association will submit the vote on Snapshot in the following days.
In case the Morpho DAO members accept the proposal, the Morpho Association will transfer the ownership to the Morpho DAO: morpho.eth = 0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa (https://etherscan.io/address/0xcba28b38103307ec8da98377fff9816c164f9afa)
The DAO will also set the ENS subdomain blue.morpho.eth with the address: 0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb

The proposal was voted on and accepted on 6 january 2024.
