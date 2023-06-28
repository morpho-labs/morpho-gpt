Link: https://docs.morpho.org/start-here/faq
Title: FAQ docs

What is Morpho?
Morpho is a peer-to-peer layer built on top of lending pools like Compound or Aave.
It is a lending pool optimizer: it improves the capital efficiency of positions on lending pools by seamlessly matching lenders and borrowers peer-to-peer. By doing so, Morpho enhances your rates while preserving the same experience, liquidity, and parameters (collateral factors, oracles, etc.) as the underlying pool.
This means that by using Morpho, you either receive, in the worst-case scenario, the APY of the underlying pool; or an improved APY thanks to P2P matching. The improved APY is called the P2P APY.

Why use Morpho?
Morpho enables one to supply and borrow crypto assets with optimal capital efficiency and deep liquidity.
Is Morpho limited to the optimization of Aave and Compound?
No. While Morpho is currently only deployed on Aave and Compound, it can be adapted for and deployed to any pool-based lending protocol.

How to earn governance power?
Either you have $MORPHO, either someone is delegating its voting power to you.

How to earn/have some $MORPHO tokens? Are they transferable?
Only by using the protocols, or contributing to it. They are not transferable at the moment. More information in the doc later.

Is there an interest-bearing token (ibToken)?
There is currently no ERC-20 ibToken. However, your position is, of course, recorded in Morpho's smart contracts. For example, you can visualize it on this front end, Etherscan, DeBank, or Zerion.
Similar to Uniswap v3, Morpho users have non-fungible positions. This is because some users are matched, and some others are not. It could be possible to eventually represent a Morpho position as an NFT, but it is currently not the case.

The Morpho Labs team is working on a set of ERC-4626 adapters to facilitate some integrations for the lenders' side. If this is something your use case needs, feel free to contact us directly.
What is the difference between Peer-to-Peer (P2P) and Peer-to-Pool (P2Pool)?

With P2Pool, lenders provide liquidity to a pool of assets, and borrowers borrow liquidity from it. Instead of each party interacting directly with the other, they interact with a commonly shared pool. In that case, yields are socialized, meaning that the lenders share the interests paid by the borrowers proportionally to their share of the pool.

With P2P lending, lenders and borrowers are matched together directly without going through a pool. In that case, yields are not socialized, meaning that each lender gets the interest paid by the borrower(s) he is matched with on the entirety of the capital he lent.

Is Morpho's P2P APY still interesting if the protocol it plugs into offers rewards?
Liquidity mining rewards can reduce the net APY (APY + rewards) spread between the lending and the borrowing side. If rewards campaigns are intense, it can even invert it, i.e., borrow APY < supply APY. In this scenario, Morpho can deactivate peer-to-peer matching to guarantee at least the liquidity mining inflated APY. Still, it will be less likely to have a strictly better APY.
Moreover, Morpho started a $MORPHO reward campaign which comes in the addition of native APY or the $COMP rewards. Hence, Morpho-Compound users are always strictly better than on Compound.

Why use P2P?
P2P is much more capital efficient than P2Pool. As a P2P layer on top of liquidity pools, Morpho combines the capital efficiency of P2P with the instant liquidity of P2Pool. We explain this in more detail in the core concepts.

How does the matching engine work?
You can read more about the concept here and here. You can also deep dive into the topic in the developers' documentation.

Can I be partially matched P2P?
Yes. If there are not enough peers to match the total amount that a user deposited/borrowed, it is possible to have some funds matched and the rest sourced through the pool. In this case, the liquidity that matches P2P will earn the P2P APY while the rest of the liquidity will earn the pool's APY.

What happens if I don't have a P2P match?
If a user does not get matched instantly, he will still enjoy the same rates as the underlying pool, plus the $MORPHO rewards. Moreover, the user can be matched later as new users come to Morpho.

Why is the P2P APY disabled?
Sometimes, the P2P APY is disabled for one of the following reasons:
The $COMP rewards are more profitable.
The borrowing cap set up by the underlying protocol has not yet been taken into account in the formal morpho model. As morpho insists on security, governance deactivated it.
The borrow function is disabled by the underlying pool.

Which chain?
Today, Morpho is deployed on Ethereum Mainnet.

How does Morpho generate revenue?
Morpho is currently not generating any revenue.
The ability to turn on protocol fees is present in Morpho's smart contract but is not activated at the moment. Governance decisions can turn it on.
Protocol fees, also called reserveFactor, include a cut of the improved P2P APY. It comes from the spread between the P2P APY andpoolSupplyRate for suppliers orpoolBorrowRate for borrowers. This fee will later be defined by governance.
Remember that protocol fee only apply to P2P matches, meaning that Morpho will not take any fee if you are not matched P2P, ensuring that you still get at least the same APY as if you were directly interacting with the underlying pool.

Is the P2P matching engine fully scalable?
Even though Morpho's matching engine requires looping the number of users, it is still scalable despite the constraints of blockchain. Indeed, Morpho's algorithm uses a finite for loop delimited by a maximum gas cost value for matching. So, if some liquidity is not matched P2P when the loop ends after reaching the maximum gas cost, whatever value remains unmatched will fall back on the pool. Hence, the full scalability of Morpho.

How do I integrate Morpho?
You've come to the right place! You will find everything you need by browsing this general documentation and the developers' documentation. If you already integrated Aave, switching to Morpho requires a few adjustments. If you still have questions after reading the docs, don't hesitate to contact us.
As a supplier, do I still have instant liquidity if I want to withdraw a large amount (e.g.,>100M$) that is matched P2P?
Morpho is as liquid as the protocol it plugs into. If sufficient liquidity exists in the underlying lending pool, you can withdraw the total amount, even if you were matched P2P. You can find more details in the Fallback mechanism and the Delta mechanism sections.
How is the P2P APY calculated?
The P2P APY is calculated as follows:
​
Where:
α is called the peer-to-peer index cursor.
and correspond to the underlying pool's Borrow and Supply rates. Morpho updates this information every time one of Morpho's functions is called by anyone or if someone directly calls the Update function.
Both parameters are defined by governance. In some edge cases, a small spread may be applied on either side due to the delta mechanism. Additionally, governance can decide to activate a small spread to accumulate funds in the reserve.
How do you minimize smart contract risks?
Learn more about our security practices here.
How COMP rewards are distributed?
Morpho is redistributing all COMP accrued to users with a pool position. If a user is matched peer-to-peer, it will receive only the interest of native APY. But, the peer to peer matching is activated only when the COMP rewards are not profitable compared to a matched position.
