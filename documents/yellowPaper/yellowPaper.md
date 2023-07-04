Link: https://yellowpaper.morpho.org/
Title: Yellow Paper

Abstract:
The Morpho protocol is built on top of existing pool-based lending protocols, improving rates for both lenders and borrowers while
preserving the same liquidity and liquidation parameters. This paper
aims to provide a detailed description of the Morpho protocol, notably
the innovative mechanisms that make it work, along with invariants
and theorems about it.

Mathis Gontier Delaunay co-founder of Morpho Labs
Quentin Garchery employee of Morpho Labs
Paul Frambot co-founder of Morpho Labs
Merlin Egalite co-founder of Morpho Labs
Julien Thomas co-founder of Morpho Labs
Katia Babbar† from the University of Oxford

Acknowledgments
This work would not have been possible without the involvement of the rest
of the Morpho Labs team and the advisors of the project, including but not
limited to Vincent Danos, Adrien Husson, Jean Krivine from the Mangrove
team, and a16z research.

This paper, referenced as the yellow paper, assumes that the reader is familiar with the general idea behind the Morpho protocol. To strengthen their
intuition about the Morpho protocol, the reader may first go through the
white paper

Introduction
This paper, referenced as the yellow paper, assumes that the reader is familiar with the general idea behind the Morpho protocol. To strengthen their
intuition about the Morpho protocol, the reader may first go through the
white paper .
Compound and Aave () have established themselves
as the current standard for decentralized lending protocols over the past
years. These protocols, operating autonomously on-chain, implement a liquidity pool that offers strong liquidity guarantees and floating rates. Different protocols have been designed to improve on PLFs, protocols for loanable
funds, in different aspects. One of these aspects is going from floating to
fixed rates, and many protocols are tackling this issue. For example, APWine , Sense , and 88mph allow the user to trade
their yield. Yield Protocol and Notional define a similar
concept to collateralized zero-coupon bonds.
The Morpho protocol, for its part, leverages the composability and liquidity of existing PLFs, to create efficient and liquid peer-to-peer markets of
supply and borrow positions with near-zero spread. The claim is that Morpho strictly improves pool-based liquidity protocols from an individual user
perspective. In particular, Morpho has the same liquidation parameters and
benefits from the same liquidity of the underlying protocols.
The first goal of this paper is to provide a comprehensive description of
the Morpho protocol and its unique mechanisms. Then, to demonstrate the
claims, this paper will provide mathematical properties and proofs about
the logic underpinning the protocol. The aim is to bring transparency while
educating and providing trust for the community to the key variables and
invariant assumptions it utilizes.
The paper structure is as follows. In section 1, we detail the logical
framework we place ourselves into. Our formalization is based on a transition system with transition functions written in pseudo-code. Section 2
describes the on-chain environment that will be useful for Morpho, including
the involved contracts’ functions. Section 3 details the structure and operation of Morpho, giving us a basis to analyze and prove some of its relevant
invariants. Section 4 looks at the matching engine at the heart of the protocol, allowing matching and unmatching users when needed. The matching
engine is voluntarily left abstract. The intent is to allow for different implementations. Section 5 focuses on the interest rates mechanism and their
5
associated accounting. Finally, section 6 presents the delta mechanism allowing the protocol to scale despite the limited computation power available
in a blockchain setting.
An emphasis is put on the correctness of the protocol, and different aspects of it are detailed along the way: balances integrity, covering borrow,
supply, and aggregated peer-to-peer integrity, Morpho’s positions integrity
on the pool, as well as the liquidity of the positions.

1 Logical framework
In this first section, we aim to give a high-level description of the setting
to reason about the Morpho protocol and its environment. We first detail
the basic functionalities of the blockchain that we will build upon, which
allows us to then describe our formalization of the blockchain in terms of a
transition system. The formal description is close to the code, with sufficient
details for describing invariants and proofs

Collateral factor: For a given asset, the collateral factor represents the
maximum share of the value of the collateral that can be borrowed with this
as collateral. The collateral factor values are fixed between 0 and 1, with 0
for assets that are not accepted as collateral.

