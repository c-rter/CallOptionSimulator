import React, { useContext } from "react"
import { StateContext } from "../providers/StateProvider"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { interpolateRgbBasis } from "d3-interpolate"

const Learn = () => {
  const { message, setMessage } = useContext(StateContext)
  const hStyle = {
    /* border: "1px solid red", */
    fontFamily: "Arial",
    "font-size": "12px",
    margin: "12px",
    padding: "15px",

    /*  "background-image":
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(245, 245, 245, 0.85))",
         */
  }

  const bg = {
    "background-color": "rgba(255, 255, 255, 0.80)",
    "font-size": "16px"
  }

  const textStyle = {
    color: "black",
  }

  return (
    <Accordion style={hStyle} defaultActiveKey="0">
      <Card style={bg}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <h4 style={textStyle}>What Is A Call Option Contract?</h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <p>
              A call option contract gives a purchaser the right to buy a set
              amount of shares at a predetermined price. A standard stock option
              contract covers 100 shares. It is important to note that
              exercising the contract is a right, but not an obligation for the
              call holder.
            </p>
            <p>
              All call contracts have two main features, a strike price and an
              expiration date.
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={bg}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            <h4 style={textStyle}>Strike Price</h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            {" "}
            <p>
              The strike price is the fixed price at which a contract can be
              exercised. For a call option, the stock price must reach or
              surpass the strike price in order for the contract to be worthy of
              exercising. Otherwise, exercising the contract would mean
              purchasing shares for more than you can buy them for on the open
              market. For example, a contract could allow the purchaser to buy
              100 shares at a strike price of $105. If the stock price moves to
              $106, exercising the contract to buy at the lower strike price
              would lead to a $1 profit on every share purchased.
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={bg}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="2">
            <h4 style={textStyle}>Expiration Date</h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            {" "}
            <p>
              The expiration date dictates the amount of time the contract is
              valid. The value of the option is dependent on the amount of days
              to expiry. Day by day, the value of the option changes as the
              contract approaches the expiry date. As longer dated options have
              more time to reach their potential, more days to expiry increases
              the price (premium) of the option.
            </p>
            <p>
              American-style options can be exercised at any time prior to the
              expiration. European-style options can only be exercised on the
              expiration date.
            </p>
            <p>
              Note: This simulator uses the Black-Scholes-Merton model for
              pricing European options, but the fundamentals observed are still
              relevant to those purchasing American derivatives.
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={bg}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="3">
            <h4 style={textStyle}>Premium</h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            {" "}
            <p>
              The incentive for the option seller is the premium. The premium is
              the total cost of the option. This includes both the current value
              of exercising the option, if the strike price is below the current
              stock price, and an estimate of future movement potential. In the
              seller's ideal outcome, the stock price ends up below the strike
              price, and they pocket the premium as the contract expires
              worthless.
            </p>
            <p>
              When a call option is “out of the money”, the current stock price
              is below the strike price. The contract cannot yet be exercised,
              and in this case the value of the option (the premium) is only the
              potential for it to move above the strike price.
            </p>
            <p>
              When a call option is “in the money”, the current stock price is
              above the strike price. The contract is eligible to be exercised
              (immediately or on expiration date depending on
              American/European). The premium in this case factors in the amount
              the stock has surpassed the strike price, and the potential for it
              to move further.
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={bg}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="4">
            <h4 style={textStyle}>Rates of Change</h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            {" "}
            <p>
              Where the stock price lies in relation to the strike price effects
              the options value and rates of change.
            </p>
            <p>
              For example: $10 stock moves to $10.50 (Days to expiry: 30)
              <br />
              <br />
              Strike 1: $11 -> Option premium moves from $5 to $7.50
              <br />
              Strike 2: $15 -> Option premium moves from $0.20 to $0.30
              <br />
              <br />
              In the first option, the strike price is closer to the current
              stock price. Because the probability and potential of the first
              option being “in the money” is higher than Option 2, it is priced
              higher from the start.
              <br />
              <br />
              The amount the option premium changes with a $0.50 increase in the
              stock price is also larger ($2.50). The same movement in Option 2
              only moves the option’s value $0.10, because it still has a long
              way to go before it is “in the money”. What you are noticing is a
              difference in delta, one of the five option greeks that are used
              to measure risk. More about the option greeks can be learned here:
              ADD LINK
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={bg}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="5">
            <h4 style={textStyle}>Risk Free Interest Rate</h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
          <Card.Body>
            <p>
              The risk-free interest rate is a hypothetical rate of return
              representing what an investor could expect to receive on an
              investment with absolutely zero risk. Though no investments are
              100% risk free in reality, safe securities such as U.S. treasury
              bills or the LIBOR (London Inter-bank Offered Rate) can be used as
              reliable benchmarks. As call options free up capital investment
              opportunities for the call purchaser, higher interest rates will
              create higher priced options.
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card style={bg}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="6">
            <h4 style={textStyle}>Implied Volatility Percentage</h4>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="6">
          <Card.Body>
            {" "}
            <p>
              Implied Volatility is a metric estimating the range of future
              share price movement. IV is determined by measuring historical
              price movement and factoring in current market sentiment.
            </p>
            <p>
              The volatility percentage represents an estimate of one standard
              deviation of the stock price over a period of one year. Standard
              deviation is a statistics concept that measures the likelihood of
              outcomes. In a normal distribution bell curve, 68% of outcomes are
              estimated to fall within one standard deviation, 27% of outcomes
              within two deviations, 4.5% within three deviations, and 0.2%
              within four deviations.
            </p>
            <p>This is best explained with a couple examples:</p>
            <p>
              A $100 stock with a 50% IV is expected to have a 68% chance to
              stay within $50 of the current stock price, meaning a potential
              range of $50 - $150 over the year. There is a 27% chance estimated
              that it surpasses $150 or falls below $50, and approximately 4.5%
              chance it surpasses $200.
            </p>
            <p>
              A high growth stock with a lot of market buzz could have an IV
              percentage of 150%. If it was currently sitting at $100, this
              indicates that the market sees potential for the company to more
              than double in growth. A single deviation of this stock would be
              $150, therefore there is an estimated 68% chance it stays within
              the $0 - $250 range. Probability would further dictate a ceiling
              of $400 for the second deviation (27%), and $550 for the third
              (0.2%).
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default Learn
