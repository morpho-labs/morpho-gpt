Link: https://morpho.mirror.xyz/7mfZLV0KQpBiHF3QLHyWaQ_7gf_2_WmgMeCvqGY-kpY
Title: Morpho Blue Security Framework: Building the Most Secure Lending Protocol

By Merlin Egalite
On 12 March 2024

For the entire year of 2023, we were focused on building the most secure lending protocol in the world. The security of any protocol starts from the very first ideas and spans across the whole life of the project; in other words, it never ends. This article shares the Morpho Blue security framework so that other projects can benefit from our experience.

The framework is divided into four phases: pre-build, build & test, pre-deployment, and post-deployment. Each of these has different goals and deliverables. The article will cover each phase step-by-step, starting with the pre-build phase.

Some disclaimers before we start:
Projects’ limits are time and money. Any process can be improved with infinite money and time: more tests, security reviews, etc.
This article focuses on smart contract security only. Good OpSec from the project’s team and security at the dapp level is necessary.
This is not a guarantee of security but a recollection of the steps taken to minimize any vulnerabilities in the code base.

- Pre-Build Phase
Before writing any single line of code, we defined what we wanted to build. The development of Morpho Blue took roughly six months. While this may seem very long for a mere ~600 lines of code, it's important to consider the larger context. Morpho Blue is the fruit of long hours of debates, dozens of iterations, and proof of concepts thrown into the trash. Enter the Pre-Build Phase.

    - Conceptualizing Secure Protocol Requirements
Morpho Blue's requirements were developed from our experience building Optimizers on Decentralized Brokers (https://morpho.mirror.xyz/KCMBXBYPOE-aYvPuu5vSVzUozoO98QqZsYHvx5TYz5c) like Aave and Compound.
We realized that those platforms are riskier than they appear:
        - They have very large codebases of a few thousand lines of code.
        - Users are exposed to all assets listed on the platform.
        - Hundreds of risk parameters must be monitored and adjusted in real time.
        - They are not trustless as they are upgradeable pieces of code that can be updated by governance or operators.