Rates: Supply and borrow rates, r^S and r^B respectively, represent the
growing speed of the balances per unit of time.

Indexes: The supply and borrow indexes, λ^S and λ^B, respectively, are the
exchange rates between stored balances in the scaled unit and underlying
tokens. According to the interest rate model, they constantly grow with time
at a speed that depends on r^S and r^B, respectively, to accrue the interests
of suppliers and borrowers. The amount of underlying tokens corresponding
to an amount in the scaled unit is obtained by multiplying this last one by
the corresponding index

Having indexes to track interest rate accrual is particularly suitable in
a blockchain environment, where computations are limited. It removes the
need for an active accounting of interest accrual for every account or a historybased accounting required in a variable rate setting. By updating the indexes
before each time that the rate changes, all users have their interests accrued
at once.

The function update_r updates the rates for one market
depending on the utilization rate

The function update_λ updates exchanges rates between
users’ balances and underlying tokens, depending on the rates since the last
update.

Price oracle: The oracle function p returns the current price of an asset.
It corresponds to an estimated price in a fixed normalizing asset or currency.

The price oracle gives a way to compute the value of a particular asset.
Oracles are provided by a source that is external to the lending pool and can
be updated at regular intervals or according to the relative change in value.
Decentralization, trust, and reliability are essential properties of the oracles,
and the integrity of protocols such as the PLFs depends on them. Popular
oracles include the ChainLink oracle and the Uniswap oracle.

The function borrowing capacity computes and returns the borrowing capacity (in value) of a given user, which is the amount
that can be borrowed in addition to the user’s current debt.

This function first updates all the indexes it needs to access by calling the
function update λ on the respective markets. It then computes its result.

In the yellowpaper, a clearer representation of the supply, borrow, withdraw, repay function are described.

The supply function is used to deposit an amount,
The borrow function is used to borrow an amount,
The withdraw function is used to withdraw previously supplied assets to the protocol,
The repay function is used to repay some accumulated debt to the
protocol.

The function "liquidate" liquidates a user’s undercollateralized position. A liquidator repays a part of the user’s debt and receives a part of the corresponding collateral backing the debt as an incentive. This process
aims to deleverage the position to a safe debt ratio.

The purpose of the closeFactor is to ensure that an undercollateralized
position does not get liquidated entirely. A liquidator has to use multiple
calls with smaller amounts, potentially bringing the position gradually closer
to a safe debt ratio.
We say that a position is insolvent when the value of the position’s debt
is greater than the value of the position’s collateral. In that case, the borrower can leave with the borrowed assets as there is no incentive to repay.
Therefore, insolvent positions are a liability for the protocol and should be
avoided. Liquidations help to solve this issue by targeting positions with a
negative borrowing capacity, trying to move them away from insolvency. A
position is implied to be safe when its borrowing capacity is positive. There
is a gap between safe and insolvent positions, which can be used as a metric
to gauge how dangerous a position is.
Suppose a position is at the limit of insolvency and liquidation happens.
Because of the liquidationIncentive factor, the liquidation removes more
collateral than borrowed assets. The position is now insolvent. This example
shows that liquidation does not always help put the position back in the safe
zone, and we want to know when it is the case.

General description of Morpho
In this section, we describe the main functionalities of the Morpho protocol.
We start by detailing the internals of Morpho: first, the storage variables of
the contract, followed by its internal functions. This allows us to describe
then the external functions in more detail. Those functions are the ones with
which the users interact. We conclude this section by proving the integrity
of Morpho on the underlying pool.

In order to follow debt and supply increase over time, user balances are
stored in scaled units, whose underlying value grows over time. Pool credit
lines evolve at pool rates, and Morpho reuses the index mechanism of the
underlying pool to track them. The protocol also has its own peer-to-peer
scaled unit and associated index.

Suppliers have two balances in Morpho. The pool supply balance sPool is in a unit that grows in underlying token value at r^S speed and represents the supply that is deposited on the pool. The matched peer-to-peer supply balance s^P2P grows at r
^P2P speed, and represents the matched peer-to-peer supply.

