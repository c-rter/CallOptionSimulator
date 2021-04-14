import React, { useContext } from "react"
import { StateContext } from "../providers/StateProvider"
import { runSim } from "../tools/simGraph"
import RangeSlider from "react-bootstrap-range-slider"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./bonus.css"

const Control = () => {
  const { message, setMessage } = useContext(StateContext)
  const [initSP, setInitSP] = React.useState(1)
  const [strike, setStrike] = React.useState(1)
  const [iRate, setIRate] = React.useState(0)
  const [vola, setVola] = React.useState(1)
  const [daysToExpire, setDTE] = React.useState(7)
  const [checked, changeBox] = React.useState("Neutral")
  const [inVal, changeInVal] = React.useState("")

  let xStockPrice = 0
  let xExercisePrice = 0
  let xInterest = 0
  let xVol = 0
  let xDTE = 0
  let finalStockPrice = 0
  let status = "status"

  let processMe = v => {
    xStockPrice = parseInt(initSP)
    xExercisePrice = parseInt(strike)
    xInterest = iRate / 100
    //  xVol = parseFloat(zVol)
    xVol = vola / 100
    xDTE = parseInt(daysToExpire)
    status = checked

    // quick and simple input validation

    if (
      xStockPrice >= 1 &&
      xStockPrice <= 2500 &&
      xExercisePrice >= 1 &&
      xExercisePrice <= 2500 &&
      iRate >= 0 &&
      iRate <= 10 &&
      vola >= 1 &&
      vola <= 200 &&
      xDTE >= 7 &&
      xDTE <= 365
    ) {
      let n = runSim([
        xStockPrice,
        xExercisePrice,
        xInterest,
        xVol,
        xDTE,
        status,
      ])
      for (let day of n) {
        finalStockPrice = day.value
      }
      console.log("n")
      console.log(n)

      let initOptPrice = n[n.length - 1].iPrice
      console.log("initial option price " + initOptPrice)
      let finalOptValue = n[n.length - 1].price * 100
      finalOptValue = finalOptValue.toFixed(2)
      console.log("final option value " + finalOptValue)
      console.log("final stock price " + finalStockPrice)
      let newHi = n[n.length - 1].hiLo[0]
      let newLo = n[n.length - 1].hiLo[1]
      let perc = n[n.length - 1].percentage
      console.log("percentage is " + perc)
      let options = { year: "numeric", month: "long", day: "numeric" }
      let today = new Date()
      let theDay = today.toLocaleDateString("en-US", options)
      let endDate = new Date(Date.now() + xDTE * 86400000)
      let theDay2 = endDate.toLocaleDateString("en-us", options)
      xInterest *= 100
      let optPerc = n[n.length - 1].pGain
      let optPerCon = n[n.length - 1].perContractGain
      let zVol = xVol.toFixed(2)
      zVol = zVol * 100
      zVol = zVol.toFixed(2)
      let realOpt = initOptPrice / 100
      realOpt = realOpt.toFixed(0)
      initOptPrice = realOpt * 100
      initOptPrice = initOptPrice.toFixed(2)
      let finalOptPrem = finalOptValue / 100
      finalOptPrem = finalOptPrem.toFixed(2)
      xStockPrice = xStockPrice.toFixed(2)
      finalOptValue = finalOptPrem * 100
      finalOptValue = finalOptValue.toFixed(2);
      optPerCon = (finalOptPrem - realOpt)*100
      optPerCon = optPerCon.toFixed(2)
      xInterest = xInterest.toFixed(2)

      if (realOpt < 0.01) {
        initOptPrice = 0
        perc = 0
        optPerCon = 0
        optPerc = 0
        finalOptValue = 0
        finalOptPrem = 0
      }

      setMessage([
        xStockPrice,
        xExercisePrice,
        xInterest,
        zVol,
        xDTE,
        finalStockPrice,
        finalOptValue,
        initOptPrice,
        newHi,
        newLo,
        perc,
        theDay,
        theDay2,
        optPerc,
        optPerCon,
        realOpt,
        finalOptPrem,
      ])
      changeInVal("")
    } else {
      changeInVal("Invalid Input, Please Stay Within Parameters")
    }
  }

  const inValStyle = {
    "padding-bottom": "20px",
    color: "darkred",
  }

  const cStyle = {
    "margin-top": "25px",
    padding: "15px",
    "background-color": "rgba(255, 255, 255, 0.80)"
  }

  return (
    <div style={cStyle} className="wrapper">
      <h3 style={{"margin-bottom" : "15px"}}>Enter Option</h3>
      <div style={{"margin-bottom":"3px"}}>Current Stock Price ($1 - $2500)</div>
      <Form.Group as={Row}>
        <Col lg="8">
          <RangeSlider
          variant="dark"
            value={initSP}
            min="1"
            max="2500"
            onChange={e => setInitSP(e.target.value)}
          />
        </Col>
        <Col lg="4">
          <Form.Control
            value={initSP}
            onChange={e => setInitSP(e.target.value)}
          />
        </Col>
      </Form.Group>
      <div style={{"margin-bottom":"3px"}}>Strike Price ($1 - $2500)</div>
      <Form.Group as={Row}>
        <Col lg="8">
          <RangeSlider
            variant="dark"
            value={strike}
            min="1"
            max="2500"
            onChange={e => setStrike(e.target.value)}
          />
        </Col>
        <Col lg="4">
          <Form.Control
            value={strike}
            onChange={e => setStrike(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form>
        <div style={{"margin-bottom":"3px"}}>RF Interest Rate (0% - 10%)</div>
        <Form.Group as={Row}>
          <Col lg="8">
            <RangeSlider
              value={iRate}
              variant="dark"
              min="0"
              max="10"
              step={0.05}
              onChange={e => setIRate(e.target.value)}
            />
          </Col>
          <Col lg="4">
            <Form.Control
              value={iRate}
              onChange={e => setIRate(e.target.value)}
            />
          </Col>
        </Form.Group>
        <div style={{"margin-bottom":"3px"}}>IV Percentage (1% - 200%)</div>
        <Form.Group as={Row}>
          <Col lg="8">
            <RangeSlider
              value={vola}
              variant="dark"
              min="1"
              max="200"
              onChange={e => setVola(e.target.value)}
            />
          </Col>
          <Col lg="4">
            <Form.Control
              value={vola}
              onChange={e => setVola(e.target.value)}
            />
          </Col>
        </Form.Group>
        <div style={{"margin-bottom":"3px"}}>Days to Expiry (7 - 90)</div>
        <Form.Group as={Row}>
          <Col lg="8">
            <RangeSlider
              value={daysToExpire}
              variant="dark"
              min="7"
              max="90"
              onChange={e => setDTE(e.target.value)}
            />
          </Col>
          <Col lg="4">
            <Form.Control
              value={daysToExpire}
              onChange={e => setDTE(e.target.value)}
            />
          </Col>
        </Form.Group>
        <div style={{"margin-bottom":"3px"}}>Luck</div>
        <Form.Group>
          <Form.Control
            as="select"
            value={checked}
            defaultValue="Neutral"
            onChange={e => changeBox(e.target.value)}
          >
            <option>Neutral</option>
            <option>Good</option>
            <option>Bad</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <div style={inValStyle}>{inVal}</div>
      <Button
        id="imaB"
        variant="primary"
        size="md"
        style={{ "margin-bottom": "10px" , "background-color": "#2D4658"}}
        onClick={v => processMe(v)}
      >
        Run Simulator
      </Button>
    </div>
  )
}

export default Control
