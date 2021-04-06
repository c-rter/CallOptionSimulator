<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Call Option Simulator
</h1>

This simulator is intended to assist in learning the call option financial derivative.

Generate custom charts to see how a call option's premium changes over various scenarios and parameters.

Charts are generated based on normal distribution and options priced with the Black-Scholes-Merton model.

## 🚀 Stack

**Main Technologies:**

Javascript  
React/GatsbyJS  
D3

**NPM Packages Used:**

React-bootstrap  
React-bootstrap-icons  
React-bootstrap-range-slider  

**Other:**

JS Normal Distribution function via T. Ferguson UCLA Math  
D3.js Graph Gallery Connected Scatterplot via Y. Holtz

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
