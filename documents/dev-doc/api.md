Link: https://developers.morpho.org/api/api-documentation
Title: API Documentation

This page describes the use of the Morpho API: Access public data from Morpho Protocol (analytics, rates, APY, rewards) programmatically, useful for time-consuming on-chain data retrieval.
Morpho API Documentation
​​
Introduction

The Morpho API is a RESTful API that provides easy and performant access to public data from the Morpho Protocol. It allows developers to programmatically interact with the protocol and retrieve various types of data, such as analytics, rates, APY over time, or rewards for every user. This document provides a comprehensive guide to the API and explains how to use it effectively.
Getting Started

To use the Morpho API, you need to know the base URL of the API and the available endpoints. The base URL for the Morpho API is https://api.morpho.org/.

Explore the API

The API is made of standard REST endpoints. You can find a complete description of the available endpoints on , which will give you a Swagger documentation. Head up on the Swagger to identify which path you can use, and try them directly into your browser.

Reminder:
The Morpho API is a public API, and there were significant efforts to make it accessible and performant for everyone. Please use the API responsibly and refrain from attempting to break or hack it. Your cooperation help enhances the quality and reliability of the service provided.
Thank you.

Why Using the API?
The Morpho API provides almost instant access to analytics data, rates, APY over time, or rewards for every user. It is a powerful tool for developers who need to retrieve public data from the Morpho Protocol and use it in their applications. The API is particularly useful for retrieving data that would take a long time to compute on-chain, such as analytics.
However, it is not recommended to use the API for retrieving data that can be obtained directly from the Morpho contracts using Ethers.js and an RPC endpoint to query the Ethereum blockchain directly or from an aggregation using a Subgraph or any other custom framework, or from public repo accessible through GitHub.
API Endpoints

The following endpoints are available in the Morpho API:

1. /analytics
   analytics -> global historical data,
   analytics/market -> historical markets data.
   Provides analytics over time. Every query will by default return the last 30 days of data of the Morpho Protocol, including the different markets values, APY, total supply, total borrow, etc. Use it for your data visualization, to draw charts, or display some lines over time.
   <>
2. /metrics
   metrics -> global metrics about the different protocols,
   metrics/market -> data about the requested market,
   metrics/markets -> data about the different markets.
   metrics/{metric} -> global metric about the different protocols,
   <>
3. /rewards
   rewards/emissions -> emission of the current age & epoch,
   rewards/emissions/history -> rewards history by epochs,
   rewards/emissions/{epochId} -> rewards for a specific epoch,
   rewards/distributions/user/{address} -> rewards for a user.
   <>
4. /protocols
   {protocol}/user/{address} -> user balances on the protocol.