The balances separation is the mechanism that makes Morpho positions not
fungible. The total supply balance of a user is the sum of the two balances
brought back to the underlying unit.

The same mechanism is used for borrower balances.
The pool borrow balance b^Pool represents the on-pool debt and grows at r^B
speed, while the matched or peer-to-peer borrow balance b^P2P grows at r^P2P
speed.

The total borrow balance of a user is the sum of the two balances brought
back to the underlying unit.

Index: The peer-to-peer index λ^P2P
is the exchange rate between stored peer-to-peer balances in the peer-to-peer scaled unit and underlying tokens.
It constantly grows with time, at a speed that depends on pool indexes evolution (see theorem 5.2.1), according to the interest rates model of Morpho.

The amount of underlying tokens corresponding to an amount in peer-to-peer scaled unit is obtained by multiplying the scaled unit by the peer-to-peer index. They are updated by update λ^P2P.

It is
helpful to explain what is the rate experienced by the users of Morpho, but it
is not part of the storage. Indeed, Morpho does not use the rates of the pool
to compute the indexes. Instead Morpho is only relying on the indexes, which
makes it less susceptible to rate manipulations, where an attacker triggers
functions on the underlying pool to use the difference of rates it induces.

Utils functions
Matching functions: These functions match (or unmatch) borrowers or
suppliers, updating their balances and returning the amount that was successfully matched (or unmatched). Those functions are described in more
detail in subsection 4. They are said internal because they are accessible by
Morpho itself only.

Update index: The function update_λ^M updates both the pool indexes
and the peer-to-peer indexes of the given market.

The function borrowing_capacity^M is a function
that computes and returns a given user’s borrowing capacity (in value). This
amount can be borrowed in addition to the current debt.

This function first updates all the indexes it needs to access by calling the
function update λ^M on the respective markets.
Morpho mirrors PLF’s five main functions: supply, withdraw, borrow, and
repay for users, and liquidate for liquidators. From a user perspective, the
experience is the same as on PLFs.
From a high-level logic perspective, supply and borrow do a peer-to-peer
matching phase before finding or putting the remaining liquidity on the pool.
Withdraw and repay first try to remove some liquidity from the pool before matching some users on the pool and finally unmatching peer-to-peer
matched users. Liquidate is a combination of repay and withdraw. The
order of operations has been chosen to maximize the matched peer-to-peer
liquidity, given the computation constraints.

The supply^M function is used to deposit funds to the Morpho protocol, which
starts accumulating interest at a potentially improved rate compared to the
underlying lending pool.

Peer-to-peer supply:
Promote borrowers: Morpho matches the incoming liquidity
with some pool debt. The matching engine, described in more
detail in section 4, tries to match as much debt as possible from
pool borrowers. The liquidity is used to repay their debt on the
pool.

Pool supply:
No matching process: The remaining liquidity of the supplier
is deposited on the underlying pool with a call to supply. There
is no matching process here since the position is not peer-to-peer

The borrow^M function is used to borrow funds from the Morpho protocol,
potentially paying less interest compared to the underlying lending pool.

Peer-to-peer borrow:
Promote suppliers: Morpho matches the incoming demand
with supply on the pool. The matching engine tries to match
as much supply as possible from pool suppliers. The liquidity is
taken from the pool suppliers with a withdraw on the underlying
pool.
Pool borrow:
(a) No matching process: The remaining demand is met on the
underlying pool with a call to borrow.

The withdraw^M function is used to withdraw previously supplied assets to
the Morpho protocol.

1. Pool withdraw:
   No matching process: If some of the user’s liquidity is supplied
   on the pool, Morpho withdraws the corresponding part of its position on the underlying pool. It favors this option to maximize the
   user’s matched peer-to-peer liquidity, thus, their capital efficiency.
   A withdraw on the underlying pool is performed.
