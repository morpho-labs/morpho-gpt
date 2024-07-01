Link: https://morpho.mirror.xyz/eSlZ0IzDN6aJSpeuNJ7dDNwIST0QtOLhT4EYvvSRirY
Title: The Morpho Stack: Not Monolithic, Not Modular, But Aggregated

By Paul Frambot
On 28 May 2024

The ongoing debate between monolithic and modular remains a focal point of contention as new approaches to lending, such as Morpho’s, start to gain significant traction.
Most commentary describes Morpho — with Morpho Blue's permissionless market creation and MetaMorpho's customizable lending vaults — as modular. However, we believe Morpho’s architecture goes beyond the false choice between monolithic or modular and represents a new category: aggregated.
Morpho’s aggregated lending stack combines the benefits of modularity with unified liquidity seen in monolithic instances while mitigating their downsides.

- Monolithic vs Modular Lending
    - Monolithic
    Monolithic lending pools, like Compound or Aave are essentially full-stack lending platforms, with a single liquidity pool and risk management enshrined in the structure of the lending market.
    As described in a previous article (https://morpho.mirror.xyz/EzJu5-3zdzlqdwP8kwnYwVYZD2iONz5PF4ohe--VPyE), the approach provides users with a remarkably passive user experience and deep liquidity but has notable drawbacks:
        - Restricted to a one-size-fits-all risk profile for lenders.
        - Risk management is governed by token holders:
            - One can’t assume any activity or knowledge from token holders, leading to reliance on consultants or centralized entities with exclusive arrangements.
            - Inhibits open competition, impacting fees and risk management quality.
        - Large codebases, upgradability issues, and frequent parameter changes pose challenges for builders and complex integrations, as experienced firsthand with Morpho Optimizers.
        - While improvements are possible with new features, current monolithic designs prevent listing a wide range of assets.

    - Modular
    Modular lending platforms allow anyone to create and manage pools, each with different logic and assets. Unlike the one-site-fits-all approach, each pool can offer a unique risk profile. This allows modular platforms to address more diverse use cases, enhancing their ability to scale.
    However, modularity fragments liquidity for each new instance that is created. Pools listing the same assets don't share liquidity while their varying logic complicates the user experience and makes modular protocols more challenging to build on top of.
    Although composability can help mitigate the downsides of fragmentation, monolithic platforms will provide stronger liquidity guarantees because of their shared state. AaveV4’s cross-chain omnipool is one example of how monolithic instances could aggregate liquidity more effectively than current modular approaches.

- Beyond Monolithic and Modular
From Monolithic to Modular to Aggregated. The term was introduced initially by Polygon (https://polygon.technology/blog/aggregated-blockchains-a-new-thesis) for blockchains but is also applicable to lending.
Morpho’s aggregated approach combines the strengths of modularity with unified liquidity seen in monolithic instances while mitigating their drawbacks.
What sets Morpho’s design apart is its layered architecture:
-Primitive markets that are flexible, ungoverned, and immutable.
-Modular layers built on top of the primitive markets that specialize in UX, liquidity, and risk management.
    - Primitive markets, not modular pools
    While Modular pools are configured with different logic (modules) and assets to create various risk profiles, Primitive markets are simple, general-purpose building blocks designed to be reused to form diverse risk profiles.
    The illustrated example in the article shows less Morpho primitive markets than modular platform is needed to satisfy the same number of risk profiles.
    The effects of fragmentation vs aggregation are amplified at scale. As the need for new risk profiles grows, modular pools fragment liquidity, whereas primitive markets aggregate it.

- The Morpho Stack
The Morpho Stack consists of modular layers aggregated on shared primitive markets. At its core is Morpho Blue, a simple, immutable infrastructure with permissionless market creation that enables diverse lending use cases. As a base layer, it does not enshrine risk management or features but rather leaves risk and product optimization to an open market.
The design enables the modular layers built on top of Morpho Blue to re-use its primitive markets in multiple ways. Risk curators and builders can customize risk profiles, create specific products, add compliance layers, etc. It also allows the endless complexity of lending/borrowing to be tackled individually per use case.
One example is MetaMorpho, a risk management layer built on Morpho Blue. With MetaMorpho, risk curators can create and customize lending vaults that provide a passive yield to depositors. Each vault is configurable and can allocate deposits across a combination of Morpho Blue markets, depending on its strategy. Each MetaMorpho vault is a different instance, but all liquidity is aggregated on Morpho Blue.
On the borrowing side, there is the Public Allocator which enables shared liquidity between isolated markets so users can borrow more and applications that offer streamlined user experiences with additional features. There can also be custom liquidations, rate optimization, and other layers to improve the borrower experience.
Although each layer is built separately, they still aggregate all the liquidity to Morpho Blue’s primitive markets.
The primary downside of this approach is that Morpho Blue, on its own, is very raw. At first glance, it is hard to use, fragments liquidity, induces rate volatility, and lacks features. But Morpho Blue is merely the foundation where liquidity is aggregated. The magic happens when the entire Morpho network — tech stack and ecosystem — operates together, amplifying the core primitive.
    - MetaMorpho vaults curate risk, improve the liquidity profile for lenders, and optimize rates.
    - The Public allocator increases liquidity available for borrowers.
    - Features help automate position management e.g. liquidation protections.
    - Applications streamline the user experience for specific use cases e.g. leveraged looping.

Importantly, by separating the stack into modular layers, users can choose which layers to interact with. Typically, as a tech stack expands, the smart contract risk increases due to the additional lines of code creating a larger potential attack surface. Morpho mitigates risks by exposing users only to the parts of the stack they utilize.
In the end, Morpho’s aggregated architecture is uniquely positioned to provide:
    - Builders, fintechs, and CEXs an open, immutable, and stateful infrastructure to build on.
    - Users with diverse yet tailored lending/borrowing experiences with deep liquidity.
    - Shared liquidity that increases Morpho’s efficiency and network effects as the ecosystem grows, benefiting anyone building on the stack.