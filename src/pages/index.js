import React from "react"
import Control from "../components/control"
import Performance from "../components/performance"
import { runSim } from "../tools/simGraph"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LeftHeader from "../components/leftheader"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Learn from "../components/learn"
import { Github } from 'react-bootstrap-icons';


/*
const Statekeeper = () => {
  const [t1, sett1] = React.useState(0);
  let showResults = true
  if (t1 == 70) {
    showResults = false
  }
  //  setTimeout(runSim([10, 10, 0, 0.5, 30]), 3000)
  return <div>{showResults ? <PerformanceTable /> : <Toggler />}</div>
} */

const MyButton = props => {
  return <div>{props.buttonText}</div>
}

const Mainer = () => {
  const opVal = {
    color: "#FFFFFF",
    "margin-left": "40px",
  }

  return (
    <div>
      <Performance />
      <div id="#dOpt" style={opVal}>
        Option Value (Hover over point to activate)
      </div>
      <div id="my_dataviz"></div>
    </div>
  )
}

const App = () => {
  const myStyle = {
    /*  border: "1px solid red", */
    fontFamily: "Arial",
    "background-color": "#11ffee00",
  }
  const jumboStyle = {
    padding: "20px",
    margin: "25px 20px",
    background: "rgba(255, 255, 255, 0.8)",
    "text-align": "center",
  }

  const contStyle = {
    height: "100vh",
    "background-size": "cover",
    "background-image":
      'linear-gradient(to bottom, rgba(16, 46, 69, 0.90), rgba(0, 0, 0, 1)), url("https://images.pexels.com/photos/2783862/pexels-photo-2783862.jpeg")',
  }

  /*
IMAGE LINK "images/bg.jpg"



  const contStyle = {
  //  "background-size": "cover",
  //  "height": "100%",
  //  "background-image":
   //   'linear-gradient(to bottom, rgba(16, 46, 69, 0.75), rgba(0, 6, 10, 0.75)), url("https://www.americancityandcounty.com/files/2020/06/sean-pollock-PhYq704ffdA-unsplash-2-1024x512.jpg")',
  } */

  const marTop = {
    "margin-top": "250px",
  }

  const [t1, sett1] = React.useState(true)
  const [buttonText, setButtonText] = React.useState(
    "About Call Options and BSM"
  )

  let timerer = () => {
    if (document.getElementById("my_dataviz") !== null) {
      setButtonText("About Call Options and BSM")
      runSim([1, 1, 0, 1, 7])
    }
  }

  let notProp = 200

  let doBoth = b => {
    if (b) {
      sett1(!t1)
      setTimeout(timerer, 100)
      setButtonText("Return to Simulator")
    }
  }

  const hStyle = {
    /* border: "1px solid red", */
    fontFamily: "Arial",
    "font-size": "12px",
    "margin-top": "25px",
    "background-color": "rgba(255, 255, 255, 0.80)",
    padding: "15px"
  }

  const superMaple = {
    "font-size": "14px"
  }

  return (
    <div>
      <Container fluid style={contStyle}>
        <Row style={myStyle}>
          <Col style={myStyle} md="4">
            <Row>
              <Col style={myStyle} md="1"></Col>
              <Col md="11">
                <div style={hStyle}>
                  <LeftHeader />
                  <Button style={{"margin-top": "8px", "background-color": "#2D4658"}} onClick={v => doBoth(true)}>{buttonText}</Button><br/>
                  <Button style={{"margin-top": "8px", "margin-bottom":"8px", "background-color": "#5788ad"}} onClick={v => doBoth(true)}>View on Github <Github color="white" size={16}/></Button><br/>
                  <span style={superMaple}>created by <a href="https://supermaple.systems">SUPERMAPLE.systems</a></span>
                </div>
                <div>
                  {t1 ? (
                    <Control />
                  ) : (
                    <Image style={{"margin-top": "25px", "margin-left":"-20px"}} src="../images/tester2.png" fluid/>
                  )}
                </div>
              </Col>
              
            </Row>
          </Col>
          <Col style={myStyle} md="8">
            <Row>
              <Col style={myStyle}>
                <div>{t1 ? <Mainer /> : <Learn />}</div>
                {/*  <div id="#dOpt" style={opVal}>
                  Option Value (Hover over point to activate)
                   </div>
                  <div id="my_dataviz"></div> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

let fLoad = () => {
  runSim([1, 1, 0, 1, 7])
}

setTimeout(fLoad, 500)

export default App
