# AsyncAwait

## Accumalators
Accumalator bets are a popular product around the world! You can increase your odds by betting on two things happening.
When you do this, the odds are multiplied together 
E.G.
- England win vs. France, odds of 2
- England win vs. Germany, odds of 3
- Total odds, 6

## Validation
When a user places a bet on an outcome, we need to do the following tasks before we can accept the bet
- Decided whether or not the user is able to bet (they might have no money!)
- Get the odds for each outcome
- Decide whether the business is happy to accept each odd individually (the risk)
- Calculate the accumalator odds
- Decide whether the business is happy to accept the accumalated odds (the total risk)

This requires multiple calls to various services; each has a latency. We want to minimise this latency.

## Task
- We have somee sample code in `ValidatorBuilder.ts`.
- We have a test suite in `Validator.spec.ts`. All the tests pass.
- We have some mock services in `API.ts`. Each service has a mock latency.
    - You may not modify the `API.ts`. Think of them as an external provider.
- You must reduce the latency to as low as possible. `Node.js` is an ideal langauge for this task!
    - Start off by extimating how long each test will take to run. Can you predict it?

