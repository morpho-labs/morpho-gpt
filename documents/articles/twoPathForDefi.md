Link: https://morpho.mirror.xyz/KCMBXBYPOE-aYvPuu5vSVzUozoO98QqZsYHvx5TYz5c
Title: The Two Paths Ahead For DeFi: Decentralized Brokers vs. Protocols.

Paul Frambot, CEO of Morpho Labs, wrote:
DeFi is still in its infancy and faces a major fork in the road. Builders will have to pick their side, choosing to build either:

Decentralized Brokers — Platforms similar to TradFi funds or brokers, but with onchain infrastructure and decentralized governance.

Protocols — Trustless and general financial primitives that form a foundation for many more layers that can be built on top.

Decentralized Brokers
I define decentralized brokers as DeFi platforms that enable direct financial interactions between parties but require active human interventions to operate correctly. In short, they are DeFi platforms that are managed.

With their smart contracts alone, they cannot anticipate every possible outcome given the market's complex and dynamic changes. Instead, they rely on their governance to update risk parameters, upgrade the smart contract logic, etc.

This pattern is present in most of the largest DeFi platforms like Aave or Maker. They require numerous DAO members to actively monitor and update the platform's state for it to operate as it should. Remark also that Maker DAO often refers to itself as a DAO more than as an actual protocol.

Usually, onchain brokers follow two patterns:

Flexible, managed, and product-oriented codebase

Decentralized brokers typically operate with a vast Solidity code base, incorporating various features and maintained by multiple parties. This often comes with an upgrade pattern controlled by the DAO. In that regard, the operation of these broker infrastructures mirrors that of more traditional agile tech firms.

While this approach offers flexibility and simplifies user experiences, it has downsides, with security being a notable compromise.

Reliance on economic and statistic models.

In finance, there is almost always a tradeoff between passivity and efficiency, especially when operations last over time (e.g., holding a token, depositing capital, …).

To get around this, decentralized brokers incorporated risk management systems at the platform level, shielding the user from most of the complexities. The other side of the coin is that it adds many trust assumptions.

When USDC de-pegged and took DAI down with it, actual human beings had to stay up in the middle of the night, do the math, and submit the governance proposal to adapt to market conditions. As a DAI holder, I did not have to react to the market as I could trust the Maker DAO to do it.

Protocols
I will refer to Protocols as the trustless and general DeFi primitives that have the potential to form a foundation for financial products to be built on top of.

I like this name because these DeFi platforms look closer to traditional networking protocols (SMTP, IP, …) or operating system kernels rather than financial service operators. Uniswap obviously falls into this category. Others are targeting a similar path, such as Liquity or, more recently, Ajna.

Those protocols are mostly complete because they don’t require external interactions to operate correctly. (For more on the protocol completeness topic, I recommend this piece from Jesse Walden.)

Usually, there are two main patterns for recognizing \*\*DeFi platforms that are actual Protocols:

Trustless

Minimizing/removing any trust assumption is symptomatic of protocols. For example, the absence of upgradability patterns or setters indicates that the protocol is “complete” for its specific use case and could theoretically remain so forever.

Yet, being immutable can be a real challenge for some DeFi applications and often leads to inefficiencies, low adaptability to macroeconomic changes, and a complexification of the user base.

For example, Liquity’s growth is limited compared to an actively-managed, multi-collateral stablecoin like Maker’s DAI. Ajna’s liquidation, which occurs over multiple hours, will likely have very inefficient collateralization parameters compared to an Aave (chainlink oracles + updatable risk parameters), where liquidation can happen when the position becomes unhealthy.

General

Being very general is a great way for a protocol to maximize the range of applications that can be built on top of it. At scale, general protocols can reach the most significant network effect. A good example of this is Ethereum itself with the EVM.

Being general often requires protocols to be very unopinionated. While almost no DeFi protocol is entirely neutral, those getting closer to it enable a broader diversity of innovation on top of their primitive.

Panoptic is a great example of a protocol leveraging the neutrality of UniV3 to create powerful applications. This would have been much harder/impossible with a decentralized broker.

However, neutrality can often result in liquidity fragmentation. For instance, UniV4 may fragment liquidity to a greater extent than UniV3 did, as the latter only had four possible fee tiers per market.

While most stablecoins, perp exchanges, or over-collateralized lending pools tend to have adopted the decentralized brokers model, the trend seems to lean toward the Protocol approach.

For stablecoins, Maker DAO’s endgame tends to externalize complexities outside of the core contracts and emphasizes the impartiality of the currency it will create.

For DEXs, fee tiers, price ticks, and the oracle feature were the only opinionated/quantitative parts remaining in Uniswap V3, and they were removed with V4.

In looking across the DeFi landscape, it becomes clear that lending has historically gravitated toward decentralized brokers, with no complete protocol taking hold.

In the second part of this article, I’ll discuss how DeFi lending could benefit from more trustless and general protocols and how Morpho could approach this opportunity.

Part 2 of this article is available at the following link: The Metamorphosis DeFi Lending Needs.