2. Peer-to-peer withdraw:
   (a) Transfer withdraw:
   Promote suppliers: If the user is matched peer-to-peer,
   Morpho replaces him with other pool suppliers. It favors this
   option before the third one to maximize the total peer-to-peer
   liquidity. The matching engine tries to match as much liquidity as possible from pool suppliers. The liquidity is retrieved
   by a call to withdraw on the underlying pool.
   (b) Breaking withdraw:
   Demote borrowers: Morpho breaks the peer-to-peer credit
   lines of the withdrawing user with the matched borrowers and
   reconnects them to the pool. The matching engine unmatches
   all the remaining debt from peer-to-peer borrowers. A borrow
   on the pool is performed to reconnect the borrowers to the
   pool. The borrowed assets are transferred to the withdrawer.

The repay^M function is used to repay the accumulated debt to the Morpho
protocol.

1. Pool repay:
   (a) No matching process: If some of the user’s debt is borrowed
   from the pool, Morpho repays liquidity to the underlying pool. It
   favors this option to maximize the user’s matched liquidity and
   capital efficiency. A repay is performed on the underlying pool.
2. Peer-to-peer repay:
   (a) Transfer repay:
   i. Promote borrowers: If the user is matched peer-to-peer,
   Morpho replaces the peer-to-peer credit lines with other pool
   borrowers. It favors this option before the third one to maximize the total peer-to-peer liquidity. The matching engine
   tries to match as much debt as possible from pool borrowers.
   A repay on the pool is performed to cut those borrowers’ debt
   on the pool.
   (b) Breaking repay:
   i. Demote suppliers: Morpho breaks the peer-to-peer credit
   lines of the repaying user with the remaining matched suppliers and deposits the unmatched liquidity on the underlying
   pool. The matching engine unmatches all the remaining liquidity from peer-to-peer suppliers. Morpho supply on the
   underlying pool to reconnect the suppliers to the pool.

The liquidation on Morpho works the same way as liquidation on the underlying pool. When a position of a user is not sufficiently collateralized,
a liquidator can repay part of the debt of the user and seize a part of the
collateral of the user.

Morpho uses the same values for the collateral factors F, closeFactor, and
liquidationIncentive as the ones used by the underlying pool and the
same oracle to retrieve the prices of the borrowed and collateralized assets.
The main difference with the corresponding function on the pool is the calculation of the underlying amount of supplied and borrowed assets. For each
user, both pool and peer-to-peer balances should be accounted.

The non-liquidation theorem states that the position of Morpho on the
underlying pool is not liquidatable. The intuition behind it comes from
considering safe positions as positions where the borrowed assets represent a
fraction, in value, of the supplied assets. Then, because Morpho enforces that
its users have safe positions (considering both their assets on the pool and
their matched assets) thanks to the liquidation mechanism, the combination
of pool borrow and peer-to-peer borrow must also represent a fraction of the
combination of the pool supply and the peer-to-peer supply. In the previous
chart, this is visualized by estimating the whole borrow bar against the whole
supply bar. Removing the matched part, both in borrow and supply, only
makes this fraction smaller. This amounts to comparing the pool borrow
against the pool supply, which gives us the position of Morpho itself on the
underlying pool. The chart visualizes this by estimating the bottom of the
borrow bar against the bottom of the supply bar.
There is a chart given in the yellow paper.

The non liquidation theorem is crucial for morpho.

Matching engine
The role of the matching engine is to create and break the peer-to-peer credit
lines of users. In this section, we will first explain how the Morpho protocol
makes use of the matching engine, and we will then describe its high-level
operation. The implementation is voluntarily left abstract, as different ones
could fit into the setting.
Note that it is possible for a user to be only partially matched peer-topeer. Such a user has a fraction of its liquidity matched peer-to-peer, while
the rest is on the pool.
Notice, moreover, that peer-to-peer credit lines are not really associating
borrowers with suppliers. Being matched peer-to-peer is a state in which the
user benefits from better rates than on the pool. And the matching engine’s
role is to move users in and out of this state.

