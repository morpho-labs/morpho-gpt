Link: https://snapshot.org/#/morpho.eth/proposal/0x481ba93e6cca860cd392f269d71fd558ff28eeebbb455c052f952a852185b129
Title: MIP54 - MORPHO whitelisting of Superform vaults

This submission proposes to whitelist any current and future MetaMorpho Superform contracts created via the SuperformFactory.

As written in the forum on 25 April 2024, discussion related to that: https://forum.morpho.org/t/whitelist-morpho-token-transfers-from-superform-contracts-for-distribution-to-metamorpho-vault-depositors/579

Here was the discussion related to that:
- Intro
Hello, I’m blockdaddy from Superform Labs. Superform is a yield marketplace where protocols can list vaults and users can access those vaults from any chain with bridging, swapping, and depositing abstracted away by the Superform protocol.
There are currently 14 MetaMorpho vaults (and counting!) listed on Superform. Morpho is the first protocol that the Superform app will support displaying of additional rewards tokens beyond yield earned by the vault. The last piece of the equation will be to let Superform users claim their MORPHO rewards by whitelisting the transfer of MORPHO from Superform’s contracts.

- Context
When users deposit through Superform, their ERC-4626 vault shares are minted to an aggregator contract, while the user is minted a 1:1 representation of that yield called a “SuperPosition.” While SuperPositions allow yield to be represented cross-chain, among other benefits, MORPHO rewards will accrue to the Superform aggregator contract holding the ERC-4626 vault shares.
The aggregator contract which MORPHO tokens accrue to is called a “Superform” and there is one created for each listed MetaMorpho vault.
Users have expressed a desire to be able to claim their fair share of MORPHO rewards that are currently being accrued to the Superform contracts.

- Proposal
We are making a request to whitelist each “Superform” contract to move MORPHO tokens before token transferability is enabled. As new MetaMorpho vaults are listed to Superform, each listing will create a new Superform contract which would need to be whitelisted in order for any MORPHO rewards from that vault to be distributed. If possible, this request could also serve as an approval to whitelist any future MetaMorpho Superform contracts created via the SuperformFactory. Subsequent MetaMorpho Superform contracts could be whitelisted on a monthly basis.
In addition to the Superform contracts, there are two other contracts that would need to be whitelisted to move MORPHO, Paymaster and RewardsClaimer. Paymaster is the only contract that has permission to move tokens out of Superforms. These tokens then need to be transferred from Paymaster to RewardsClaimer, at which point they will become claimable by users (very similarly to how Morpho’s UniversalRewardsDistributor works).
We intend to distribute 100% of accumulated MORPHO tokens pro-rata to MetaMorpho vault SuperPosition holders.

- Timeline
RewardsClaimer is in the final review stages before being sent to audit. We expect it to be deployed by the end of May.
The frontend to be able to claim rewards should also be complete by the end of May.
We understand that you will need the RewardsClaimer contract address before any vote can be proposed, but we wanted to submit this proposal early to address any questions or comments.

- Contracts
RewardsClaimer: TBD
Paymaster: 0xF1b9e0E57D134B7dFede001ccE5e879D8C2b8C1B
Gauntlet LRT Core Superform: 0xfa3542e4047ca13e66f650740a587736d06d1100
Gauntlet DAI Core Superform: 0xaa9bb76ab29ff9608d5cf37bd76fab3558549eb6
Gauntlet USDC Prime Superform: 0x97788e6e1cae41fa667af2071b8258b015d3a0d3
Gauntlet WETH Prime Superform: 0x790d00f9edae17ef75ad5b74890c68f02e227197
Gauntlet MKR Blended Superform: 0xebfa750279defa89b8d99bdd145a016f6292757b
Gauntlet USDT Prime Superform: 0x4435d90c1d4d619c71d3e6fcf4cae6c929ab3173
Steakhouse USDC Superform: 0x3ecb18a7b8a113cd386a6120005737979073e614
Steakhouse ETH Superform: 0x3c776d6846240d15fa63c46cf91bc7269d5b74bb
Steakhouse WBTC Superform: 0xb867335032c4c0a66a1ed79569b056d267003db7
Steakhouse USDT Superform: 0x181c50aaec84e963bbe5fc36f8d63dff56d31d88
Steakhouse PYUSD Superform: 0x08adab693abdded60d1e896bfa40af56d5aef85a
Flagship USDT Superform: 0x158a035aa42f19cc8196dc53bf49794790eaad4b
Flagship USDC Superform: 0x5caa5f9b11095036294c406901344d0c9afd0608
Flagship ETH Superform: 0xb65edb609fd7a33926c01546ba3ca72ca906b3f7

The proposal was voted on and accepted on 3 May 2024.