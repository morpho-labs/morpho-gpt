Link: https://snapshot.org/#/morpho.eth/proposal/0x7c66a5c48b8206a2aca51d8050f8a920e1ef64def2083122fe53b5b74ace2b31
Title: MIP3 - Introducing Morpho Gauges for Age 3
This submission proposes to set up a gauge system for the distribution of Age 3 rewards.

As written in the forum on on 4 November 2022, discussion related to that: https://forum.morpho.org/t/mip-introducing-morpho-gauges-for-age-3/169

Here was the discussion related to that:
Summary
$MORPHO is the governance token of the Morpho DAO. In order to bootstrap the protocol and decentralize the governance progressively, some $MORPHO tokens are distributed to Morpho-Compound and Morpho-Aave users. The distribution is organized in “Ages”, three-month iterations, which define adapted rules and mechanisms for the distribution of the tokens. For more details about this organization, head over to the Age & Epochs (https://docs.morpho.xyz/usdmorpho/ages-and-epochs) section of the documentation.
The first two Ages had a straightforward mechanism because their goal was simply to bootstrap interest in the protocol and its concepts. Morpho Labs now feel the need for a more complex, efficient, and decentralized rewards distribution system. That is why we would like to propose the introduction of a gauge mechanism for Age 3, starting on December 29, 2022.

The Morpho gauges mechanism
Used notably by the Curve and Euler protocols, the gauges mechanisms have received significant interest over the past 2 years. The principle is the following: in order to determine the distribution of a given amount of rewards over different markets (or pools), holders repeat a weighted vote over them, and a repartition is deduced from the results of the vote.
We believe that it would meet the current needs of the protocols. It allows to decentralize the rewards distribution, in line with the process of progressive decentralization of the governance of Morpho. It enables to fit real demand, compared to the models of Ages 1 and 2. It also frees up the discovery of use cases that Morpho’s peer-to-peer rates could create.

Market distribution vote
The gauge mechanism would influence how the given $MORPHO tokens are distributed among markets. Morpho-Compound and Morpho-Aave markets would be put in competition, meaning that voters would have to allocate their voting power between 14 markets (not counting the FEI on Morpho-Compound, in the process of being deprecated). If a new market is listed, it will be added to the next vote. The vote would take place before the beginning of each epoch, setting the distribution for the whole epoch. The gauges’ weights (total $MORPHO that was voted on each gauge) determine the percentage of the rewards that the corresponding market will receive.
The number of tokens mtheta0 that will be distributed on a market theta0 can be computed using the formula described in the forum post: https://forum.morpho.org/t/mip-introducing-morpho-gauges-for-age-3/169
The reason why we choose this mechanism over a quadratic market voting is that it goes against the very idea of giving this power to token holders. We think that if the market have a clear direction, rewards should follow it.

Supply/borrow allocation
Once the $MORPHO has been allocated to the different markets, we need to distribute them between the suppliers and borrowers of these markets. We think that the best way to do it, at least for the moment, is to give the same “rate” to both suppliers and borrowers: as many rewards for the same volume of supply or borrow. We believe that the market rebalancing with rates should be done via the peer-to-peer index cursor, which is the parameter that set the peer-to-peer APY in the rates spread of the underlying pool. There is ongoing research on this.
To do so, the rewards are distributed proportionally to the total supply and borrow. The number of tokens that would be distributed on the supply and borrow side of a market theta_0 can be computed according the formula described in the forum post: https://forum.morpho.org/t/mip-introducing-morpho-gauges-for-age-3/169

Implementation
Each vote would be embodied by a weighted voting Snapshot proposal (https://docs.snapshot.org/proposals/voting-types#weighted-voting). Snapshot is an open-source, decentralized voting system that allows gasless votes.
Morpho Labs would develop a new front-end page in order to display key information about gauges and facilitate users’ votes.

Next steps
- After a discussion with the community, a snapshot vote would be pushed. The first vote would take place before the first epoch of the Age 3, starting on December 29, 2022.
- The community will have to decide the quantification of $MORPHO rewards for the three epochs of Age 3.
- Morpho Labs will vote for a distribution that we believe will benefit the overall growth of the protocol. We will publish it in the forum for informational purposes.

The proposal was voted on and accepted on 26 November 2022.