User addresses are kept in four structures. Suppliers are in suppliersInP2P
if they have matched supply and in suppliersOnPool if they have some
supply on the pool. The same applies to borrowers, with borrowersInP2P
and borrowersOnPool.
In this yellow paper, we do not describe the data structures used for the
storage of the matching engine. We assume that those structures are always
up to date and that we have access to functions to retrieve the suppliers and
borrowers that are in those structures.

Interest rates mechanism
In this section, we will go through all the Morpho mechanisms related to
interest rates. To this end, we first define the rates that we will consider
and then explain the different methods used to update the indexes, including Morpho’s approach. We conclude the section with a proof of the rate
improvement that Morpho is achieving

Pool rates:
Morpho’s users that are not matched peer-to-peer are connected to the pool
(either via a deposit or a loan) and so experience pool rates. Their credit
lines evolve at pool rates, r^S and r^B.

Peer-to-peer theoretical rate:
While users on the pool necessarily earn and pay the exact pool rates, Morpho
can freely choose the interest rates of its peer-to-peer matched users. In order
for the protocol to be a Pareto improvement of liquidity pools, the chosen
rate should always be in the rate spread of the pool.

In order to be sustainable in the long run, the protocol can charge a fee for
users and give it back to the Morpho DAO. In this section we focus on the
impact the fee has on Morpho’s rates, an explanation of the fee’s accounting
is given in section 6.2.4. The fee is only charged for users who really benefit
from the protocol improvements, so peer-to-peer matched users15. Thus, a
difference between matched suppliers’ and borrowers’ rates is introduced.
Call ρ the reserve factor, a quantity that represents the proportion of the
difference with the pool rate.
However, please note that morpho is currently not taking any fee.

More information are provided into the yellowpaper.
We show in this subsection that Morpho rates are improved compared to the
ones on the underlying pool. To that end, we assume that the initial peer-topeer index rates are between the supply index rate λ^S and the borrow index
rate λ^B and show that index rates stay in this range. An exact calculation
of the rates is provided, leading to an estimate of those rates that is easier
to understand and compute.

Delta Mechanism:
Matching and unmatching users peer-to-peer is not a constant time operation, and large transactions may not find sufficient liquidity given the alloted
resources. The delta mechanism is designed to solve this issue.
Definining a concrete limit on the computation can be done in different
settings: it could be done to save CPU time, to limit the total power used,
or to prove that a particular implementation terminates by first adding a
”fuel parameter”. Using this limit, we can then be decide at any point if the
matching engine should stop. In this paper we apply the delta mechanism
to limit the gas usage in the EVM, but the same mechanism could be
used in the contexts mentioned above.
This section first gives a high-level description of the problem and of the
delta mechanism as a solution, which allows us to derive the impact it has
on the rates. We then turn to a more detailed description of how this is
implemented, and we conclude by updating the protocol formalism to take
into account the delta mechanism.

Finding a match can be an intensive computation, and we explain here how
we can stop the matching engine early to mitigate its cost. It amounts to
finding the missing liquidity when the matching engine did not return a high
enough matched amount.
When supplying or borrowing, if not enough liquidity could be found,
we already have the pool fallback: Morpho fills the rest of the order with a
supply or borrow on the pool, and the user balances are updated accordingly.
For withdrawing and repaying, since these functions end with a matching part that is expected to find the asked liquidity, we need to come up
with another fallback. Indeed, we would need to modify the balance of the
unmatched users and the data-structures states, but we cannot because of
the computation constraint. The idea is to continue the breaking step (see
breaking withdraw and breaking repay) by increasing the position of Morpho
on the pool accordingly. This means that the rate experienced by suppliers
should decrease in case of a breaking repay, and the rate experienced by borrowers should increase in case of a breaking withdraw. The delta mechanism
is designed to account for this change.
To summarize, the peer-to-peer delta mechanism works as follows: we operate the pool fallback to fill the order, even if we cannot unmatch enough
peer-to-peer users. It introduces a difference19 between the peer-to-peer liquidity evolving at Morpho’s rates and the sum of peer-to-peer balances of
users on this side of the market. In order to remedy this, the rates experienced by all peer-to-peer users are adapted.
Concretely, consider the case where one user is withdrawing (resp. repaying), and its liquidity is matched peer-to-peer. Suppose also that there
is insufficient liquidity from suppliers (resp. borrowers) on the pool to replace him. So the peer-to-peer credit lines will be broken, and peer-to-peer
borrowers (resp. suppliers) will be reconnected to the pool. If the matching
engine cannot find enough liquidity in this step, then Morpho borrows (resp.
supplies) all the remaining asked liquidity on the pool. This means that
all peer-to-peer borrowers (resp. suppliers) now have a part of their borrow
(resp. supply) on the pool and now get a worse rate.

