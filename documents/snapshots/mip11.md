Link: https://snapshot.org/#/morpho.eth/proposal/0x7a33252b7213adcc3e4bbdd0c4528f39b34cb0ed8a78883c167172c694c7a33e
Title: MIP11 - MORPHO rewards Age 4
This submission proposes to make several adjustments to the reward distribution scheme.

As written in the forum on 28 Marsh 2023, discussion related to that: https://forum.morpho.org/t/mip-morpho-rewards-age-4/281

Here was the discussion related to that:
Summary
This proposal contains several adjustments to the current reward distribution scheme:
- Remove the notion of epochs and shorten ages from 3 months to 45 days.
- Distribute a total of 2 million $MORPHO during Age 4.
- Transition from using the gauges system to a tailored allocation across markets.

Proposal

Ages and Epochs
Ages and Epochs were introduced to provide flexibility to Morpho’s emissions system, anticipating strong growth. Long-term emission schedules were deemed too rigid. In the initial setup, each Age lasts around three months and sets new rules for reward emissions according to the protocol’s needs. Within each Age, smaller periods called Epochs are checkpoints where users can claim rewards.
While this setup has been useful for the early stage of the protocol, it now shows some limitations. Ages are too long to allow for enough flexibility, and epochs are too short from an operational standpoint. We propose eliminating the concept of epochs and shortening the length of ages to 45 days.
This new setup would start at Age 4.

Rewards distribution during Age 4
Rewards are a powerful tool to bootstrap liquidity on a protocol, as well as to decentralize ownership of the protocol.
We believe that reducing token incentives would be the best course of action. Three key reasons why are:
1) The bootstraping phase of the protocol can be considered over, as the protocol has successfully managed to gather a total supply of over $650 million at its peak. The protocol is now well-established and holds a strong position in the DeFi lending space.
2) Morpho currently ranks third in terms of total value locked across lending protocols on Ethereum. By design, it offers better rates than the first two protocols, Compound and Aave, so the need to use rewards to attract users is mitigated.
3) Finally, the valuation of the token as perceived by users depends on the growth of the protocol, and while the emission level in Age 3 remained the same as in Age 2, the protocol experienced significant growth during this time.
For Age 4 (07/04/2023 to 22/05/2023), we propose to distribute 2M of $MORPHO tokens.

Allocation between markets
There appears to be a misalignment between the interests of individual users and the protocol. Gauges can benefit both parties by facilitating use case discovery, potentially leading to better bootstrap liquidity in markets where users find utility. However, it seems that votes are mainly expressing farming desires, with people voting in favor of a market regardless of the underlying asset, solely to maximize rewards. We don’t blame users for being rational and profit-maximizing, but it seems that Gauges are a zero-sum game between farmers, with no benefits at the protocol level.
Additionally, Gauges are operationally heavy and require synchronization efforts such as votes and announcements. It appears that the efforts put into Gauges do not bring the expected return and that time could be better spent elsewhere.
For these reasons, we propose to stop the Gauges system at the end of Age 3.
Since the Gauges will no longer be active, we propose to distribute the rewards to lenders and borrowers using the optimized distribution model developed by Morpho Labs. This model, which was used to compute gauges votes recommendations, is detailed in this forum post (https://forum.morpho.org/t/age3-epoch1-gauges-optimized-distribution/233).
Applying this model for Age 4, the markets would receive the shares of rewards detailed in the proposal (https://forum.morpho.org/t/mip-morpho-rewards-age-4/281)
The allocation of rewards between the supply and borrow side for a given market would follow the repartition of supply and borrow on the market at the beginning of the Age.

The proposal was voted on and accepted on 2 April 2023.
