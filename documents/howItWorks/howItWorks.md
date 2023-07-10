Link: https://docs.morpho.org/start-here/how-it-works
Title: How It Works

What problem is Morpho solving?
On AAVE or Compound, you may have noticed a large spread between the interests paid by borrowers and those earned by suppliers.
This spread exists because current lending protocols use a liquidity pool mechanism. In most cases, there is a significant mismatch between the number of suppliers and borrowers - pools have many suppliers and very few borrowers, causing poor capital efficiency.
In a liquidity pool, yields are socialized, meaning numerous lenders must share the interest paid by the limited amount of borrowers. Therefore, suppliers earn less while borrowers pay more to make up for low utilization. A large spread is the result of this mechanism.
Using Morpho, rewards are no longer socialized. Instead, the supplied liquidity dynamically and seamlessly matches peer-to-peer as borrowers come and go. Lenders receive interest payments corresponding to those paid by the borrower(s) they are paired with: matched lenders don't share interests.

How Morpho improves rates

When lenders and borrowers are matched peer-to-peer, Morpho can freely choose the P2P rate but it must remain within the spread of the underlying protocol's pool (betweenlendingAPY and borrowingAPY) to be profitable for both parties.
Let's work through an example. Say Alice is the first lender to come to Morpho. As she is alone, she will not find a match, so Morpho deposits her liquidity in the underlying pool.
Then, Bob, a borrower, comes in. Morpho automatically removes Alice's liquidity from the pool to match Bob at the P2P rate. Both receive a better rate, a win-win for both parties.
If and when one of the two leaves, Morpho will tap into the liquidity of the underlying lending pool - also known as the fallback mechanism.
On this graph, one sees that Morpho enables improved rates for both parties while ensuring that a user can break the peer-to-peer match to fall back on the pool at any moment.

Why can we say that Morpho provides better rates? Suppliers can lend at a higher rate (then earn more yield) and Borrowers can borrow at lower rates (then pay less). Thus Morpho is providing better rates.
To ensure Morpho is an improvement for both suppliers and borrowers, the P2P APY is chosen by Morpho's DAO within the interval [lendingAPY; borrowingAPY]of the underlying protocol's pool. This is done through the p2pIndexCursor parameter set by governance, selected from within [0; 1], representing the position of the P2P APY within [lendingAPY; borrowingAPY].

How matching works
The Morpho protocol holds an on-chain priority queue to match users, sorting users according to the amount they want to lend or borrow. When a new lender supplies liquidity to the protocol, their liquidity is matched with the largest borrower first. Followed by the second, third, and so on, until the liquidity supplied is fully matched or there are no more borrowers to match.
Correspondingly, suppose a new borrower comes to the protocol for liquidity. In that case, their demand is matched with the most significant lender first, then the second, until the borrowed liquidity is fully matched or there are no more lenders to match.
The data structure holding the priority queue on-chain is chosen based on research led by Morpho Labs, a software development company contributing to the development of the Morpho protocol, which considers the most gas-efficient data structure for this task.
You can learn more about the matching engine here.
To be fully scalable, the Morpho DAO sets a maximum gas consumption for the matching process. This parameter is known as maxGasForMatching.
Advanced users can customize this parameter when supplying or borrowing liquidity. If the matching gas consumption exceeds maxGasForMatching, the remaining unmatched liquidity is deposited on the underlying protocol's pool.

How $COMP and $MORPHO rewards work
The Morpho protocol automatically accrues rewards distributed by the underlying protocol on behalf of its users. This means that all rewards from the underlying protocol accrued by a Morpho user can be claimed just as if the user was using the underlying protocol directly.
The Morpho protocol also distributes its own $MORPHO rewards to its users. Learn more in the Ages & Epochs section.
