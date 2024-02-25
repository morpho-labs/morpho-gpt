Link: https://snapshot.org/#/morpho.eth/proposal/0x524daef3dfeb9dc2aa50e7f13d7d3b571f4d4bfa3d6577f023cb1cd4925f0187
Title: MIP37 - Steakhouse Financial: wUSDM, PYUSD and USDT MetaMorpho Vault Whitelisting

This submission proposes to whitelist Steakhouse Financial wUSDM, PYUSD and USDT MetaMorpho vaults address to allow the transfer of potential $MORPHO rewards to their depositors.

As written in the forum on 31 January 2024, discussion related to that: https://forum.morpho.org/t/steakhouse-financial-wusdm-pyusd-and-usdt-metamorpho-vault-whitelisting/452

Here was the discussion related to that:
Following on from the successful launch of the steakUSDC vault (https://app.morpho.org/vault?vault=0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB) earlier in January, Steakhouse Financial would like to propose whitelisting three new MetaMorpho vaults: wUSDM (Mountain Protocol), PYUSD (Paypal) and USDT (Tether). These vaults are centered around stablecoins that we see as having great potential to gain market share over the long-term. The addition of these vaults will significantly expand Morpho’s addressable market.
Our vault strategy remains the same: leveraging the ‘dual engine’ (crypto + tradfi yields) to provide lenders with optimal yields under any market conditions. The specific borrow markets we propose for each vault are slightly different and are summarized below.

- wUSDM (Mountain Protocol - https://mountainprotocol.com/)
What is it? Launched in October 2023, USDM is the first permissionless yield-bearing stablecoin, issued by a regulated entity in Bermuda and fully-backed by US treasury bills. wUSDM is the non-rebasing token that keeps the user balance of USDM fixed and accrues the yield through price appreciation. Currently USDM is natively yielding 5% APY for holders. Steakhouse Financial has been advising the Mountain Protocol team since last year.
Specificity: We will use a fixed price of $1 for USDM. USDM is supervised by Bermuda which provides clarity on the backing. Moreover, secondary liquidity remains small and could be easily manipulated.
Morpho Blue Markets: We propose to activate wstETH/wUSDM as collateral (LLTV: 86%, Oracle: Chainlink), opening a market between the leading yield-bearing Ethereum LST and the first yield-bearing stablecoin.

- PYUSD (PayPal - https://paxos.com/pyusd/)
What is it? Launched in August 2023, PYUSD is PayPal’s stablecoin issued by Paxos. In a short amount of time, PYUSD has reached $300 million in TVL and is set to benefit from PayPal’s distribution network of 430 million users globally.
Specificity: We will use a fixed price of $1 for PYUSD. PYUSD is supervised by the NYDFS which provides clarity on the backing. Moreover, secondary liquidity remains small and could be easily manipulated.
Morpho Blue Markets: We propose to initially activate two markets, namely wstETH/PYUSD (LLTV 86%, Oracle: Chainlink) and IBI01/PYUSD (LLTV 96.5%, Oracle: Chainlink), with a view to add a third, PayPool LP.
PayPool on Curve is one of the main liquidity sources for PYUSD, holding approximately $20m of PYUSD at the time of writing. Trident Digital, enlisted by Paxos and PayPal to scale the asset in DeFi, is currently providing LP incentives in an effort to grow the pool. Steakhouse is working through implementation details to enable PayPool LP as collateral, such as oracle selection and liquidations.

- USDT (Tether)
What is it? USDT has risen to the top stablecoin at $95 billion circulating supply, thanks to its focus on emerging markets. Steakhouse believes that steakUSDT vault will be an attractive product particularly for USDT holders in EM looking for a stable yield.
Specificity: We will use the market price for USDT. USDT is not supervised and doesn’t meet the transparency requirement that we have. Moreover, secondary liquidity is significant and should limit manipulation risk.
Morpho Blue Markets: We propose leveraging the dual engine allocation strategy employed in the steakUSDC vault by activating wstETH/USDT (LLTV: 86%, Oracle: Chainlink), WBTC/USDT (LLTV: 86%, Oracle: Chainlink), IBI01/USDT (LLTV: 96.5%, Oracle: Chainlink) and sDAI/USDT (LLTV: 96.5%, Oracle: Chainlink) markets.

Conclusion
As stablecoin specialists, Steakhouse Financial has cultivated significant experience and network within DeFi. Leveraging our insights from helping Dai (MakerDAO) and stETH (LidoDAO) grow, we look forward to supporting relatively new assets like USDM and PYUSD gain wide adoption. We are also excited to bring a credible alternative to the existing USDT borrowing/lending market, using our bluechip “dual engine” strategy.
Steakhouse has begun educating investment funds, wallets and fintech players on MetaMorpho with the successful launch of the steakUSDC vault. We look forward to continuing on that journey with our three new proposed vaults and bringing value to the Morpho ecosystem.

The proposal was voted on and accepted on 25 February 2024.