Link: https://morpho.mirror.xyz/Ps_ESP5rX1afubgRRmNwE-yHqyiohVplAK_KbsRj3sE
Title: Introducing the Public Allocator for Morpho Blue

By Morpho Labs
On 10 May 2024

Today, we are unveil the Public Allocator for Morpho Blue: a new feature that provides borrowers with just-in-time liquidity by reallocating liquidity between markets to increase the liquidity on a selected market.

Liquidity reallocation is made possible with MetaMorpho Vaults and a separate contract called the Public Allocator (https://github.com/morpho-org/public-allocator/blob/main/src/PublicAllocator.sol). Typically, an address controlled by the risk curator allocates a vault's liquidity. However, a vault can also allow the Public Allocator contract to reallocate liquidity between listed markets and within customizable limits.

Once enabled, users can call the contract and move liquidity from eligible markets to the market they wish to borrow from. This gives users access to just-in-time liquidity and significantly increases liquidity available to borrow from a market.

The Public Allocator will help facilitate more efficient capital allocation between isolated markets and further re-aggregate liquidity on Morpho Blue. As deposits on underlying markets continue to grow, Morpho Blue’s liquidity profile will be able to scale beyond what is possible on monolithic multi-asset lending pools.

- Using the Public Allocator
Users do not interact with the Public Allocator directly. Front ends integrate the contract and bundle liquidity reallocation with a borrow transaction when required.
For example, on the Morpho Interface, the borrow tab has a property called Available Liquidity which displays Market Liquidity plus liquidity on other markets with the same loan asset that can be reallocated to the selected market using the Public Allocator.
When a user needs to borrow an amount of liquidity greater than the Market Liquidity, the interface triggers the Public Allocator to transfer liquidity from another market(s) and fills the borrower’s order with just-in-time liquidity.

- How the Public Allocator works
Intuitively, standard isolated markets would have less liquidity than a multi-asset lending pool.

The article provides an illustrated case study where the Public Allocator increases the available liquidity for a market.

- Public Allocator Restrictions
The Public Allocator can only reallocate liquidity between markets listed by a given vault within the limits described below to avoid altering its risk profile.

The vault owner or admin can set the following restrictions:

Max flows: Each market has a max inflow and outflow, which the vault owner or admin can set. This can be useful to prevent reallocations from negatively impacting market rates or over/under-exposing the vault to a certain market.

Fees: The vault owner or admin can set a fee in ETH, paid by the user, to call the reallocate function. Setting a fee can help prevent attempts at malicious reallocations.

The code for the PublicAllocator is fully open-source and can be found here: https://github.com/morpho-org/public-allocator/tree/main