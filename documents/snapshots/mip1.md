Link: https://snapshot.org/#/morpho.eth/proposal/bafkreiaalv4o772l5yf6idauzh25beqpoypxyhu5p4uvtqxxmph35qu2pa
Title: MIP1 - Early Core Contributors Allocation
This submission proposes to allocate $MORPHO tokens to the initial core contributors of the protocol.

As written in the forum on 19 August 2022, discussion related to that: https://forum.morpho.xyz/t/mip1-early-core-contributors-allocation/94

Here was the discussion related to that:
Summary
Morpho’s early contributors did not mint any MORPHO token for themselves at the incipit of the protocol. This proposal aims to allocate a portion of the total supply equitably among all major contributors of the protocol.

The Morpho Association
In order to organize the development and the decentralization of Morpho, early contributors founded the Morpho Association.
The Morpho Association is a French entity that deployed the first Morpho protocol and the MORPHO Token contracts. It raised the first rounds of funding but did not allocate any tokens to core contributors nor to itself. Instead, it was decided that the community should vote to allocate the tokens to the contributors.
Throughout the previous year, the association distributed Morpho Early Contributor Tokens (MECT) to contributors. The MECT equitably embodies the commitment of each contributor. Today, it is proposed to enable the conversion of each MECT vested into one MORPHO vested.

Specification of the proposal
1. Contributors currently have a MECT vesting made with the DSSVest framework with the following contract on Polygon: 0x241C23b39A610952b8a8efBdF86463ddbe593e2d (https://polygonscan.com/address/0x241C23b39A610952b8a8efBdF86463ddbe593e2d).
2. A first contract was deployed by the Morpho Association 0x6327d36f66fec925fadd387153ece94d109f3d66 (https://etherscan.io/address/0x6327d36f66fec925fadd387153ece94d109f3d66) to collect the wish of conversion of each contributor.
3. If the contributor approved the conversion of his/her tokens on chain, then a new DSSVest contract would be deployed with MORPHO Tokens instead of MECT by the DAO.
    1. All vestings would be set according to the same rules as the investors: 6 months lock up and 30 months linear vesting, starting at the same block for everyone (investor and contributor).
    2. The proportion of MORPHO tokens allocated would correspond to: 15.8% for the founding team, 7.9% for Morpho Labs, and 5.2% for independent researchers & advisors.
    3. Contrary to investor vesting, contributor vesting can be interrupted. The admins responsible for the interruption of each vesting are already specified in the MECT vesting contract and would be replicated.

Conclusion
To incentivize founders, contributors, advisors, and researchers to keep contributing to the protocol, we propose to enable the conversion of each MECT vesting into a MORPHO vesting.

The proposal was voted on and accepted on 19 October 2022.
