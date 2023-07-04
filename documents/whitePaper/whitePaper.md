Link: https://whitepaper.morpho.org/
Title: White Paper
abstract: |
Morpho enhances current DeFi liquidity protocols. The aim is to offer
a suite of products to make supplying and borrowing operations in DeFi
more efficient and seamless. The first building block proposed is a
novel, Pareto-improving, interest rate mechanism built on top of
existing protocols. The Morpho Protocol allows for better rates on
both sides of the market whilst preserving the same liquidity and
liquidation guarantees for everyone.
author:

- |
  Paul Frambot[^1]\
  Institut Polytechnique de Paris
- |
  Mathis Gontier Delaunay\
  Télécom SudParis
- |
  Vincent Danos[^2]\
  École Normale Supérieure
- |
  Adrien Husson\
  INRIA
- |
  Katia Babbar\
   University of Oxford
  bibliography:
- Morphobib.bib
  date: April 2022
  title: |
  Morpho\
   Optimizing Decentralized Liquidity Protocols\

---

# Motivation

Over the past ten years, blockchain technologies have not only enabled
innovation in the space of money transfers but have, most importantly,
provided the means to re-imagine the entire financial ecosystem. Today,
blockchains like Ethereum, the largest DeFi platform, enable developers
from anywhere in the world to create open services that previously were
the exclusive playground of financial intermediaries such as banks,
exchanges, insurances, asset managers, hedge funds, etc. Decentralized
Finance or DeFi, encompasses an ensemble of independent, open,
transparent, and composable technological bricks as pieces of
self-executable code, providing open access to a new set of financial
primitives available to all. Removing intermediaries not only reduces
bias but also lowers the cost of the global financial infrastructure,
eventually decreasing the overall costs to end-users. Morpho's mission
is the democratization of interest rate services, ensuring access to
profitable, convenient, and secure supplying and borrowing for all.

Since the "DeFi Summer" in 2020, novel protocols have emerged enabling
users to execute financial operations in a decentralized fashion such as
the secured supplying and borrowing of crypto-assets with Compound
[@compoundwpp] or Aave [@aavewpp]. The growth in the market size of
these protocols has been astonishing and has far exceeded the tens of
billions[^3]. However, looking at the historical data of supply versus
borrow rates of the main DeFi protocols, there is a pain point for both
sides of the market: borrow rates are high compared to very low supply
rates.

**Example 1**. _Assume that Alice supplies 1000 DAI and Bob borrows 1000
DAI on Compound. After a year, Alice only earned 1 DAI while Bob paid 27
DAI. Both parties may also get some COMP rewards tokens, but we will
omit these for now._
:::

This example is quite counter-intuitive at first as one can expect DeFi
to remove the middle man and to create Peer-to-Peer (P2P) positions
where Alice earns exactly what Bob is paying. So why are these APYs not
unique and set at a mid-rate of $1.4\%$, which would be advantageous to
both parties?

::: exmp
**Example 2**. _In such a scenario where Alice would supply 1000 DAI and
Bob would borrow 1000 DAI on Compound. After a year, Alice would have
earned 14 DAI while Bob would have paid 14 DAI._
:::

Compound is relying on a Peer-to-Pool model where suppliers deposit
their liquidity in a common pool and get tokenized vouchers in return,
known as cTokens[^5]. Any borrower can supply collateral to access
liquidity from this pool. When repaying their position, borrowers pay
some interest that also goes into the pool. Notice that under this
model, positions do not have a fixed term and that suppliers are not
competing with each other: the interest paid is shared amongst all
suppliers, proportionally to the amount supplied. In practice, suppliers
are committing much more capital to the pool than is ultimately
utilized.

The spread between APYs is intentional, as keeping utilization rates
below 100% enables users to both withdraw current funds or borrow new
funds at any time. This interesting property is sometimes referred to as
the "liquidity\" of the money market. The design choice of this "pool
model\" keeps suppliers and borrowers motivated whilst preserving the
liquidity of positions.

