Link: https://docs.morpho.org/concepts-overview/advanced-concepts/matching-engine
Title: Matching Engine

P2P positions on Morpho benefit from a 100% utilization rate, meaning there is as much supply as borrow demand in terms of volume matched. This is a crucial difference from other lending protocols based on a pool with much more loanable liquidity than borrow demand. With such a difference, low utilization rates of the pool are induced and thus create an APY spread.
Most of the time, there may be an imbalance between supply and demand. For example, one can imagine that there is $10M supplied on Morpho, trying to match the $6M of borrowing volume (or vice-versa). The protocol needs to select suppliers cumulating $6M to enjoy the P2P APY while the others, cumulating $4M, will be forwarded to the pool. The module in the code responsible for choosing and matching the liquidity of the users is called the matching engine.
The main parameters at the heart of the matching engine are:
Economic Efficiency: Maximize matched volumes.
Gas Efficiency: Minimize gas and avoid dust problems.
Simplicity: A passive user or contract should be able to benefit from Morpho simply by supplying/borrowing.
Fairness: The use of Morpho should benefit as much liquidity as possible, regardless of the user.
Morpho could be using a queueing model where the first lender to come in would be the first matched. Yet, an adversary could be supplying $0.1 with a million different accounts. In that configuration, if a borrower comes in, he would use a lot of gas to match his liquidity with those small amounts.
Morpho's matching engine thus uses an on-chain priority queue. It sorts users by descending volume and uses a finite for loop to pair lenders and borrowers together. However, doing so without guardrails could be highly costly in gas. This is why a predefined maximum gas cost defined by governance exists. It is called the maxGasForMatching. If that maximum is reached, the remaining unmatched liquidity falls back on the underlying pool, ensuring that P2P matching remains economically sound while guaranteeing that the user will at least get the same APY as if he was in the pool.

Let's take an example.
Bob is the largest lender with $50M in liquidity. For gas efficiency purposes, borrowers will first be matched with Bob. This will limit the number of iterations necessary to reach borrowers since most will be immediately matched with Bob, thus limiting gas costs. Borrowers will be matched with the second-biggest lender once all of Bob's liquidity has been paired.
Now, Alice comes in and needs to borrow $80M. For simplicity's sake, let's say there is $150M available to borrow from amongst 101 lenders. There's Bob with $50M and then 100 other lenders with $1M each.
Alice will be matched with Bob's $50M in the first iteration, and each subsequent iteration will be checked for one additional million. After 11 iterations, the gas limit of maxGasForMatching is reached. Out of Alice's $80M, $60M (=$50M + 10 x $1M) have been matched P2P, and the remaining $20M falls back on the underlying pool. Alice's average APY will be between the full P2P APY and the underlying pool's APY.
One might think that efficiency gains are skewed to a small club of suppliers that get matched. This is not quite the case. The contention is that the way the interest rate market in DeFi works at the moment disincentivizes the demand for liquidity on the borrowing side. With Morpho in place, more borrowers show up, and the entire market benefits.
Morpho's capital efficiency scales with the blockchain it is deployed on. The more throughput is enabled, the bigger the maxGasForMatching parameter can be; thus, more matches can be done.
