Link: https://morpho.mirror.xyz/aaUjIF85aIi5RT6-pLhVWBzuiCpOb4BV03OYNts2BHQ
Title: Introducing the AdaptiveCurveIRM: Efficient and Autonomous

Introducing the AdaptiveCurveIRM: Efficient and Autonomous
16 November 2023
Morpho

Today, we introduce the AdaptiveCurveIRM, an immutable Interest Rate Model (IRM) designed specifically for Morpho Blue.
In Morpho Blue, the interest borrowers pay is defined by an Interest Rate Model that is chosen at market creation among a governance-approved set. At launch, this set will be composed of one immutable IRM, the AdaptiveCurveIRM.
This article delves into the rationale behind this model, its benefits and explains how it operates.

Key Characteristics
- High Efficiency
The AdaptiveCurveIRM is engineered to maintain the ratio of borrowed assets over supplied assets, commonly called utilization, close to a target of 90%.
In Morpho Blue, the supply is not used as collateral. Removing this systemic risk removes the liquidity constraints imposed by liquidation needs. It enables more efficient markets with higher target utilization of capital and lower penalties for illiquidity, resulting in better rates for both lenders and borrowers.

- Complete Autonomy
As with every parameter of a Morpho Blue Market, the IRM is immutable. This means that neither governance nor market creators can fine-tune it at any given time. As such, the AdaptiveCurveIRM is designed to adapt autonomously to market conditions, including changes in interest rates on other platforms and, more broadly, any shifts in supply and demand dynamics.
Its adaptability enables it to perform effectively across any asset, market, and condition, making it highly suitable for Morpho Blue's permissionless market creation.


How it works
The model can be broken down into two complementary mechanisms:
- The Curve Mechanism
This mechanism is akin to the interest rate curve in traditional lending pools. It manages short-term utilization effectively, maintaining capital efficiency while avoiding excessively high utilization zones that could lead to liquidity issues.
A graphic is available in the article.

- The Adaptive Mechanism
This mechanism fine-tunes the curve over time to keep the range of rates in sync with market dynamics. It achieves this by adjusting the value of r90%, which in turn shifts the entire curve:
When utilization exceeds the target, the curve continuously shifts upward.
When utilization falls below the target, the curve continuously shifts downward.
The speed at which the curve adjusts is determined by the distance of current utilization to the target: the further it is, the faster the curve shifts.

This incremental adjustment of the curve allows for rate exploration, ultimately stabilizing when the interest rate at the utilization target aligns with the market equilibrium.
A paper that expands on the theoretical approach to IRMs, which guided these design choices, will be published in the upcoming weeks. For now, explore the code (available at this link: https://github.com/morpho-labs/morpho-blue-irm) and documentation (available at this link: https://www.notion.so/00ff8194791045deb522821be46abbdc?pvs=21) to learn more.