However, this model has proven very inefficient as suppliers are not
competing with each other. Moreover, one may also remark that rates are
not decided by the offer and demand of the market but are biased by $A$
and $B$ parameters, chosen by the platform. A natural idea would be to
build some sort of order book to register every position in a P2P
fashion.

This very concept was tackled at first by some other protocols like
ETHLend [@ethlendwpp]. There was effectively no spread between Suppliers
and Borrowers under that protocol, who were directly matched in a P2P
fashion. However, the protocol was much less flexible and fungible than
a pool. According to Aave, ETHLend was indeed more efficient in terms of
rates but the lack of liquidity of those P2P term loans was greatly
limiting their use. Today, a DeFi user would rather generate a permanent
yield in a pool, with minimal supervision needed, than seek an improved
yield which can be unreliable due to high gas costs paid for every
transaction. The lack of liquidity in P2P protocols like ETHLend could
be due to the low level of adoption of DeFi protocols at the time. Or
more importantly, the absence of professional market-makers able to
manage P2P positions under the heavy constraints and costs of the
Ethereum blockchain itself.

The Morpho Protocol leverages the composability and liquidity of the
existing PLFs (Protocol for Loanable Funds
[@gudgeon2020defi; @perez2020liquidations]), such as Compound and Aave,
and to create an efficient - yet liquid - P2P market of supply and
borrow positions with near zero spread. In the previous ETH example,
both sides of the market could use an APY within the spread, for example
near 1.4%. Both sides win without taking riskier positions. In that
regard, Morpho is a Pareto-improvement of current liquidity protocols.

Users eventually get permanent positions with self-adjusting rates,
being, at best, the exact rate that the matched borrower is paying, and
at worst, the rate of the PLF that Morpho falls back on. Morpho can
therefore be described as a liquidity pool optimizer, where both
borrowers and suppliers benefit from improved rates while preserving the
same guarantees and the same liquidity.

The technical limitations of blockchain technology and the low adoption
of DeFi in the early days have constrained many applications to employ
sub-optimal models like the use of pools. Morpho's proximal goal is to
address this inefficiency, hence empowering the end-user with the full
potential of DeFi. Many DeFi projects are starting to address the
problem of uncollateralized positions and/or the ability to provide
real-world collateral. Morpho's longer-term goal is to build an
efficient component that will rationalize the DeFi rates market and
eventually be an integral part of the solution.

The paper is divided as follows. Section 2 of this paper introduces the
Morpho Protocol, the mechanisms it leverages, and how it improves supply
and borrowing rates with no loss of liquidity and no additional
liquidation risks. Section 3 focuses on how Morpho matches suppliers
with borrowers and introduces the Morpho token. Section 4 explains how
this novel approach not only optimizes current protocols but also builds
the foundations to evolve alongside technical improvements of the
underlying blockchain itself. Morpho is a first self-contained step to a
new economic space for DeFi: competitive liquidity markets. Section 5
will finally discuss the position of Morpho in the DeFi space and its
use cases.

# The Morpho Protocol

This is a simplified introduction to the Morpho Protocol. We worked on a fully detailed Yellow Paper that was released in 2023.

## High-level description {#High-level description}

In this section, it is assumed that the Morpho Protocol is only
integrated into the Compound Protocol and is then called
Morpho-Compound. However, it should be noted that Morpho is compatible
with any other PLF like Aave and is then called Morpho-Aave.

From a user point of view, Morpho-Compound operates very similarly to
Compound: users can supply, withdraw, borrow and repay assets with the
same liquidity as Compound. Liquidators can liquidate
undercollateralized credit lines according to the same collateral
factors and the same price oracles as Compound. One should not
experience any different from what they are used to, except that the
rates are more interesting. Morpho-Compound acts as a proxy between the
user and Compound. Let's take a brief look at how the assets flow in
this setting.

- Supply tokens: the user just supplies tokens to Morpho (Step 1 in
  the picture). In the background, the protocol will deposit them on
  Compound (Step 2) and mint cTokens (Step 3). Morpho will hold on to
  the cTokens and use them later to move the positions out of the
  Compound pool (Steps 4 to 7).

