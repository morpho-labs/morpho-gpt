Link: https://morpho.mirror.xyz/F652srnxjv4qsIEHLUrDwOvrYgXU8p0io2cNogb2BJY
Title: Risk management problems Article

It’s time to talk about DeFi’s risk management problems.
16 August 2023
Paul Frambot

DeFi is still nascent and developing, with many of its components still to be refined in the coming years. Yet, if we are being honest with ourselves, there are also parts of the stack we should spend more time challenging.
Decentralized risk management has largely been a taboo topic as it has become critical to the security of some DeFi platforms while remaining very centralized and opaque to most.
Let’s look at the state of risk management today, primarily through the lens of decentralized lending (which is what we do over at Morpho). After building in the space for two years, Morpho has become the third-largest lending platform with nearly $1B supply, but it is also the largest lending pool user. This gives us a unique perspective on how risk management should (or should not) be more effectively “incorporated” into lending platforms.

Why are most lending platforms DAO-managed?
First, we must acknowledge the relative success of existing lending platforms using DAOs to risk-manage complex pools. Their Decentralized Brokers (https://twitter.com/PaulFrambot/status/1674808300968243200?s=20) approach was a great way to build platforms from 0 to $10B. Notably, it provides:

- Streamlined user experience: DAO-managed DeFi platforms allow for a passive user experience. The users will deposit funds if they trust 1) the smart contract; and 2) the DAO to manage their risk correctly.
- Liquidity: Every user subscribes to the same complex risk-reward profile defined by the DAO who is trying to fit most. While this largely limits scalability and expressibility, it has the nice effect of effectively making all positions fungible.
- Legal liability: it's a somewhat taboo truth, but decentralized risk management is a way to escape legal liability in the context of unclear regulation.
  Yet, we don’t think this model is anywhere near capable of handling the trillions of dollars of daily overcollateralized loan volume of TradFi.

DAOs are simply not suited for this
DAOs are neither risk experts nor highly agile entities. Risk management requires both expertise and fast decision-making. DAOs are built to govern the development of protocols underpinning the world's most important networks. They are not built to maintain complex financial services actively.
Aave, in particular, is an interesting case study of the promise of decentralization vs. the hard realities of risk management. Aave has more than 500 different risk parameters that need to be monitored in real-time and updated almost daily. More risk parameters must be monitored and adjusted as more features and markets are supported. There are no real economies of scale here – risk management complexity grows with the number of user options available.
Token holders can be anyone, and they are not necessarily risk experts. While a small number may be knowledgeable in what is a (very) complex field, it’s safe to assume that the majority are not. Yet, they collectively manage all the 500 interconnected risk parameters protecting billions of dollars in real-time.
As a result, the ongoing management of these risk parameters falls to trusted third parties that make recommendations to the token holders, who typically green-light anything other than the most controversial proposals.
Even if these outside risk management consultants make ethical, sound recommendations, it’s easy to imagine the opportunity for conflicts of interest between the firms, token holders, and end users. Or, at the very least, see how consensus can slow down the management of live risks.
Tl;dr: Effective risk management demands both expertise and the ability to make quick decisions. By definition, DAOs do not suit this role.

Broken incentives for risk managers
When providing risk management consultancy for a DAO, there are few incentives to open-source the code of the models and data used due to competition. As a result, token holders must approve risk parameter changes without the ability to verify them truly.
This opaqueness could also lead to risky competition games. Let’s take an exaggerated example to understand. Imagine Risk Management Firm X recommends adjusting a Liquidation LTV to 80%; their fee is $3m/year. Risk Management Firm Y recommends adjusting that same parameter to 85%, leading to more growth at relatively higher long-tail risk, and their fee is only $1.5 million/year. Token holders have multiple reasons to seriously consider Firm Y’s recommendations without full visibility into the interplay of different risk factors. In short, risk advisors are currently forced to compete for quite exclusive proposals.
Overall, it seems that decentralized decision-making and centralized risk management may be permanently at odds with one another. How can one correctly drive accountability of risk advisors if the ultimate decision is decentralized? In practice, we even observe that decision-making is recentralizing with low participation votes, multisigs, or bots.
Risk advisors are not to blame here. They are very talented firms and genuinely want to operate more transparently. Yet, ultimately, providing consultancy for DAOs is, by definition, less aligned with users and less scalable than advising the latter directly.

As a community, how do we fix this?
We’re working on several projects at Morpho to help minimize trust assumptions and inefficiencies in the risk management space.
Morpho’s next lending primitive will enable permissionless risk management. In particular, it will let anyone layer their risk models on top of a trustless and ultra-efficient lending primitive.
This would allow users to choose the risk model that makes the most sense to their needs, rather than having risk managers compete against each other with mutually-exclusive proposals that token holders must vote on. This model will enable much fewer trust assumptions, more efficiency, and infinite use cases. With the correct abstractions built on top, it will even bring UX/feature parity with existing models!
But, even if successful, our work alone is not enough to address this for the entire industry. As a community, we should:

- Debate more openly the shortcomings of the existing models;
- Propose alternatives that make risk management more resilient and open;
- Publish research and learnings on risk management so that others can build on our respective lessons and failures; and
- Open source codebases and models.

As a first step, Morpho Labs has published a research paper co-written with the talented Simtopia team (https://twitter.com/MorphoLabs/status/1691796656625492151?s=20). The latter open sources a full model to assess risk in a lending protocol. More open source risk tooling and research from Morpho Labs will soon follow.
If this post has inspired any ideas or perspectives about how we can design better, more resilient DeFi systems, we’d love to hear them. I’ll collect thoughtful responses, ideas, proposals, and more at the end of this post (even if they oppose different ideas). Hopefully, this might serve as a small compendium of the best thinking in this area. Based on everything I’ve seen this community build and accomplish, I’m confident we can dramatically improve the current state of DeFi.

Other thoughts on risk management

- Ajna (https://twitter.com/g_dip/status/1692204442697756820) presenting one possible solution and revisiting decentralization principles.
- RociFi (https://twitter.com/rocifi/status/1692519597839458449?s=20) on verifiable risk management.
- Kirk (https://twitter.com/OneTrueKirk/status/1692228855980016018?s=20) (from Volt) on improving DAO-based risk management with another paradigm.
- RiskDAO (https://twitter.com/bprotocoleth/status/1682319285190811648?s=20) open-sourcing risk management tools and research.
- Gearbox (https://twitter.com/apeir99n/status/1685960830675042304) on improving DAO-based risk operations.
