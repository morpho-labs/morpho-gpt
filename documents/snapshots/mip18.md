Link: https://snapshot.org/#/morpho.eth/proposal/0xb9640ef8b0e6b98ee93a7a43f2ce9b394a3cf8ca9a8053037315c8074f0eb66d
Title: MIP18 - List cbETH as collateral to AaveV3-ETH Optimizer
This submission proposes to list the cbETH as collateral asset on the AaveV3-ETH Optimizer.

As written in the forum discussion related to that:
https://forum.morpho.org/t/listing-cbeth-on-morpho-s-aavev3-optimizer/325

Here was the discussion related to that:
MIP18: Add cbETH to the Morpho’s AaveV3 Optimizer
Author: Rémi Foult

Summary
This publication presents the Morpho community the opportunity to onboard cbETH Coinbase Wrapped Staked ETH - the second biggest LSD/LST by TVL - to Morpho-Aave-v3.

Abstract
By adding cbETH as collateral on Morpho-Aave-v3, we can tap into the vast liquidity and market demand for cbETH. This integration will attract more liquidity to the Morpho platform.

Motivation
cbETH is the second largest LST by market cap: https://dune.com/queries/46128/90778 1
cbETH presents an excellent opportunity for inclusion on Morpho-Aave-v3 due to its significant market capitalization and deep liquidity across prominent DEXs. As the second-largest staked ETH token, cbETH offers a reliable and secure option for users seeking leveraged staking strategies.

cbETH was built by Coinbase, a leading cryptocurrency exchange and custodian known for its commitment to regulatory compliance and user security. Coinbase’s presence in the crypto ecosystem adds a layer of trust and credibility, attracting both institutional and retail users. Furthermore, Coinbase has actively engaged with regulators to obtain clarity on crypto regulations in the United States. Their efforts in navigating the complex regulatory landscape and advocating for sensible regulations have been instrumental in fostering a healthy and sustainable environment for the broader crypto industry. By including cbETH as collateral on Morpho-Aave-v3, we embrace not only a highly liquid and reliable asset but also contribute to the overall stability and growth of the crypto ecosystem, aligning with Coinbase’s mission of building an open financial system for the world.
Use Case
cbETH is an ERC-20 token on Ethereum that represents underlying staked ETH on the Coinbase platform.

The value of cbETH increases over time due to the accumulation of Beacon Chain rewards, priority fees, and MEV rewards earned by Coinbase node operators. This productive yield feature makes cbETH an attractive option for borrowing and leveraging in Morpho-Aave-v3.

Base cbETH Yield

Users gain 75% of the standard Ethereum staking APR at baseline.

Queued ETH Yield

Redemption of cbETH for ETH is available through Coinbase and the queue time depends on the beacon chain withdrawal queue.

Specifications
Risk Considerations

cbETH is soft pegged to it’s underlyng staked ETH so is subject to market forces. Price deviation from peg brings arbitrage opportunity by claiming redemption at Coinbase which processing time depends depends on beacon chain exit queue length.

cbETH liquidity is spread accross Uniswap, Curve, Maverick and Balancer

A 10000 cbETH to ETH swap on 1inch has a 1.2% price impact.

Market Volatility
There is approximately 10m$ average volume per day onchain.
Contract Address
cbETH: 0xBe9895146f7AF43049ca1c1AE358B0541Ea49704 1

Oracle
Chainlink Oracle:

cbETH Oracle: cbeth-eth.data.eth 0xf017fcb346a1885194689ba23eff2fe6fa5c483b
Risk Parameter Configuration
Morpho can uniquely suggest parameters and these should only be seen as a starting point. We believe that the cbETH market presents a similar quality to the rETH market and similar parameters are worthwhile.

Go To Market
refine MIP for snapshot vote

References
Project - https://www.coinbase.com/price/coinbase-wrapped-staked-eth

Whitepaper - https://www.coinbase.com/cbeth/whitepaper

Documentation - cbETH Intro | Using cbETH | Sourcing cbETH on Coinbase

Github / source code - Source code | Github

Ethereum contracts - Coinbase Wrapped Staked ETH | Etherscan

Chainlink oracle - cbETH / ETH Chainlink Price Feed

Audit - Coinbase Liquid Staking Token Audit - OpenZeppelin blog

Twitter - https://twitter.com/coinbase

Blog - https://blog.coinbase.com/

Support - https://help.coinbase.com/

The proposal has been executed, the transaction can be seen here: https://etherscan.io/tx/0xac6673d13b5fdb2c24ab1f4c1a92a5eb2b1b7ff25669af30968bdf0e3970d177 cbETH is now available as collateral on the Morpho-Aave V3 Optimizer!