- Borrow tokens: the user first provides some collateral, say BAT
  tokens, with the same collateral factors as in Compound and triggers
  the borrow function (Step 4). In the background, the protocol first
  triggers the matching engine, linking one or many suppliers in the
  Morpho Protocol to the borrowing required. Next, Morpho uses the
  cTokens of the matched suppliers to move their liquidity out of
  Compound's Pool (Steps 5 and 6) and give it to the borrower (Step
  7). At this point, the position has moved from Pool-To-Peer to
  Peer-To-Peer and both the borrower and the suppliers involved are
  getting better rates. Note that the debt can be matched with only a
  part of a supplier deposit if it is small, or with the deposits of
  multiple suppliers in the other case.

Notice that during the P2P position, users are out of the pool and thus
seamlessly have a P2P position with a utilization rate of 100%. Since
Morpho moves the positions out of Compound when the borrower requires a
match, the matched supplier does not need to share the rewards with the
rest of the pool. Thus, coming back to the example for rates on ETH,
there is a win-win with near 1.4% for both the supply and borrow APY,
instead of an underlying 0.1% for the supplier and 2.7% for the borrower
on Compound.

::: exmp
**Example 3**. _Assume that Alice is the first Morpho user and she
decides to supply 1 ETH to the protocol and that 1 ETH = 200 cETH at
this moment. If no one else uses Morpho, after one year, Alice has
earned 0.001 ETH as if she were directly in Compound. Now, let's
consider that Bob borrows 1 ETH through Morpho after providing BAT as
collateral. The two users will be matched P2P and during a year, Alice
would earn close to 0.014 ETH instead of 0.001, and Bob would only pay
close to 0.014 ETH instead of 0.027. Note in this whole process, Bob and
Alice do not need to execute additional transactions compared to
Compound, the matching is done automatically by Morpho._
:::

## Same liquidity, same guarantees, improved rates

Morpho is a hybrid interest rate mechanism that combines Peer-to-Peer
and Peer-to-Pool matching of liquidity protocols. It is built in such a
way that, if someone is not finding any counterpart via the P2P
mechanism, Morpho falls back onto Compound by depositing the user's
funds in its smart contract. Under this configuration, Compound is
considered as the supplier of last resort: the user is at least as
economically rewarded as they would be by simply using Compound.

### Liquidity

One may ask how Morpho ensures the full liquidity of the market in very
specific scenarios like a supplier that wants to exit a P2P position
where its capital is fully borrowed. The main idea is that in every
scenario where the Morpho user would not be able to leave, there is a
fallback to Compound.

::: exmp
**Example 4**. _Assume that Alice and Bob are the only users of Morpho.
Alice supplied 1 ETH while Bob borrowed it with some DAI as collateral.
After a year, they paid/earned nearly 0.014 but Bob has not repaid the
position yet. However, Alice wants her money back and triggers the
withdrawal function. In this scenario, Morpho is going to borrow on
Compound using Bob's DAI as collateral and give the borrowed ETH to
Alice. Note that from this point onward, Bob's APY will be reset to
Compound's rate: 2.7% but if Alice comes back, they would reconnect at
near 1.4%._
:::

Remark that even in this scenario, the collateral of the borrowers can
be matched P2P as well, whether its debt is matched P2P or on the pool.
This is not intuitive at first, and quite a complex thing to understand
and this is out of the scope of the White Paper and will be elaborated
on in the Yellow Paper.

### Liquidations

Morpho has its own liquidation mechanisms, but copies directly onchain
the same parameters as the underlying pool it relies on. The protocol
mechanically has the same collateral factor, liquidation conditions, and
price oracles that it fetches on-chain. In this way, the liquidation
guarantees for users are the same as on the underlying PLF.

One may remark that Morpho's contract itself sometimes has a borrow
position on the underlying pool, but Morpho can only be liquidated if
its position, which is an aggregate of all of Morpho's users positions,
is eligible for liquidation. To prevent this Morpho's users will be
liquidated when possible, ensuring the safety of the position of Morpho
itself on the pool.

### Improved rates

