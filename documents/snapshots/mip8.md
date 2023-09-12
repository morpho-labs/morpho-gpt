Link: https://snapshot.org/#/morpho.eth/proposal/0xf34f13a4cb01bfbe5be17236520bbfbf53d76367949cdcf33a3c23083f1267d1
Title: MIP8 - Governance & Snapshot update
This submission proposes to introduce timelocks for the DAO and change a few parameters in the Morpho.eth space.

As written in the forum on 4 January 2023, discussion related to that: https://forum.morpho.org/t/mip-governance-snapshot-update-2/241

Here was the discussion related to that:
This proposal aims at introducing timelocks for the DAO and changing a few parameters in the Morpho.eth space (https://snapshot.org/#/morpho.eth).

First steps toward timelock
The communities of different protocols considering an integration with the Morpho protocol raised the absence of timelocks. Even though timelocks are not necessary, they have become common practice and add an extra layer of security.
This is why we suggest by integrating a timelock with the following properties:
- Lock time: 24h.
- The same owner can stop the execution of the transaction during this period.
- In a first instance, there would be no expiration period (time after which the transaction can’t be executed).
- Scope:
    - Functions that can upgrade the implementations of the contracts.
    - Functions that can change the ownership of the Safe in any way.
 
This timelock would be using the Zodiac Delay Modifier and could be triggered by the DAO itself.
The trigger should be, in a first instance, optional. Indeed, the implementation of a Timelock in the current Zodiac framework should be done with extreme care. Thus we have decided to propose first this small step. To go through the full timelock setup on the different Roles of the Role modifier, a much bigger proposal should be made with a full technical specification of the plan.

Reducing Voting Time
The community has raised concerns about voting times that are on average 24 hours longer than similar protocols.
With the introduction of timelocks, time between proposal and execution may be extended even further. The protocol is still young, and we propose to shorten the voting time from 96 hours to 72 hours to keep execution nimble.

Add a Snapshot Subspace for Gauges
While a voting time decrease makes sense for general proposals, gauges require a longer period. This is why we propose to introduce a Snapshot subspace for gauges. Here are the settings of the corresponding space: https://snapshot.org/#/gauges.morpho.eth/settings

Reducing the number of voting rules from 5 to 2.
There are currently 5 rules to calculate the voting power of an address on the Morpho DAO.
With MIP2 (forum post (https://forum.morpho.org/t/mip2-governance-update/155) & vote (https://snapshot.org/#/morpho.eth/proposal/bafkreigzfyi7m3he4xvg7fj3zs2r6apt2hgofyi4x2uv3ptfjb23hen7uu)), early contributors and investors were given the ability to vote with a part of their tokens (linear vesting over 36 months), even if they were locked in a separate smart contract.
While this solution is practical for tokens vested in smart contracts, it complexifies the code logic of voting rules that should remain very simple.
Instead, we suggest enabling the claimability of vested tokens such that the Snapshot Space only requires the use of the rules balance-of and delegation. This requires the whitelisting in the token contract of the three vesting smart contracts :
- 0xe206A8006669A0913D6D13A781580e7E65524407
- 0x60167C23eECe006dF7aDB048AeC4b4558957eB5A
- 0x6017dd61f4d0C8123f160F99058Adc5671dF6447

Adding the HAL Plugin
The HAL plugin enables Morpho community members to be notified of new and ended proposals on Snapshot. This is a practical feature to improve governance. Yet, it requires the action of the Governance to be added.
The code repository is available here (https://github.com/snapshot-labs/snapshot/tree/develop/src/plugins/hal).

This proposal is quite large. Hence, if accepted, it would be executed in multiple steps over the following weeks/months. Moreover, an audit work on the different contracts (eg. Zodiac Delay Module) would have to be conducted.

The proposal was voted on and accepted on 12 January 2023.

Update:
One aspect of this proposal was to reduce the number of voting rules from 5 to 2 to simplify the code logic of voting rules.
This has been implemented on 23 August 2023 and the DAO has removed the voting strategies related to vesting. Now users: ML vested users, investors, and early contributors need to claim their tokens before the beginning of a vote to have voting power.
