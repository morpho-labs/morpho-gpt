Link: https://morpho.mirror.xyz/EzJu5-3zdzlqdwP8kwnYwVYZD2iONz5PF4ohe--VPyE
Title: The Metamorphosis DeFi Lending Needs

Paul Frambot, CEO of Morpho Labs, wrote:
The Two Paths for DeFi: Decentralized Brokers vs. Protocols.
in this article https://morpho.mirror.xyz/KCMBXBYPOE-aYvPuu5vSVzUozoO98QqZsYHvx5TYz5c

DeFi lending is made up of decentralized brokers.
Since Compound’s introduction in 2018, most lending platforms have followed the same pattern: a smart contract accounts for liquidity and interests, and a DAO manages the assets of depositors DAO, ensuring the pool does not suffer from bankruptcy.

Building Morpho Optimizer, currently the largest platform built on top of those decentralized brokers, I have learned a few things about the pros and cons of this model:

What has gone well
Liquidity is king

Liquidity is not fragmented in the Aave and Compound platforms; everything happens in the same pool.

When you deposit ETH on Aave to leverage long ETH, borrow USDC, or simply earn interest, all the liquidity is concentrated in the same place. This is very attractive for borrowers who can borrow deep ETH liquidity or for lenders who want a guaranteed exit at any time. This is possible because all users subscribe to the same risk-reward model that the DAO token holders constantly update.

In this context, a decentralized broker is responsible for either protecting the platform from turbulent market movements or growing the set of use cases available, depending on the latest trends.

Passive UX

If they are properly managed, DeFi lending pools provide an intuitive and seamless experience. Click Supply and immediately earn interest. Click Withdraw and immediately get your funds back.

While this feels simple and automatic to the user, they don’t see the hard work behind the scenes. Current lending pools’ smart contracts are very large and often require fixing. The engineering workload required to develop, maintain, and upgrade those is enormous. On the funds’ management side, millions are spent on risk experts to ensure the protocol does not go bankrupt by monitoring and updating hundreds of risk parameters.

In this regard, Aave DAO has excelled in executing the thankless job of maintaining tens of different platforms across multiple chains in a decentralized way.

What needs improving
Trust assumptions are much larger than we think

Even the most informed users underestimate the number of risk parameters that must be monitored and adjusted and how critical those adjustments are to a platform’s security. One single misadjusted liquidation LTV, liquidation incentive, collateral listing, etc., and the whole pool can be compromised or bankrupt. This has been the primary cause of numerous bad debt events or hacks in lending.

For instance, the Aave DAO has over 500 risk parameters over multiple pools. While a decentralized vote occurs to approve parameter changes, almost no one has full visibility into how the proposed values are calculated!

Limited scalability and efficiency

Decentralized brokers aim to grow by adding new use cases, such as listing new collateral. This results in an increase in the number of parameters that need to be managed. However, DAO-style management is not the best-suited or most scalable model to constantly update parameters. Moreover, it constantly trade-offs between centralization, scalability, efficiency, and risk:

Suboptimal capital efficiency. E.g., the liquidation LTV of one asset has to be defined according to the worst asset listed on the pool.

Suboptimal rates. E.g., the pools have large spreads between the lending and the borrowing APY to guarantee the liquidity of liquidations and withdrawals.

Ever-growing risk. E.g., the more use cases that are covered, the more risks users take.

After two years of building on top of decentralized brokers, I realized they are way too opinionated and unstable for additional layers to be built on top.

How can DeFi lending reach its full potential?
Establish core primitives
Building more unopinionated and trustless lending primitives seems to be an alternative path to the decentralized broker approach.

On one hand, primitive protocols would remove the need for DAO management, a critical blocker for current decentralized brokers. On the other hand, primitive protocols would likely make the user experience more complex or fragment liquidity.

Building and perfecting primitives is the most challenging work in DeFi platform development. Even designing a primitive to perform a simple financial action demands undivided focus and meticulous research from protocol contributors.

Despite this difficulty, the sector seems to be moving in this direction with new initiatives such as Ajna or, more recently, Surge.

Build abstraction layers on top
While primitives alone may not be suited for the current DeFi user personas, they leave the option for abstraction layers to be built on top to guarantee seamless and liquid experiences.

In our vision, DeFi should be resilient, efficient, and open at its core, and abstracted with layers to progressively reach a much broader audience.

Anyone could build (de)centralized brokers in those abstraction layers on top of trustless protocols.

What about Morpho?
In just a year, Morpho became the third-largest lending protocol on Ethereum, with over $850 million in supplied assets. Morpho's initial version, Morpho Optimizer, was developed on top of Aave and Compound to improve the efficiency of their interest rate model.

Although Optimizers have seen significant growth, we acknowledge the inherent limitations of current lending models in achieving DeFi's next order of magnitude. Consequently, over the past six months, we have devoted most of our resources to developing a new trustless and efficient lending primitive. More on this will be revealed in time.

Two years ago, as we penned the inaugural White Paper, we anticipated this moment. Hence the name Morpho, a nod to the evolution that all caterpillars inevitably undergo.