To recap, a supplier will have at least the net APY of Compound (supply
APY + COMP rewards). However, if the protocol finds a private match with
a borrower, the user will upgrade to what we call the "P2P APY\". The
P2P APY is a win-win APY for both suppliers and borrowers, it could be
the average of supply and borrow net APY. Note that during strong
incentivization programs, PLFs can use liquidity mining to reduce this
spread or even invert it. This scenario is tackled in
[2.5](#Liquidity mining and inverted spreads){reference-type="ref"
reference="Liquidity mining and inverted spreads"}.

As can be seen, when a P2P match is created or ended, the user jumps
from experiencing a Compound rate to the optimized P2P APY offered by
Morpho. Many questions arise. How do we track the P2P APY, and how is it
chosen? There is often an imbalance between the number of suppliers and
borrowers, how to select who will be matched? Is the matching engine
fully scalable?

## P2P tracking mechanics

The supply balance and the borrowing are each split into two variables:
$onPool$ and $inP2P$. Indeed, either the liquidity or borrow request of
the user has been matched, and they benefit from the P2P APY, or not,
and the supply/borrow position is on Compound.

For the $onPool$ case, when the user's liquidity has been supplied or
borrowed on Compound, Morpho uses Compound variables to keep track of
the balances increase. For suppliers, deposits are stored in cTokens
units: in this way, the yield generated by supplying on Compound is
taken into account.

The $inP2P$ case was inspired by cTokens mechanisms from current
liquidity protocols. Morpho introduces a unit called 'p2pIndex', whose
underlying value grows over time, and which will be used to describe the
"on Morpho" debt (both for suppliers and borrowers). Its value is linked
to the unit of the token by the variable $p2pIndex$ according to the
following formula :
$$valueInUnderlying = valueInP2PUnit \times p2pIndex$$

The variable $p2pIndex$ is updated according to the mid-rate yield per
block via an internal function, which is called each time a user calls a
function that needs to do the conversion to this unit. Note that the
complexity is constant

Note that in current PLFs there is a great imbalance between the volume
of loanable funds compared to the volume of demand. This is done on
purpose as liquidity pools need more suppliers than borrowers to work.
This is not the case with Morpho which could have much more borrowers
than suppliers and still be fully liquid and working. Moreover, in
Morpho, this imbalance is not necessarily in favor of suppliers since
rates are very different.

Indeed, the imbalance is highly dependent on market conditions and thus
on the P2P APY itself. One may remark that the P2P APY positioned in the
middle in the examples is an arbitrary choice and should be flexible to
reflect supply and demand eg. taking a rate closer to the supply APY of
the PLF instead of the actual middle to attract more borrowers. Without
having to build a complete competitive interest rates market, as in 4.,
some flexibility can be easily introduced to the P2P APY by updating it
according to market conditions.

## The matching engine

P2P positions on Morpho benefit from a $100\%$ utilization rate, which
means that, in terms of volume, there is as much supply as borrow
demand. This is a key difference from other pool-based PLF where there
is a lot more loanable liquidity than borrow demand, inducing low
utilization rates of their pool and thus creating the APY spread.

Most of the time, there will be an imbalance between supply and demand
in Morpho. For example, one can expect $n$ units of suppliers trying to
match $k$ units of borrowers with $n>k$ (or vice-versa). The protocol
needs to select $k$ happy suppliers to enjoy the P2P APY and the $n-k$
others will be put on the PLF. The module in the code responsible for
choosing and matching the $k$ users will be referred to as the matching
engine.

There are many alternative ways to design a matching engine: a FIFO
queue (First-In-First-Out), a volume sorted queue, uniformly random
choice amongst users waiting in the pools, \... . To design Morpho,
different parameters may be taken into account:

- Economic Efficiency: Maximize matched volumes.

- Gas Efficiency: Minimize gas, avoid dust problems.[^8]

- Simplicity: A passive user or contract should be able to benefit
  from Morpho simply supplying/borrowing.

- Fairness: The use of Morpho should benefit as many users as
  possible.

One might think that efficiency is gained to the advantage of a small
club of suppliers that are matched. This is not quite the case. The
contention here is that the way the interest rate market is run at the
moment in DeFi disincentivizes the demand for liquidity on the borrowing
side. With Morpho in place, more borrowers show up and the entire
cash-flow market grows. Moreover, as described in 2.3, the P2P APY will
self-adjust according to offer and demand and thus attract even more
users!

