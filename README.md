<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<h1 align="left">
  Call Option Simulator
</h1>
<h2>by Carter Lawson at SUPERMAPLE.systems</h2>

This simulator is designed to assist in learning call options.

Generate custom charts to see how a call option's premium changes over various scenarios and parameters.

Charts are generated based on normal distribution and options priced with the Black-Scholes-Merton model.

## 🚀 Stack

**Main Technologies:**

Javascript  
React/GatsbyJS/Gatsby Cloud    
D3

**NPM Packages Used:**

React-bootstrap  
React-bootstrap-icons  
React-bootstrap-range-slider  

**Other:**

JS Normal Distribution function via T. Ferguson UCLA Math  
D3.js Graph Gallery Connected Scatterplot via Y. Holtz

## 🎓 What is a Call Option Contract?


              A call option contract gives a purchaser the right to buy a set
              amount of shares at a predetermined price. A standard stock option
              contract covers 100 shares. It is important to note that
              exercising the contract is a right, but not an obligation for the
              call holder.

              All call contracts have two main features, a strike price and an
              expiration date.

## 🎓 Strike Price

              The strike price is the fixed price at which a contract can be
              exercised. For a call option, the stock price must reach or
              surpass the strike price in order for the contract to be worthy of
              exercising. Otherwise, exercising the contract would mean
              purchasing shares for more than you can buy them for on the open
              market. For example, a contract could allow the purchaser to buy
              100 shares at a strike price of $105. If the stock price moves to
              $106, exercising the contract to buy at the lower strike price
              would lead to a $1 profit on every share purchased.

## 🧐 About Chart Generation

The simulation (tools/simGraph.js) generates a normal distribution
of price movement relative to the volatility input. Daily SD (standard deviation) is calculated, then an
RNG roll is conducted for a percentage of the daily SD. A multiplier is applied to the daily SD based on another RNG roll
for a normal distribution of "types" of movement days (enabling days where movement surpasses the first deviation). 

Changes to the "Luck" parameter affects price movements that fall within the 1st deviation to be all positive
or all negative (68%). As this does not affect 2nd+ deviation movement days, a simulation with "good" luck still
has a slim chance of trending downward. Repeated simulation with selected luck influence should generate desired result.

## 🎓 Disclaimer

This model is for learning purposes only and is not intended to be financial advice.
Though it mimics the realistic movement of option prices, actual market prices will vary,
transaction fees will apply, and option prices will be further affected by changes in implied volatility
(this model uses consistent IV throughout projections)

<!-- AUTO-GENERATED-CONTENT:END -->
