Link: https://snapshot.org/#/morpho.eth/proposal/0x011fa864ae4c9f99373dcbaa10531dcf3b0c3dc5f2fa9d7cf9dad5606f5ec552
Title: MIP46 - Incentives on LP Curve Tokens / crvUSD markets

This submission proposes to allocate 500k MORPHO as incentives over a three month period to the 5 markets to grow along 357k CRV from Curve.

As written in the forum on 8 March 2024, discussion related to that: https://forum.morpho.org/t/curve-morpho-blue-incentives-for-the-crvusd-markets/500

Here was the discussion related to that:
Curve <> Morpho Blue - Incentives for the crvUSD markets

- Summary
I plan to distribute $250k worth of CRV tokens as incentives for the Morpho Blue markets to make up the crvUSD MetaMorpho Vault. This MetaMorpho Vault will be managed by LlamaRisk, who has proposed whitelisting (https://forum.morpho.org/t/llama-risk-crvusd-metamorpho-vault-whitelisting/484) for this initiative.

LlamaRisk requests MORPHO token from Morpho DAO to incentivize crvUSD markets in addition to the $250k in CRV.

Over three months, the CRV and requested MORPHO tokens will incentivize participation in the crvUSD MetaMorpho Vault markets. LlamaRisk proposes that Morpho DAO distribute CRV and MORPHO token incentives for these markets.


- Curve x Morpho Blue
Curve is a major automated market maker (AMM) in decentralized finance, with a total value locked (TVL) of $2.5 billion. It has issued crvUSD, a stablecoin with a current circulating supply of approximately $160 million that maintains a close peg to the US dollar.

CRV is the governance token of the Curve DAO, which can be locked as veCRV to earn trading fees and lending fees associated with crvUSD.

Unlike traditional lending pools, Morpho Blue allows Curve to incentivize specific use cases more precisely. On Morpho Blue, Curve can incentivize particular asset pairs with strong use cases, potentially driving further adoption of crvUSD.


- Proposal Details
The crvUSD MetaMorpho vault will use a Convex liquidity pool wrapper token to maximize yield for depositors of Morpho Blue markets.

Loan asset: crvUSD - Collateral asset TricryptoUSDT (USDT/ETH/WBTC)
Loan asset: crvUSD - Collateral asset TricryptoUSDC (USDC/ETH/WBTC)
Loan asset: crvUSD - Collateral asset TricryptoLLAMA (crvUSD/wstETH/tBTC)
Loan asset: crvUSD - Collateral asset TryLSD (wstETH/rETH/sfrxETH)
Loan asset: crvUSD - Collateral asset TriCRV (crvUSD/ETH/CRV)

For further technical details consult the LlamaRisk proposal: https://forum.morpho.org/t/llama-risk-crvusd-metamorpho-vault-whitelisting/484


- Rewards Amount
The proposal involves distributing $250,000 worth of CRV tokens as rewards across the relevant markets over three months. At the time of writing, this equates to approximately 357,000 CRV tokens based on the price of $0.70 per CRV.

The distribution will occur in two payments. The first payment will be 160,000 CRV tokens. The second payment will be the remaining amount of CRV tokens, adjusted based on the CRV price at the time minus the initial 160,000 CRV. The second payment is scheduled for day 60 of the program.

The final CRV price for the 90 days will be determined using a 7-day time-weighted average price (TWAP) calculated on the first day of the rewards distribution.


- Rewards distribution
I propose that Morpho DAO integrate the distribution of incentives into the Standardized method (https://forum.morpho.org/t/standardized-method-for-distributing-incentives-on-morpho-blue-markets/412) for distributing incentives on Morpho Blue markets.

Since the incentive package involves multiple markets, LlamaRisk will have the flexibility to allocate the monthly amount across new or existing markets as they deem fit during each epoch (monthly period).

The growth of such markets would benefit Morpho, so it is prudent for the Morpho DAO to distribute MORPHO tokens over the three months to help incentivize market expansion.

Should the proposal be accepted, the specified amount will be sent to Morpho.eth in two installments: the first on day one and the second on day 60. 


The proposal was voted on and accepted on 26 March 2024.