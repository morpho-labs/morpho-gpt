Link: https://github.com/morpho-org/morpho-aave-v3-sdk/blob/main/README.md
Title: SDK Github

# Morpho's AaveV3-ETH Optimizer SDK

This repository contains the core typescript features used to build a dapp based on [Morpho-AaveV3 smart contracts](https://github.com/morpho-org/morpho-aave-v3).

> **Warning**  
> This package is used by the morpho association to build the [morpho-aaveV3 dapp](https://aave-v3.morpho.org) but is still **under development** and subject to changes.  
> **Use at your own risk**. Any feedback is welcome.

## Installation

You need to use a node version >= `18.0.0`

```bash
npm install @morpho-org/morpho-aave-v3-sdk
```

```bash
yarn add @morpho-org/morpho-aave-v3-sdk
```

## Configuration

At the root of your dapp or your script:

```ts
/* _app.ts */
import sdk from "@morpho-org/morpho-aave-v3-sdk/configuration";

sdk.setConfiguration(config);
```

where `config` is an object with the following optional properties:

| property               | type                                 | default                    | description                                                                                                                                |
| ---------------------- | ------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `isProd`               | `boolean`                            | `false`                    | _Set to `true` if the dapp is running in production_                                                                                       |
| `defaultProvider`      | `string`                             | `process.env.RPC_URL`      | _The default provider to use. It fallbacks on the default provider from `ethers`_                                                          |
| `defaultMaxIterations` | `{ supply: number; borrow: number }` | `{ supply: 4, borrow: 4 }` | _Max number of iterations run by the [matching engine](https://docs.morpho.org/concepts-overview/advanced-concepts/matching-engine)_       |
| `gasLimitPercent`      | `ethers.BigNumber`                   | `11000 (110%)`             | _Percentage of the gas estimation used as the gas limit for transactions (with 4 decimals)_                                                |
| `percentApproximation` | `ethers.BigNumber`                   | `9900 (99%)`               | _Scaling applied to transactions' amount to prevent reverting due to block inclusion delay_                                                |
| `txSignature`          | `string`                             | `undefined`                | _If provided, the signature will be appended to the transaction's data to identify the transaction's origin. **It must be in hex format**_ |

## Usage

The whole sdk is built around the `MorphoAaveV3Adapter` class. This is the core element of the sdk.

### Data structure

Within the adapter, data are stored in different objects:

| name                  | public\* | source      | interface                                                             | description                                                              |
| --------------------- | -------- | ----------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| globalData            |   ✅ yes | ⚡️ fetched | [GlobalData](src/types/common.ts#L7)                                  | _Global data about the chain and the protocol_                           |
| marketsConfigs        |   ✅ yes | ⚡️ fetched | `MarketMapping<`[`MarketConfig`](src/types/markets.ts#L86)`>`         | _Properties of each market that don't (or rarely) change_                |
| marketsData           |   ✅ yes | ⚙️ computed | `MarketMapping<`[`MarketData`](src/types/markets.ts#L296)`>`          | _Data by market (metrics, apys, ...) that need to be updated frequently_ |
| marketsList           |   ✅ yes | ⚡️ fetched | `string[]`                                                            | _List of the markets listed on Morpho-AaveV3_                            |
| userData              |   ✅ yes | ⚙️ computed | [`UserData`](src/types/user.ts#L6)                                    | _User Data that are not specific to a market_                            |
| userMarketsData       |   ✅ yes | ⚙️ computed | `MarketMapping<`[`UserMarketData`](src/types/user.ts#L262)`>`         | _User Data by market_                                                    |
| scaledMarketsData     |   ❌ no  | ⚡️ fetched | `MarketMapping<`[`ScaledMarketData`](src/types/markets.ts#L182)`>`    | _Raw data by market, before any processing or computation_               |
| scaledUserMarketsData |   ❌ no  | ⚡️ fetched | `MarketMapping<`[`ScaledUserMarketData`](src/types/user.ts#L184)`>`   | _Raw user data by market, before any processing or computation_          |
| rewardsDistribution   |   ❌ no  | ⚡️ fetched | [`MorphoEpochDistribution`](src/helpers/rewards/rewards.types.ts#L66) | _Morpho rewards distribution of the current epoch_                       |

_\* see [the section about data](#read-data) to see how to access public data_

### Initialization

To create an adapter, you must provide _fetchers_. These are special entities that are used to fetch [data](#data-structure). For each fetcher, you can use one from this fetchers or use your own one (as long as it matches the interface). You have 5 different fetchers:

| fetcher                                                      | fetched data                                         | available                                                                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [MarketFetcher](src/fetchers/fetchers.interfaces.ts#L20)     | `marketsConfigs`, `marketsList`, `scaledMarketsData` | [chain](src/fetchers/Chain/ChainMarketFetcher.ts), [static](src/fetchers/Static/StaticMarketFetcher.ts)         |
| [UserFetcher](src/fetchers/fetchers.interfaces.ts#L35)       | `scaledUserMarketsData`, `userData.ethBalance`       | [chain](src/fetchers/Chain/ChainUserFetcher.ts), [static](src/fetchers/Static/StaticUserFetcher.ts)             |
| [GlobalDataFetcher](src/fetchers/fetchers.interfaces.ts#L48) | `globalData`                                         | [chain](src/fetchers/Chain/ChainGlobalDataFetcher.ts), [static](src/fetchers/Static/StaticGlobalDataFetcher.ts) |
| [RewardsFetcher](src/fetchers/fetchers.interfaces.ts#L62)    | `rewardsDistribution`                                | [api](src/fetchers/Api/ApiRewardsFetcher.ts), [static](src/fetchers/Static/StaticRewardsFetcher.ts)             |

#### From chain

If you want to fetch all data from the chain, you can use `MorphoAaveV3Adapter.fromChain`

```ts
const adapter = MorphoAaveV3Adapter.fromChain();
```

- you can provide a specific `provider` from `ethers` to use:

```ts
const adapter = MorphoAaveV3Adapter.fromChain({ provider: myProvider });
await adapter.refreshAll("latest");
```

by default, the one from the [configuration](#configuration) will be used

- Since some data can't be fetched from chain, you can provide specific fetcher for them:

```ts
const adapter = MorphoAaveV3Adapter.fromChain({ extraFetchersConfig });
await adapter.refreshAll("latest");
```

where `extraFetchersConfig` has the following interface:

```ts
const extraFetchersConfig: {
  rewards?: "api" | RewardsFetcher;
};
```

By default,

- `marketSupply` will be fetched from the morpho-labs subgraph
- `rewards` will be fetched from morpho API

#### From mock

You can also provide static data to the adapter to have a static state in the adapter using `MorphoAaveV3Adapter.fromMock`

```ts
const adapter = MorphoAaveV3Adapter.fromMock(mock);
await adapter.refreshAll("latest");
```

Where `mock` can be an [`AdapterMock`](src/mocks/index.ts#L18). If no mock is provided, [this one](src/mocks/mock1.ts#L119) will be used

> **Note**  
> You can provide loading delays to the `fromMock` function for testing purposes to simulate real conditions

### Read Data

#### RxJs

The sdk leverages on [RxJS](https://rxjs.dev) to allow you to build highly reactive apps out of the box.
To do so, every public data (see [Data structure](#data-structure)) are associated with an rxjs `Subject`:

```ts
const adapter = MorphoAaveV3Adapter.fromChain();
await adapter.refreshAll("latest");

adapter.marketsConfigs$.subscribe((marketsConfigs) => ...);
adapter.marketsData$.subscribe((marketsData) => ...);
adapter.userMarketsData$.subscribe((userMarketsData) => ...);
adapter.marketsList$.subscribe((marketsList) => ...);
adapter.userData$.subscribe((userData) => ...);
adapter.globalData$.subscribe((globalData) => ...);
```

#### Getters

If you don't use RxJs, you can access these data using getter functions:

```ts
const adapter = MorphoAaveV3Adapter.fromChain();
await adapter.refreshAll("latest");

const marketsConfigs = adapter.getMarketsConfigs();
const marketsData = adapter.getMarketsData();
const userMarketsData = adapter.getUserMarketsData();
const marketsList = adapter.getMarketsList();
const userData = adapter.getUserData();
const globalData = adapter.getGlobalData();
```

### Execute a transaction

#### Notifications

To keep track of what's happening during the transactions' executions, the adapter can be provided with a `notifier`

```ts
adapter.addNotifier(notifier); // Adds `notifier` to the list of the adapter's notifiers.
adapter.removeNotifier(notifier); // Removes `notifier` from the list of adapter's notifiers. It needs to be the same object (reference) as the one that has been added
adapter.resetNotifiers(); // Removes all the notifiers and return them in an array.
```

A notifier can be any instance/object matching the [`ITransactionNotifier`](src/txHandler/notifiers/TransactionNotifier.interface.ts) interface.

The handlers are called according to the following timeline:

![transaction flow](doc/ressources/tx-flow.excalidraw.svg)

#### Transactions with Morpho-AaveV3 contract

```ts
adapter.handleMorphoTransaction(txType, underlyingAddress, amount, options);
```

with

| Param               | Type                                                   | Description                                                                            |
| ------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `txType`            | [`TransactionType`](src/types/tx.ts#L34)               | Type of the operation to perfom                                                        |
| `underlyingAddress` | `string`                                               | Address of the underlying market on which to perform the operation                     |
| `amount`            | `ethers.BigNumber`                                     | Amount of the transaction. Use `ethers.constants.MaxUint256` to use the maximum amount |
| `options`           | _optional_, [`TransactionOptions`](src/types/tx.ts#L8) | Transaction options                                                                    |

#### Approval

Morpho-AaveV3 leverages the [Permit2 Approval]() feature, but you can still perform classic approvals.

##### Permit2

```ts
adapter.handlePermit2Approval(underlyingAddress, deadline, amount, options);
```

| Param               | Type                                                                                  | Description                                           |
| ------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `underlyingAddress` | `string`                                                                              | Address of the underlying token you wanna provide     |
| `deadline`          | `ethers.BigNumber`                                                                    | Deadline after which the approval isn't valid anymore |
| `amount`            | `ethers.BigNumber`                                                                    | Amount to approve                                     |
| `options`           | _optional_, [`ApprovalHandlerOptions`](src/txHandler/ApprovalHandler.interface.ts#L5) | Transaction options                                   |

##### Classic

```ts
adapter.handleApproval(underlyingAddress, amount, options);
```

| Param               | Type                                                                                  | Description                                       |
| ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `underlyingAddress` | `string`                                                                              | Address of the underlying token you wanna provide |
| `amount`            | `ethers.BigNumber`                                                                    | Amount to approve                                 |
| `options`           | _optional_, [`ApprovalHandlerOptions`](src/txHandler/ApprovalHandler.interface.ts#L5) | Transaction options                               |

#### Claim Morpho rewards

```ts
adapter.handleClaimMorpho({ overrides });
```

#### Wrap ETH

```ts
adapter.handleWrapEth(amount, { overrides });
```

With `amount` being of type `ethers.BigNumber`

#### Connection

- Connect a user to the adapter:

```ts
adapter.connect(user, signer); // Data will be fetched for `user` and `signer` will be used for transactions
```

```ts
// in read-only

adapter.connect(user); // Data will be fetched for `user` but transactions will be ignored
```

- Disconnect connected user:

```ts
adapter.disconnect();
```

- Get the connection state:

```ts
adapter.isConnected();
```

#### Refreshing

##### `refreshAll`

```ts
adapter.refreshAll("latest");
```

All the data will be refreshed.

> **Note**
> If the block is undefined, the data will be fetched at the last fetched block. If `refreshAll` is called for the first time, the data will be fetched at the block "latest"

##### `refreshData`

```ts
adapter.refreshData();
```

Fetch a new block from the chain and update all indexes locally without fetching markets data
If the block is not a new block, the update will be ignored.

##### `refetchData`

```ts
adapter.refetchData();
```

Refetch the data from the chain and recompute computed data.

> **Note**
> Only `globalData`, `scaledMarketsData`, `scaledUserMarketsData` and `rewardsDistribution` will be refetched since the others are not likely to change between two blocks

#### Max capacity

You can use `getUserMaxCapacity` to get the maximum amount for a given operation on a given market.

```ts
const { amount, limiter } = adapter.getUserMaxCapacity(
  underlyingAddress,
  txType
);
```

The maximum `amount` is given in underlying and the `limiter` is one of the following (see [MaxCapacityLimiter](src/types/common.ts#L74))

```ts
"LIMITED_BY_WALLET_BALANCE"; // The user can't supply/repay more than his wallet balance
"LIMITED_BY_OPERATION_PAUSED"; // The required operation is paused
"LIMITED_BY_ZERO_PRICE"; // The amount can't be estimated because the fetched price for the given market is zero
"LIMITED_BY_BORROW_CAPACITY"; // The user can't borrow more than his borrow capacity
"LIMITED_BY_POOL_LIQUIDITY"; // The amount is limited by AaveV3 liquidity
"LIMITED_BY_CAP"; // There is a borrow/supply cap on AaveV3 and it limits the operation
"LIMITED_BY_BALANCE"; // The user can't withdraw/repay more than his current balance on Morpho
```

### Simulation

The adapter provides a simulation tool that allows you to simulate the impact of a transaction on its data.

```ts
const simulator = adapter.getSimulator(timeout);
```

with `timeout` being the minimum delay (in ms) between two refresh. Explicitly set to `O` to prevent it from refreshing. The default value is `1000` (1s)

#### Data structure

The simulator has the same data structure as the adapter. See [Data Structure](#data-structure) for more details.

> **Note**
> Since the adapter's values are evolving, the simulator will re-run the simulation on the new values when they change.

#### Simulate

```ts
simulator.simulate([
  {
    type,
    amount,
    underlyingAddress
  },
  ...
]);
```

#### Reset

Run `simulator.reset()` reset the operation list.

> **Note**
> This is equivalent to `simulator.simulate([])`

#### Close

When you don't need the simulator anymore, run `simulator.close()` to free the memory.

> **Warning**
> Not closing simulators can lead to big performance issues
