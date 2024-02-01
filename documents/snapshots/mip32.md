Link: https://snapshot.org/#/morpho.eth/proposal/0x78ba62a70dcbb0ffba25d6692fe370dcc5b1af4045b83241ea10c995112a11b0
Title: MIP32 - Whitelist the MORPHO URD to distribute rewards

This submission proposes to whitelist the URD by setting the role 0 on the MORPHO token to 0x678dDC1d07eaa166521325394cDEb1E4c086DF43

As written in the forum on 19 January 2024, discussion related to that: https://forum.morpho.org/t/mip-whitelist-the-morpho-urd-to-distribute-rewards/433

Here was the discussion related to that:
As part of the incentives campaign on Morpho Blue markets, MORPHO tokens are distributed to lenders. The distribution methodology has been described in this forum post (https://forum.morpho.org/t/standardized-method-for-distributing-incentives-on-morpho-blue-markets/412).
To distribute MORPHO tokens, the Morpho Association deployed a Universal Rewards Distributor (https://github.com/morpho-org/universal-rewards-distributor) (URD) contract at the following address: 0x678dDC1d07eaa166521325394cDEb1E4c086DF43 (https://etherscan.io/address/0x678dDC1d07eaa166521325394cDEb1E4c086DF43). For context, the URD is a smart contract allowing the distribution of multiple ERC20 tokens from a single Merkle tree computed offchain.
To be able to transfer MORPHO tokens to the entitled recipients of rewards the URD must be whitelisted on the MORPHO token by the Morpho DAO.
Hence, the association proposes to sets the role 0 on the MORPHO token to 0x678dDC1d07eaa166521325394cDEb1E4c086DF43 (https://etherscan.io/address/0x678dDC1d07eaa166521325394cDEb1E4c086DF43).

The proposal was voted on and accepted on 26 january 2024.
