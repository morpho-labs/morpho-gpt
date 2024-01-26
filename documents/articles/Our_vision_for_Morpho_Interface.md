Link: https://morpho.mirror.xyz/syQYHLvzRn-nWIOx6KrevVc3kgwBg17LJmfz61jU_KY
Title: Our vision for Morpho’s Interface

By Paul Frambot
On 26 January 2024

Lending and borrowing form a complex market with diverse user needs, risk tolerances, and sophistication levels where no single interface can cater to all use cases effectively.
The vision for the Morpho interface is to function as an explorer of the Morpho protocol, offering a comprehensive yet unopinionated way to analyze and interact with Morpho contracts.
Of course, many users demand a simple user experience enabled by more feature-rich and specialized applications. For this, we're introducing a dedicated ecosystem page on the interface. It will showcase all the different products built on top of Morpho Blue, including but not limited, to one-click leverage staking, perp markets, and risk tranches.

- One interface does not fit all

  - Risk-reward tradeoffs are multidimensional
Protocols are multisided markets where each participant can make decisions to optimize for a specific outcome.
Swapping tokens on Uniswap is all about getting the lowest price for a given trade intent at a given time. This is a 1-dimension problem and there is one simple solution that suits every single user: the best available price for a given trade intent at a specific moment. This is why you can have one simple, canonical interface to swap.
However, most of the other financial primitives, involve multidimensional risk reward tradeoffs such as liquidity, rate, loss tolerance, terms, etc. In other words, there is not a single solution for all users to this problem. Instead, each user has different risk profiles and use cases. Interfaces must allow users to express their risk preferences which can make the UX extremely complex.
To prevent this, some lending pools, such as Aave or Compound, behave like decentralized funds and let their DAO take those tradeoffs for the user to remain easy to use.
Yet, as explained in this article (https://twitter.com/PaulFrambot/status/1691796379138449458), it feels unrealistic to believe that a DAO can handle all those tradeoffs for all the lending use cases in the world.
  - Interfaces for each personas
Morpho Blue gives users the choice of which markets and risk parameters to interact with. Although flexibility introduces some complexity, it allows for the protocol to accommodate various risk-reward appetites and user personas. To simplify the user experience, front ends can choose to display certain data and make assumptions to facilitate a specific use case or align with a risk appetite.
For example, apps to leverage trade, obtain financing from crypto, earn yield from leveraged staking, all use the same borrow function on Morpho, have unique user interfaces with very different data and user flows.
In this context, the Morpho Interface can not be all products at the same time. Instead, the Morpho Interface will make Morpho contracts readable by everyone, the same way Etherscan does make Ethereum’s data readable.
- The Morpho Interface is a network explorer
The Morpho Interface is a neutral front-end enabling users to explore and interact with the Morpho Protocol.
  - Neutral
 The Morpho Interface provides an unopinionated interface that lets the user lend and borrow without introducing any bias or simplification. In particular, the interface is:
    - Not optimizing for specific use cases: Does not have highly specific or opinionated features in the user experience compared to what is possible in the smart contract itself.
    - Comprehensive: The interface should let the user do and see what the smart contract exposes. In particular, there is no such thing as “bad information”. We display everything relevant to the user.
    - As such, the Morpho Interface will soon display all deployed markets and MetaMorpho vaults. To assist users in navigating the diverse opportunities, the front end will present relevant data and trust signals. Additionally, it will issue pop-up warnings to alert users about potentially dangerous or unknown oracles, assets, or vaults.
  - Accessible & Auditable
    - Auditable: The interface will be fully open-source (GPL3) and comes with a set of open-source (MIT) SDKs for anyone to build their own specialized app suited for any use case, complying with any jurisdiction…
    - IPFS and self-hosting: The app will be accessible on IPFS but also available to download and self-host or operate on a desktop.
    - Understandable: The interface should be easily understandable. It is important to note that no simplification will be done if it involves making opinionated choices.
    - Usable: The Morpho Interface allows any user to interact with all of Morpho Blue’s smart contract capacities without needing to be technical.
    - Resilient: The interface aims to minimize security and liveness assumptions. Although creating a completely decentralized and efficient back-end for Web3 apps remains challenging, Morpho should aim to decentralize its stack, aiming for increased resilience and transparency.

  - Non-Profit

The Morpho Interface is non-profit for two reasons:
     - Long-term alignment: The interface maintains long-term alignment with the user and ensures that the principles stated above are respected over time.
    - Non-competitive: The interface doesn't seek to compete with anybody building an app on the Morpho protocol. This leaves a lot of space for people to build profitable products on top of Morpho.

Until legal frameworks evolve to allow DAOs to own intellectual property or domain names, the nonprofit Morpho Association will control morpho.org, host the app and hold the intellectual property of the code. Further details on this and our perspective on why tokens represent the best form of ownership will be discussed in a future article.

- Showcasing the Morpho Blue Ecosystem

As mentioned earlier, one interface cannot satisfy the needs for every user persona. A very simple, yet important element of the Morpho Interface is the Ecosystem page. It showcases all the different specialized and feature-rich products built on Morpho. Now, Morpho users can discover the applications that suit their risk profiles or use cases from within the Morpho Interface.
The Ecosystem page already features several of the main DeFi applications that have built products powered by Morpho Blue:
    - Instadapp Pro - create and manage a sophisticated DeFi portfolio
    - SummerFi - use automated tools to borrow and leverage crypto assets
    - DeFi Saver - open, monitor, and manage advanced DeFi positions
    - Contango - trade perpetual futures with an optimized UI
    - Idle - tranche your exposures to suit your risk preference
