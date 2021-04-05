import React, { useContext } from "react"
import { StateContext } from "../providers/StateProvider"
import { Link } from "gatsby"


const LeftHeader = () => {
  const { message, setMessage } = useContext(StateContext)

  const mStyle = {
    "font-size":"16px",
    "margin-left":"1px",
    "margin-bottom": "8px"
  }

  const mainHeader = {
    "background": "-webkit-linear-gradient(#26466D, #1D7CF2)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  }

  return (
    <div>
        <h3 style={mainHeader}>Call Option Simulator</h3>
        <div style={mStyle}>using the Black-Scholes-Merton valuation model</div>
    </div>
  )
}

export default LeftHeader