At Morpho Labs, we firmly believe for decentralized finance to become the rails for the entire financial system, the base layer protocols must not have any flaws.
This led us to shape our vision of the DeFi lending space (https://morpho.mirror.xyz/hfVXz323zp9CmJ1PLDL4UhdLITGQ865VIJUyvZYyMA4) and conceptualize how Morpho Blue can become the most secure lending protocol.

    - Include the essential; externalize the rest
It is crucial to understand that each additional requirement increases the protocol attack surface. Any time one would like to add extra features, one should ask the following question: “Would users not integrate/use that protocol if we don’t include this feature?”. In general, the answer is “no,” and the requirement should be removed.
This simple process, applied systematically, allowed the design to focus only on the core features of the protocol. The ones that are truly essential to make it useful and work.
By doing so, the following features were abandoned:
        - Risk management at the protocol level increases code complexity.
        - Oracle enshrined in the protocol creates a dependency on one Oracle provider.
        - IRM enshrined in the protocol reduces flexibility and increases code complexity.
        - Oracle-less pattern: one must build an entire resistant auction system.
At Morpho Labs, we refer a lot to minimalism as a guideline for designing and writing smart contracts. We encourage other projects to embrace this approach.

    - Threat Modeling and Open Debates
One can (and should) apply threat modeling to their project. The goal is to raise any concerns about almost every component or stakeholder of the project. Even though we don’t use this specific framework (https://composable-security.com/blog/threat-modeling-for-smart-contracts-best-step-by-step-guide/), its worth a read.
The Morpho Labs’ way of identifying threats is less processed but still highly efficient; we’ve built a culture where anyone can (and is pushed to) challenge things and put decisions into question. This fosters open debates and discussions within the company.
While this appears time-consuming during ideation, it ultimately saves time by finding the best — and usually the simplest — solutions. We recommend that founders and managers create space for team members to express their voices and concerns.


- Build & Test Phase
During the pre-build phase, we built several different POCs and iterations, which made the specification clearer and cleaner. At this point, the direction was clear and it was time to start building the protocol.
Below are the numerous ways we use to catch bugs early.

    - Unit and Integration Tests
Of course, we used unit tests (https://en.wikipedia.org/wiki/Unit_testing) and integration tests (https://en.wikipedia.org/wiki/Integration_testing). Unit tests are very easy to set up and catch most of the bugs one can face. It's impossible to release code that hasn't been thoroughly tested.
We aimed to cover all branches of the code. To do so, we used the forge coverage feature of Foundry. But this alone does not ensure the code is fully tested because of the limits of the tool; some branches are marked as covered while all scenarios are not. To help ensure that all scenarios are covered, one can use the Branching Tree Technique (BTT) (https://twitter.com/PaulRBerg/status/1682346315806539776) method to list them. One can also search for missing tests using mutation tools such as vertigo-rs (https://github.com/RareSkills/vertigo-rs) or gambit (https://github.com/Certora/gambit) from Certora.
Mutation tools (https://en.wikipedia.org/wiki/Mutation_testing) are tools that change some part of the existing code to create a “mutant” and apply the testing suite to it. If tests succeed, it means that some tests are missing.
Writing integration tests is crucial, especially when the codebase depends on external third parties. These tests ensure that the contracts will behave as expected in production.
One can mock the third-party dependencies to make the tests run faster, but we use a fork instead, as some unexpected edge cases can be caught early. For instance, non-compliant tokens such as USDT do not return a boolean on transfer, others take a fee on transfer, etc. Should edge cases be covered? If yes, have the correct adaptations been applied? Otherwise, one must be aware of that and mention the assumptions in the documentation. For instance, here (https://github.com/morpho-org/morpho-blue/blob/55d2d99304fb3fb930c688462ae2ccabb1d533ad/src/interfaces/IMorpho.sol#L104-L128) is an example of Morpho Blue’s assumptions on markets.

    - Fuzzing
We complement tests with fuzzing (https://en.wikipedia.org/wiki/Fuzzing) to cover large input ranges and catch edge cases. It’s very easy to set up using Foundry (https://book.getfoundry.sh/). Not using fuzzing would be a terrible mistake before releasing a protocol.
Just fuzz.

    - Internal Reviews
We have 2 teams at Morpho Labs: the protocol team and the integration team (https://morpho.mirror.xyz/JbwrR3XGukfx60kVnCoRc2Dhl8b2xjRHb-tCeTm8j0g). The protocol team handles both the research related to the protocol and the coding part. The integration team, on the other hand, reviews and enhances the protocol and works on improving the testing suite.
No matter how strong a team is, there are always some flaws, bugs, or inefficiencies in the code. Having an independent team early on to review the code of the team headed down with fresh new eyes is very underestimated.
In any case, we always have ALL the solidity developers reviewing ALL the smart contracts that will be deployed. This ensures that everyone fully knows the live codebases, and we don’t create a single point of failure (one person who owns all the knowledge).
Again, documenting every design choice and research is a good practice to avoid creating a single point of failure. This is also necessary to share knowledge efficiently, onboard new hires, or remind ourselves of previous decisions (useful for debates).

    - Advisors/VC Researchers Peer-Reviews
Once the codebase is quite stable, we invited external advisors and security researchers from VC firms or some advisors to conduct external security reviews. Note that advisors and researchers are already helping us during the protocol design.
Similarly, this added another layer of external eyes looking at the code, criticizing things, and making the codebase even more secure.

    - Invariants and Formal Verification with Certora
In addition to unit/integration tests and fuzzing, we completed invariant testing (https://book.getfoundry.sh/forge/invariant-testing) using Foundry and formal verification using Certora’s Prover. On the latter, we highly recommend reading our article on Formally Verifying Morpho Blue with Certora (https://morpho.mirror.xyz/pk_jXDlq-pv8TcHeN7X4-zZcYa7TLRmgv87UBCjG4i8), which dives into this topic.
As a TL;DR
Formal verification (https://en.wikipedia.org/wiki/Formal_verification) is the process of using mathematical methods to prove the correctness of a smart contract by verifying that it satisfies certain properties. These properties are expressed using formal language supported by the verification tool used to prove them
One can check the rules written by Quentin in its dedicated folder (https://github.com/morpho-org/morpho-blue/tree/main/certora) in Morpho Blue’s repository.
Invariant testing can be seen as a weaker version of formal verification. However, it’s faster to set up and does not require strong knowledge of formal verification. What is required is the invariants of the protocol. For instance, in Morpho Blue, an invariant is that for a specific loan asset, the amount borrowed plus the balance of the protocol must be greater than or equal to the amount supplied (see here https://github.com/morpho-org/morpho-blue/blob/55d2d99304fb3fb930c688462ae2ccabb1d533ad/test/forge/invariant/MorphoInvariantTest.sol#L388-L396).
We do both since bugs can be caught earlier with invariant testing.
As performing formal verification of a protocol is a never-ending process, this workshop usually lasts even after the protocol deployment.

    - Bootcamp to break the code
For each new protocol, we do a bootcamp (best moment of the year at Morpho Labs). We gather the whole team in a very nice place in France for a few weeks. It’s a try-hard and very intense moment where the team energy reaches a local maximum. The goals are clear:
        - Ensure that everyone shares the protocol’s vision.
        - Ensure that every team is prepared for the launch.
        - BREAK the code.
We, therefore, spend a few weeks refining the code, trying to break it, improving the testing suite, removing the useless features, and debating the very smallest details.
After the bootcamp, the code is ready for external security reviews.


- Pre-Deployment Phase

    - Tier 1 Security Reviews
Before doing a security contest, we partnered with two tier 1 security companies (Open Zeppelin and Spearbit via Cantina) for Morpho Blue. The goals were:
        - Find the major holes in the project.
        - Receive feedback on design choices.
Security reviews usually take more time compared to contests, so the security team can go into the protocol details, especially when some maths is involved. It allowed us to clean and refine the codebases and double down our research on specific aspects of the protocol.
Depending on timelines, the best is to have the security reviews sequentially. Unfortunately, that’s not always possible, as it can postpone the deployment of a protocol by several months.
All security reviews done on Morpho Blue can be found here: https://docs.morpho.org/concepts/morpho-blue/security/audits.
   
        - A few things to keep in mind:
            - Security reviews must be planned in advance, especially in bull markets where most security firms are overbooked.
            Timing security reviews is hard. However, it's crucial for the project team to ensure they’re ready when the audit starts. This includes having tests written and a minimum amount of documentation available to assist security researchers. The team must not wait until the last minute, it’s too late.
            - As a general rule, the project team should not underestimate the time to conduct fixes. It’s better to understand the issues thoroughly than to rush the fixes.
            - Security reviews can be stressful and exhausting for the team.
            - During security reviews, the team must be available to answer security researchers’ questions. It speeds up their understanding of the codebase so they can focus on catching bugs.
            - No number of security reviews is enough.

    - $200k Cantina Competition
Once fixes are applied following the security reviews, it is time for the contest. One can see a Security Contest like a giant human fuzzer to spot bugs.
Again, we’ve partnered with Cantina for several reasons: we know the team well and were confident they would create an awesome platform for security researchers; plus, we were the first project to offer a public Cantina Contest.
Some advice to maximize the efficiency of a contest:
        - The pot must be high enough to make sure the best security researchers will look at the code.
        - Try to find a moment when no other large project is performing a significant competition.
We were fortunate to tick the two requirements and have highly skilled security researchers looking at Morpho Blue’s code and its periphery contracts.

    - Preparing Incident Response Plans
We’ve been working on Incident Response Plans in parallel with the contest. Incident Response Plans are playbooks that should be easy to follow to respond quickly in an emergency. Since we’ve already thought about it, we’ll earn time and brain bandwidth by following the playbook.
This is where threat modeling can be useful; one can adapt IRPs to already identified specific scenarios. Nascent’s crisis handbook (https://docs.google.com/document/d/1DaAiuGFkMEMMiIuvqhePL5aDFGHJ9Ya6D04rdaldqC0/edit#heading=h.embadytm1p7r) is a good resource for creating IRPs.
We also have a partnership with Chainalysis (https://x.com/MorphoLabs/status/1645788874592112644?s=20); when a theft, breach, or exploit, including an unauthorized transfer of funds, happens, the Chainalysis Crypto Incident Response Service will be immediately engaged to monitor and trace transactions supporting asset recovery.

    - $100k Pre-Deployment Bounty with Hats Finance
Once the fixes following the Contest have been applied, we’ve asked security researchers who did the previous security reviews to have a last look at the changes.
Now, there’s a period during which the protocol has not been deployed yet, but the code is frozen and public. Why not incentivize security researchers who do not have the time to look at the code to find a high/critical bug in the codebase? This is why we’ve partnered with Hats Finance to create a $100k pre-deployment bounty.


- Post Deployment
Morpho Blue has been launched. Now, we cannot go back to the past. The best thing to do for an immutable contract is to offer a bounty and closely monitor contracts.

    - Monitoring
Monitoring contracts is very important. Internally, we’ve built our own bots that perform continuous invariant checks on each market after each transaction. If something is broken, an alarm is raised so we can quickly react and follow the relevant IRP we already designed.
We could have added circuit breakers to the protocol. However, we believe that protocols should remain immutable and governance minimized. Otherwise, we’re just rebuilding web2 platforms on web3 infrastructures, which contradicts DeFi’s promises.

    - $500k Bug Bounty
Offering a bounty for Security Researchers might be the most important thing to do once a protocol has been deployed. This is the only way one can incentivize talented people not to hack a protocol. Otherwise, one is just betting that everyone is kind and nice (which is not reasonable).
The bug bounty for Morpho Blue and its periphery contracts will be released very soon.


- Final words
Now you know everything about the security process we used for Morpho Blue. We invested a significant amount of time and money for one single protocol, though it makes sense for a protocol that is designed to handle trillions of dollars.
While there are many possibilities for improvement, we hope this will help other projects enhance their security practices.
For the future, we have some ideas we’d like to explore, among them:
    - Use security researchers as advisors early in the process.
    - Do in the following order; a small audit before the code is ready to receive early feedback, then an external security review when the code is completed, then a contest, then again an external security review.
    - Do a CTF in production as Yearn did.
Do not hesitate to share your ideas and best practices with us as well!