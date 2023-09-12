Link: https://snapshot.org/#/morpho.eth/proposal/bafkreigzfyi7m3he4xvg7fj3zs2r6apt2hgofyi4x2uv3ptfjb23hen7uu
Title: MIP2 - Governance Update
This submission proposes to update Morpho’s Snapshot rule to add the delegation features and to include changes made by MIP1.

As written in the forum on 1 November 2022, discussion related to that: https://forum.morpho.org/t/mip2-governance-update/155

Here was the discussion related to that:
Summary
The Morpho Association is proposing to update Morpho’s Snapshot rule to add the delegation features and to include changes made by MIP1.

Specification of the proposal
- Enable delegation in Snapshot
We propose to enable delegation through the standard proposed by Snapshot. More information in their documentation is here: https://docs.snapshot.org/guides/delegation (https://docs.snapshot.org/guides/delegation)
This delegation mechanism has proven particularly useful in governance systems. For example, users that hold their tokens in cold storage can delegate to a more flexible wallet, users that trust a certain delegate could now transfer their voting power, etc.
- Including MIP1 in the voting rule
So far, Morpho used the strategy “balance-of-with-linear-vesting-power” which enabled the governance power of tokens locked in vesting smart contracts to be vested linearly over 36 months.
With MIP1, two other vesting contracts were created but they are not taken into account by the previous rule. We propose to include those vesting contracts in the voting strategy, following the same rules as in “balance-of-with-linear-vesting-power”.

The proposal was voted on and accepted on 7 November 2022.
