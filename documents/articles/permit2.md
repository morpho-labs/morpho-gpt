Link: https://morpho.mirror.xyz/TXTvxQErigmVJKJFHCDQbiFLGYGEwHJtvTGA5KtuLkc
Title: Permit2 Articles

How Permit2 Improves the User Experience of Morpho
10 May 2023
Simon Crotty

Morpho has integrated Permit2: an open-source smart contract that enables more secure and user-friendly token approvals.

Permit2 | Morpho
Why Use Permit2
Permit2 is an immutable, unowned, and open-source contract that allows token approvals to be shared and managed across different applications to create a more unified, gas-efficient, and safer UX. It improves on current token approval methods by introducing signature-based approvals and transfers for any ERC20 token, even if it does not support EIP-2612.

Permit2 offers a range of exciting features that improves token approvals and user experience across all integrated protocols:

Permits for any token. Applications can have a single transaction flow by sending a signature along with the transaction data for any token, including those not supporting a native permit method.
Expiring approvals. Approvals can be time-bound, removing security concerns around hanging approvals on a wallet’s entire token balance. Revoking approvals does not necessarily have to be a new transaction.
Signature-based transfers. Users can bypass setting allowances entirely by releasing tokens to a permissioned spender through a one-time signature.
Batch approvals and transfers. Users can set approvals on multiple tokens or execute multiple transfers with one transaction.
Batch revoking allowances. Remove allowances on any number of tokens and spenders in one transaction.
The value of Permit2 increases as it is integrated into more protocols. This is because when users grant token allowances via Permit2, they grant them to the shared smart contract rather than a single protocol directly.

Consequently, for any protocol that has integrated Permit2, users can bypass the allowance step if they have already granted allowances via Permit2. This removes the need to send approvals for every protocol you use, saving both time and money.

Thanks to Permit2’s design, token approvals become standardized, transaction costs are reduced, and smart contract security is improved. By implementing it into the code of Morpho’s AaveV3 Optimizer, its users can benefit from its UX improvements and anticipated network effects.

How Permit2 Works
To comprehend the functionality and advantages of Permit2, it is important to have a grasp of the existing mechanisms utilized for token approvals. Dragonfly has done a fantastic explanation which is covered below.

Standard Allowance Model
Starting with the standard allowance model as prescribed in the original ERC20 standard:

Standard Allowance — Token Approvals
Standard Allowance — Token Approvals
Alice calls approve() on an ERC20 to grant a spending allowance to a contract.
Alice calls an interaction function on the contract, which in turn calls transferFrom() on the ERC20 token contract, moving her tokens.
While the traditional allowance-based mechanism works, it suffers from UX and security flaws:

Users must approve every new protocol on each token they intend to use with it and is almost always a separate transaction. This is confusing for users and leads to users sending and paying for multiple transactions even before using the protocol, wasting time and money.
In an attempt to improve the user experience, protocols ask users for maximum approvals, giving them access to a wallet’s entire token balance indefinitely. It reduces the number of transactions required but also means that if the protocol ever gets exploited, the user’s entire balance of approved tokens on the protocol is at risk.
Permit (EIP-2612) Model
EIP-2612 is an extension of ERC20 and iterates on the standard allowance mechanism to solve its issues. The new approach goes like this:

EIP-2616 — Token Approvals
EIP-2616 — Token Approvals
Alice signs an offchain “permit” message, signaling that she wishes to grant a contract an allowance to spend an EIP-2612 token.
Alice submits the signed message as part of her interaction with said contract.
The contract calls permit() on the token, which consumes the permit message and signature, granting the contract an allowance.
The contract now has an allowance so it can call transferFrom() on the token, moving tokens held by Alice.
Under the EIP-2612 model, users never have to submit separateapprove() transaction since it is bundled with the actual interaction. Just as importantly, there are no longer dangling infinite approvals since instantaneous allowance is often spent in a given transaction. Not to mention these messages can also include an expiration time on the permit.

So yes, EIP-2612 did a fantastic job of solving the UX and security issues present in the original standard allowance model. But, because EIP-2612 is an extension of the ERC20 standard, this functionality is only available for new or upgradeable tokens.

Permit2 Model
Permit2 further iterates on the token approval mechanism by introducing signature-based approvals and transfers for any ERC20 token. The approach works as follows:

Permit2 — Token Approvals
Permit2 — Token Approvals
Alice calls approve() on an ERC20 to grant an infinite allowance to the canonical Permit2 contract.
Alice signs an off-chain “permit2” message indicating that the protocol contract can transfer tokens on her behalf.
Alice calls an interaction function on the protocol contract, passing in the signed permit2 message as a parameter.
The protocol contract calls permitTransferFrom() on the Permit2 contract, which in turn uses its allowance (granted in 1.) to call transferFrom() on the ERC20 contract, moving the tokens held by Alice.
Requiring users to grant an explicit allowance may seem like a step backward. However, instead of granting it directly to the protocol, users grant it to the general Permit2 contract. This means that if a user has already granted an allowance for another protocol that uses Permit2, the other protocols can skip that step!

The Permit2 contract is used as an intermediary between a protocol and the ERC20 token. Rather than calling transferFrom() directly on the ERC20 token, a protocol calls permitTransferFrom() on the Permit2 contract. Permit2 then tracks and validates permit2 messages before using its allowance to perform the transferFrom() all directly on the ERC20 token. This allows Permit2 to provide EIP-2612 benefits for all ERC20 tokens!

Morpho Integration
Permit2 flexibility allows for its integration into various protocols in a way that aligns with their specific needs. For instance, Morpho uses a wrapper on top of Permit2. Specifically, Morpho leverages bothtransferFrom2 and simplePermit2 functions (a simplified implementation of the permit2 function) from this library.

In Morpho, the Permit2 functionality has been integrated into an if statement to provide users with flexibility in their token approval process. The code first verifies whether the user has submitted a standard allowance on the ERC20 to Morpho contracts. If the user has submitted a standard allowance, the code proceeds with the standard approval process.

However, if the user has not submitted a standard allowance, the code falls back to Permit2 token approvals. This approach enables users who prefer to use standard approvals to do so without being required to use Permit2.

Conclusion
Morpho has integrated Permit2: an open-source smart contract that enables more secure and user-friendly token approvals. It introduces innovative features such as signature-based transfers, batch approvals, and expiring approvals. As more protocols integrate with Permit2, its value to users will continue to grow.

To see how Permit2 works in practice, you can try Morpho’s AaveV3-ETH Optimizer.
