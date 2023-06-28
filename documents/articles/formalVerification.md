Link: https://morpho.mirror.xyz/dvNInOdOHsWpFi0FHeNI3Zk2qOP2paQWa-D9i7mdhrY
Title: Formal Verification Article

Formal Verification: Using Mathematics to Ensure Resilient Code
24 Mar 2023
Simon Crotty

Security is the first and fundamental core principle for software development at Morpho Labs. Software correctness and security are paramount and no measure should compromise this principle.

formal verification
But how do we ensure this? There are several vital aspects for developing secure code, including understanding threats, secure design principles, code quality, testing and verification, and secure deployments.

Of these, formal verification is a technique extensively used by Morpho Labs but is underutilized by DeFi projects. This article will dive into formal verification, exploring what it is and how it is used to build resilient code.

What is Formal Verification?
Formal verification is a technique used to verify the correctness of a computer program mathematically and, alongside testing, is used as an additional method of ensuring code is executing as designed. It involves analyzing a smart contract's code and designing specifications to prove its intended requirements are met.

A specification is a formal description of the desired behavior of a program. It typically includes a set of properties or requirements the system must satisfy, expressed in precise and unambiguous mathematical formulas. The purpose of a specification is to provide a clear and complete description of the smart contract's intended behavior, which can be proved using formal verification tools.

A program is only verified with respect to a particular specification. So, getting specifications right is crucial, as any inaccuracies can lead to false proofs and leave vulnerabilities in the code. For example, if a transfer specifies that the receiver's balance is increasing but omits the sender's balance is decreasing, an insecure transfer function that does not remove funds from the sender would still meet the specification.

How does Formal Verification differ from regular testing?
Regular testing of computer programs involves running test cases through trial and error, verifying the program's behavior against the expected output. While testing can uncover many inaccuracies, testing every possible input and output of a complex program or smart contract is not always possible.

Formal verification, on the other hand, is a more rigorous approach that mathematically proves the correctness of a program. Formal verification tools usually provide a high-level specification language, making the specification easier to express and understand.

Proving specifications creates a higher degree of confidence that a program behaves as expected, even for inputs that have not been tested. For example, specifying that the balance associated with each address is less than the total supply can be proved using formal verification, but it would not be possible to test that statement for every possible address.

Benefits of Formal Verification
Increased Confidence: Formal verification provides a higher level of confidence that a smart contract is executing correctly by mathematically proving that a program meets its intended requirements.
Improved Security: Formal verification can help improve the security of a program by detecting vulnerabilities that attackers may exploit. It can also help ensure that the program behaves correctly despite malicious inputs.
Drawbacks of Formal Verification
Complexity: Formal verification requires a deep understanding of mathematical concepts, which can be challenging without the right capabilities — it requires a high level of expertise, and the process can be time-consuming, making it difficult to implement consistently.
Scalability: Formal verification can be costly in terms of time and resources, making it challenging to apply to large, complex code bases. As the code size increases, the complexity of the formal models also increases, making the verification process more intricate and resource intensive.
Inflexible: Formal verification is difficult to update alongside the code. Verification tools try to mitigate this constraint with automation, modularity, or certification, but it is not guaranteed to work.
Formal Verification Tools
There are several extremely helpful tools available for formal verifications. At Morpho Labs, we use Certora and Why3.

In short, both tools verify the correctness of smart contracts by translating a contract's source code into a set of logical formulas that an automated theorem prover can check. If the theorem prover is successful (the logical statements are true), it generates a proof that the program is correct.

However, suppose the theorem prover cannot prove the program's correctness. It generates a counterexample: a scenario that violates the program's specification and can be used to identify the source of the error.

It's worth noting Certora was built explicitly to target the EVM and can natively verify related code. Whereas Why3 is working on the source code level, making it very efficient, but does not target smart contracts specifically — users must translate the source code into WhyML language. The design characteristics lead to pros and cons for both tools, which we won't cover here, but it is why Morpho Labs uses more than one tool!

How Morpho Labs uses Formal Verification
Let's run through a couple of formal verification examples using Morpho's code.

Case 1: Proving user cannot claim their rewards more than once

This example verifies when an account that successfully claimed an amount of MORPHO rewards uses the claim function again with the same parameters, it reverts. The specification is below:

Specification
Case 1: Specification
Using Certora, the specification is run through an automated theorem prover to get the outcome: proved! No user can claim Morpho rewards more than once.

instadapp dashboard
Case 1: Outcome proved using Certora
Case 2: Morpho's position on the underlying pool cannot be liquidated under appropriate conditions.

Assuming Morpho is equipped with a working liquidation system, the supply deposited on the pool (multiplied by the liquidation threshold), is enough to collateralize the amount borrowed from the pool. Here is the specification:

instadapp dashboard
Case 2: Specification
Using Why3's automated prover, we get the result: proved! The full description of this theorem and its proof can be found in the Yellow Paper.

instadapp dashboard
Case 2: Outcome proved using Why3
Conclusion
Formal verification is a powerful technique for verifying the correctness of smart contracts and ensuring their security. While it requires a significant investment of time and resources, the benefits of formal verification make it an attractive option for safety-critical code in DeFi applications where system resiliency is of utmost importance.
