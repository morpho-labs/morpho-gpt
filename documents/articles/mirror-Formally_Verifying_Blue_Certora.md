Link: https://morpho.mirror.xyz/pk_jXDlq-pv8TcHeN7X4-zZcYa7TLRmgv87UBCjG4i8
Title: Formally Verifying Morpho Blue with Certora

Formally Verifying Morpho Blue with Certora
21 december 2023
Morpho Labs

Led by Quentin Garchery (https://twitter.com/Q_Garchery), the formal verification of Morpho Blue involved collaboration with other companies and individuals. Morpho Labs would like to thank members of Certora (https://www.certora.com/), specifically Jochen Hoenicke (https://jochen-hoenicke.de/), and Daejun Park (https://twitter.com/daejunpark) from a16z (https://twitter.com/a16zcrypto) for their contributions.


Designed as a base layer for decentralized lending, software correctness and security are paramount for Morpho Blue.
Ensuring this involves a multi-faceted process across several phases, from pre-build to post-deployment. However, when proving the correctness of a smart contract, it is hard to find a method more rigorous and comprehensive than formal verification.
Used effectively, formal verification can help develop higher quality and, most importantly, more secure code. That is why Morpho Labs, with help from members of Certora and a16z, have invested significant time and resources into formally verifying Morpho Blue.
This article introduces formal verification, explains why it is suited to Morpho Blue, and demonstrates how it has been used to secure the protocol.
The full scope of Morpho Blue’s formal verification is available at this link: https://github.com/morpho-org/morpho-blue/tree/main/certora.

An introduction to formal verification
Formal verification (https://en.wikipedia.org/wiki/Formal_verification) is the process of using mathematical methods to prove the correctness of a smart contract by verifying that it satisfies certain properties. These properties are expressed using formal language supported by the verification tool used to prove them.
In Morpho Blue’s case, specific information was written using CVL (Certora's Verification Language: https://docs.certora.com/en/latest/docs/cvl/index.html) and was verified by the Certora prover.
Formal verification is a powerful way to evaluate code correctness because it is exhaustive. Other methods, such as unit testing (https://en.wikipedia.org/wiki/Unit_testing), are not. With tests, one can only check for correctness for specific scenarios (some inputs), while formal verification allows one to check for every scenario (all inputs).
Of course, everything has its pros and cons. Formal verification is comprehensive, but it is also resource-intensive. Its effectiveness depends heavily on the quality of the specifications. For developers, performing formal verification can be time-consuming, and it is often difficult to grasp the concepts that make it work on top of the tools and quirks that may exist.

Formally verifying Morpho Blue
Many code bases are too complex for formal verification, but Morpho Blue is well suited to it. As mentioned, the process can be time-consuming and only exaggerated by the complexity of a code base. The larger the code base, the more challenging it is to verify. Additionally, past specifications must also be updated if part of the code is upgraded.
Morpho Blue, however, is neither complex nor upgradeable. Its minimalist, immutable code base, consisting of only 600 lines of code, makes it a good fit for formal verification.
With that clarification out of the way, two examples are described in the article to demonstrate the verification performed on Morpho Blue.

Understanding the limitations
Despite the thoroughness of formal verification, it cannot guarantee absolute perfection or eliminate all potential risks associated with Morpho Blue.
Formal verification is effective within the defined scope of specifications and assumptions. Human input and interpretation, incomplete specifications, and bugs in the tools used can also impact the accuracy of results.
For more on Morpho Blue’s formal verification, visit the GitHub: https://github.com/morpho-org/morpho-blue/tree/main/certora