Delta increase After a breaking withdraw or breaking repay, if not enough
peer-to-peer users could be unmatched, we increase the delta by the missing
liquidity

Delta matching When new liquidity comes (in a supply or borrow), the
delta of the other side of the market is “matched”, reducing it.

Delta reduction When some peer-to-peer liquidity exits, the corresponding delta is reduced. For example, withdrawing peer-to-peer matched liquidity will first decrease the supply delta.

To ensure that transactions gas costs are bounded, we make sure that
the gas used for matching does not exceed a predefined limit. The predefined limit, written maxGasForMatching, accounts for all the gas used by the
matching engine during one transaction. When a matching function does not
have enough gas left to execute, it can return early and return a matched
amount lower than the asked liquidity. Since other parts of the code also
have a bounded gas cost, we know that Morpho’s operations’ overall gas
costs are bounded. This way, Morpho can scale as more users enter the
different markets.
The matching engine is not mandatory for operations to succeed. Thus we
introduce the possibility for Morpho users to choose the maxGasForMatching
parameter, that is how much gas they are ready to pay for matching engine
in supply^M and borrow^M functions.
This cannot be used in withdrawM, repayM, and liquidateM. Indeed,
for these functions, there is no economic incentive to match and unmatch
more users (in fact, there is an incentive not to do so because of the gas
cost). So, for these functions, the maximum gas to be used in matching is
fixed. It may be 0 for liquidateM to reduce liquidations gas cost.
The matching functions implementations need to be modified to consider
the gas constraints so that they stop executing when there is no gas left for
matching. More specifically, the matching functions described in section 4
now take an additional parameter and return an additional value: respectively, the gas available for the matching engine before the call of the function and the gas left after its execution.

The function supply/borrow/withdraw/repay have to take the delta into account and the yellow paper is providing those high level implementation.

The Morpho protocol is an improvement of the established protocols for
loanable funds (see section 2) that have seen a significant rise in popularity
in the past years. Such protocols have numerous advantages, including high
liquidity with the possibility to withdraw or borrow significant amounts at
any time. They also define robust risk parameters which minimize the risk of
insolvencies and liquidations in high-volatility markets but require notably
leaving a fraction of the liquidity idle on the contract. The main idea of
Morpho, explained in section 3, is to improve capital efficiency by matching
peer-to-peer the incoming liquidity as much as possible while ensuring the
same liquidity and at least the same rates as the underlying lending pool
by aggregating the remaining positions on it. In doing so, we are faced
with different challenges. First, we should ensure that the protocol enjoys
the same liquidity as the underlying lending pool. It amounts to finding
a fallback mechanism, notably including the possibility to withdraw when
matched peer-to-peer. A solution to this problem was given in section 3.3,
with detailed steps explaining the process. Second, we should make sure
that the position taken on the pool is safe. This point has been formalized as
the non-liquidation theorem, and a clear proof was given in section 3.4 and
refined later in section 6.4. Third, we need relevant rates and a robust system
to account for them. In section 5, we turn to a general analysis of it, and
we prove that Morpho users enjoy improved rates compared to users of the
underlying pool. Finally, one last challenge is to ensure that the protocol can
scale by bounding the gas usage of any transaction, no matter its size. This
problem comes from the matching engine, described in section 4, as it has to
scale with the number of users. Section 6 returns to the scalability problem
with a solution called the delta mechanism, where proofs and previous results
are updated to consider this new mechanism.
