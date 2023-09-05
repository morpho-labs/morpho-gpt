Link: https://developers.morpho.org/subgraphs/subgraphs-documentation
Title: Subgraphs Docs
Subgraphs Documentation
This page describes the use of the Morpho Subgraphs: Access public data from Morpho Protocol (analytics, rates, APY, rewards) programmatically, useful for time-consuming on-chain data retrieval.
Morpho Subgraphs Repository
​​
Morpho Subgraphs Playground
​​
Introduction
The Morpho Subgraphs provide developers with a powerful way to access and retrieve data from the Morpho Protocol, using GraphQL-based subgraphs. The subgraphs enable developers to track the evolution of the supported lending protocols and their interactions with Morpho.
Getting Started
To use the Morpho Subgraphs, you need to be familiar with GraphQL and its query language. Visit the Morpho Subgraphs Playground () to explore the available subgraphs and learn how to structure your queries.
Explore the Subgraphs
The subgraphs contain data related to lending protocols, event flows, P2P improvements, and more. You can access data such as pool rates, indexes, balances, and user interactions with Morpho, including supplies, borrows, repayments and withdraws.
Why using the Subgraphs?
Using the Morpho Subgraphs enables you to access comprehensive data from the Morpho Protocol, including information about its peer-to-peer aspect. The subgraphs provide a scalable and efficient way to retrieve information that is difficult or time-consuming to compute on-chain.

3 examples:
n°1: query the last deposit.
query {
deposits(first: 1, orderBy: blockNumber, orderDirection: desc) {
id
hash
account {
id
}
asset {
id
name
symbol
}
amount
amountUSD
timestamp
blockNumber
}
}
n°2: query the position.
query {
accounts(first: 1) {
id
positions {
market {
id
}
asset {
id
symbol
}
side
balanceOnPool
balanceInP2P
}
}
}

n°3: query the last liquidation
query {
liquidates(first: 1, orderBy: blockNumber, orderDirection: desc) {
id
hash
gasPrice
gasUsed
blockNumber
market {
id
name
}
liquidator {
id
}
liquidatee {
id
}
asset {
id
name
symbol
lastPriceUSD
}
amount
amountUSD
profitUSD
}
}

If you have any questions or need further assistance, please don't hesitate to reach out on discord.