One could also imagine that this matching engine requires to loop over
the number of users and thus can't be scalable with the constraints of
the blockchain. The Morpho algorithm does use a loop to iterate through
users. The idea is that Morpho's gas cost is chosen by the DAO, which
sets how many matches are done for each user. When there is no gas for
matching left, the algorithm falls back to the pool for the remaining
amount. This ensures the full scalability of Morpho

Finally, remark that Morpho is fully onchain. The Yellow Paper shall
provide the full description of this algorithm.

## Token Incentives and inverted spreads {#Liquidity mining and inverted spreads}

Compound or Aave are currently undergoing very strong liquidity mining
programs as they emit large amounts of their native tokens AAVE or COMP
to incentivize users onto their respective protocols. If the user is not
in a P2P position (i.e. the user is placed in a pool), Morpho transfers
all the rewards to guarantee at least the same rates as Compound.

Often, liquidity mining rewards can reduce the net APY (APY+rewards)
spread or even invert it, i.e. APY borrow $<$ APY supply, as can be seen
in the following picture.

![[]{#fig:inverted_spread label="fig:inverted_spread"}Net borrow APY
(orange) and net supply APY (blue) for DAI over 150k Ethereum
blocks](inverted_spread.png){#fig:inverted_spread width="80%"}

In this scenario, Morpho guarantees at least the liquidity mining
inflated APY, but it will be less likely to have a strictly better APY.
Moreover, one may remark that a user could have to deal with three
different kinds of tokens in the same platform: the underlying token,
the pool token, and the Morpho Token.

To solve those problems, Morpho could let the user trade their
accumulated COMP or AAVE to Morpho Tokens with the Morpho DAO when they
claim their rewards. By doing so, the user gets a bonus of Morpho
Tokens, which is given out from Morpho's own incentive program. Remark
that Morpho thus accumulates AAVE and COMP, which makes sense as it may
want to have a say in the governance of the pool it relies on.

To summarize, two regimes can be distinguished for Morpho:

- The spread of the PLF is not inverted: Morpho moves supply and
  borrowing positions in and out of the PLF to get improved APYs as
  described in [2.1](#High-level description){reference-type="ref"
  reference="High-level description"} In the long term, this scenario
  will be the most likely.

- The spread of the PLF is inverted: Morpho and the user can trade
  claimed rewards from COMP/Aave to Morpho Tokens, incentivizing users
  by providing a bonus.

  The user is hence better off using Morpho in every scenario.

## Sustainability and Reserve factor

The Morpho protocol is a common good initiative aiming at providing
users with the best interest rates to supply and borrow crypto-assets.
Like any software system, Morpho will need a cash flow to maintain and
update its algorithm until it has fully matured into a convenient and
optimal service for all. To do so, a small fee is taken in the protocol.
The fee is a cut of the improvement made by Morpho compared to the pool
it optimizes.

# Product Position: a liquidity protocol optimizer

Morpho's long-term goal is to make supplying and borrowing operations in
DeFi more efficient and seamless. However, to start with, Caterpillar's
scope is dedicated to Pareto-improving current PLF. You are using
Compound? Consider Morpho-Compound. If you are using Aave, consider
using Morpho-Aave, etc. By doing so, you will then improve the capital
efficiency, and thus the APY, of your current positions whilst
preserving the same liquidity and the same guarantees.

One could distinguish two kinds of protocols in DeFi, financial
primitives such as Uniswap, Aave, Curve, Compound, \... which provide
essential bricks, and other protocols such as StakeDAO, ParaSwap, Yearn,
Convex, \... that compose the primitives to build more complex and
personalized products for the end-user, often taking trade-offs between
risks and yields. Morpho is a middle layer between the two and is not
comparable to the rest of the DeFi space.

Morpho optimizes the interest rate market, offering the same services as
Compound or Aave with improved rates while guaranteeing the same
liquidity and liquidation guarantees. It should be expected that
rational users of Compound and Aave would eventually switch to the
Morpho Protocol to enhance their yields. However, Morpho is not a
primitive itself, it is a primitive optimizer, an intermediate layer
between primitives and end-user endpoints: Protocols (or individuals)
using Aave should use the Morpho contract that connects to Aave to have
better yields for their users without taking additional market risks!

Since 80% of Compound/Aave users are protocols, we can expect the same
proportion for Morpho-Aave. Morpho is thus positioned at the bottom of
DeFi's stack, right on top of the primitive.

## Use cases

Here is a list of non-exhaustive use cases to make the use of Morpho
more concrete for the reader. Again, the main concept to remember is
that wherever a pool-like Compound or Aave is used, you can use
Morpho-Compound or Morpho-Aave instead.

### Strategists

Many protocols like Yearn [@yfidoc] or StakeDAO [@stakedaowpp] build
strategies to maximize the earnings or minimize the users' costs. Such
protocols use Compound or Aave and thus can use Morpho-Aave or
Morpho-Compound to generate even better returns without taking
additional market risks.

### Aggregators

Aggregators constantly try to find the best rates between different
supply or borrow markets. Remark that if Morpho-Compound is aggregated
with Compound, an aggregator will never switch back to Compound.
Moreover, Morpho's interfaces are the same for Morpho-Compound,
Morpho-Aave, and others. An integrator will be much more friendly with a
single interface rather than many. This way, one integrator can consider
only having the Morpho optimizers aggregated.

### Stablecoins

Decentralized stable coin protocols build strategies for their
collateral to work. However, those strategies must be fully liquid so
that the protocol can redeem the tokens and ensure the peg of the
assets. That is why many of those build strategies on Aave are famous
for being very liquid. With Morpho-Aave, protocols keep the same
liquidity and improve their rates! Most stablecoin protocols provide
substantial leverage for users supplying collateral in strategies. With
Morpho in place as a strategy for a stablecoin, the yield optimization
could be multiplied for the stablecoin protocol.

### Individuals

Individuals can of course interact with Morpho on a front-end like
[compound.morpho.org](https://compound.morpho.org.). The ADMO, the
association for the development of the Morpho DAO is also working to
develop the use of Morpho Protocol and favor integration with end-user
wallets.

One could simply supply assets to Morpho and start earning interests. A
slightly more complex approach would be to borrow stable coins against
other assets as collateral to put the borrowed tokens to work in yield
farming protocols.

Sophisticated users also borrow to implement more complex strategies,
like shorts or to build leveraged positions. Both of these kinds of
users are likely to be interested in enjoying optimized rates for their
trading strategies.

## An additional layer of smart contracts

Morpho introduces new lines of code, connecting to existing protocols.
One has to be fully aware of what that means when using the protocol.
First, it induces an additional gas price when using Morpho-Compound
rather than Compound. Second, Morpho is a new layer of smart contracts. The latter introduces
additional risk for the user however more than 20 audits have been conducted on Morpho protocols.
Nonetheless, it should be noted that the most famous auditors in the world like Trail of Bits, Chainsecurity,
or Spearbits each have or will soon audit Morpho Protocol. Finally, with
the help of Certora, the Morpho Labs team is undergoing the formal
proving of the protocol. The yellow paper also demonstrates mechanisms and theorem behind.

# Conclusions

The Morpho Protocol takes on the challenge of improving the way current
dominant DeFi liquidity protocols assign rates for suppliers and
borrowers. Morpho does so by exploring DeFi's composability nature and
combining cleverly the efficiency of earlier Peer-to-Peer protocols with
the liquidity offered by Pool-to-Peer protocols. The resulting construct
pleasantly optimizes rates while giving away none of the benefits
enjoyed by the Pool-to-Peer protocols.

The current landscape for money markets in DeFi is noncompetitive for
suppliers. By enhancing rates, Morpho advocates stronger adoption of the
protocol by the borrowing side, overall increasing the trading activity
of the market.

But, more efficient, fairer, and deeper interest rate markets are just
the first step. With increased adoption of the protocol, Morpho serves
as a stepping stone towards building competition in the DeFi rates
market.

# Acknowledgement

Morpho aims to become a decentralized common good. This White Paper
itself is the product of intense collaboration across different
Universities and companies worldwide. In particular, the authors would
like to express their gratitude to Merlin Egalite, Hamza El Khalloufi,
Jean Krivine, and Morpho's community for their invaluable contributions.

# Legal disclaimer

## Information purposes only

This White Paper is for general information purposes only and may be
subject to change without prior notice. Morpho Labs and any current or
future affiliated entities, their managers, directors, officers,
employees, advisors, consultants, agents, or any other person (the
"Morpho Team") do not make or purport to make, and hereby disclaim, any
representation, undertaking or warranty in any form whatsoever to any
person or entity, including any representation, undertaking or warranty
concerning the accuracy and completeness of any of the information set
out in this White Paper. Nothing contained in this White Paper is or may
be relied upon as a promise, representation, or undertaking as to the
future performance of the Morpho Token. Further, circumstances may
change, and this White Paper may become outdated. The Morpho Team is
under no obligation to update or correct this White Paper in connection
therewith. This White Paper may be translated into a language other than
English for information purposes only. In such case, the English
language version shall always prevail over the translated versions of
this White Paper.

## No contractual relationship

The information herein does not imply any elements of a contractual
relationship nor form the basis of or be relied upon in connection with,
any investment decision. The information set out in this White Paper is
not legally binding and is for community discussion only. It provides an
initial overview of certain business and technical essentials underlying
the Morpho Protocol. Any offering or sale of Morpho Tokens shall be
governed by separate terms and conditions. In the event of a conflict
between this White Paper and the applicable terms and conditions, the
terms and conditions shall prevail.

## Third-party information

The Morpho Team accepts no liability for damages, whether indirect or
consequential, of any kind arising from the use, reference, or reliance
on the contents of this White Paper. This White Paper may contain
references to data, industry publications, and/or third-party research.
No warranty is given to the accuracy and completeness of such
third-party information. Neither the third-party information, its
inferences nor its assumptions have been independently verified.

## No offer of securities

This White Paper does not constitute a prospectus, an offer of any sort
including securities, an "offre au public de titres financiers" under
French law, a solicitation for investment in securities in any
jurisdiction, or any offer to sell any product, item, or asset, whether
digital or otherwise. No information in this White Paper should be
considered as business, legal, financial, or tax advice regarding the
Morpho Protocol or the Morpho Token. Please consult your own legal,
financial, tax, or another professional adviser regarding this project
and the Morpho Token. Morpho Tokens do not in any way represent any
shareholding, participation, right, title, or interest in any entity
including Morpho Labs or its affiliates, undertaking, or enterprise.
Morpho Tokens does not entitle anyone to any promise of dividends,
revenue, fees, profits, or investment returns.

## Risk associated with the purchase of Morpho Tokens

Prospective purchasers of Morpho Tokens should evaluate all risks and
uncertainties associated with the purchase of Morpho Tokens. This White
Paper does not constitute advice nor a recommendation by the Morpho Team
on the merits of purchasing or holding Morpho Tokens or any other token
or cryptocurrency. Such purchase and holding carry substantial risks
that could lead to a loss of part, or all, of the funds invested. As of
the date hereof, the Morpho Token has no known potential uses outside of
the Morpho Protocol. No promises of future performance, value, or
utility are or will be made concerning the Morpho Token, including no
promise that the Morpho Protocol will be launched and no guarantee that
the Morpho Tokens will have any intrinsic value. Morpho Tokens are
designed and intended for future use on public Morpho Protocol, for
trading and governance transactions, or for the operation of nodes. The
Morpho Team may decide to amend the intended functionality of Morpho
Tokens for any reason, including to ensure compliance with any legal or
regulatory requirements to which it is subject, which may affect the
utility or any other properties of the Morpho Tokens. Any Morpho Token
could be impacted by regulatory action, including potential restrictions
on the ownership, use, or possession of such tokens. Regulators or other
competent authorities may demand that the mechanics of the Morpho Tokens
be altered, entirely or in part.
