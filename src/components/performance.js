import React, { useContext } from "react"
import { StateContext } from "../providers/StateProvider"
import Container from "react-bootstrap/Container"
import BootstrapTable from "react-bootstrap-table-next"

const Performance = () => {
  const { message, setMessage } = useContext(StateContext)
  let showResults = true
  if (message[1] == 70) {
    showResults = false
  }
  //  setTimeout(runSim([10, 10, 0, 0.5, 30]), 3000)
  return <div>{showResults ? <PerformanceTable /> : <Toggler />}</div>
}


const PerformanceTable = () => {
  const { message, setMessage } = useContext(StateContext)
  const columns = [
    {
      dataField: "z1",
      text: "Stock Performance",
    },
    {
      dataField: "z2",
      text: "",
    },
    {
      dataField: "z3",
      text: "",
    },
    {
      dataField: "z4",
      text: "",
    }
  ]
  const columns2 = [
    {
      dataField: "z1",
      text: "Option Performance",
    },
    {
      dataField: "z2",
      text: "",
    },
    {
      dataField: "z3",
      text: "",
    },
    {
      dataField: "z4",
      text: "",
    }
  ]

  const stockSpread = [
    {
      z1: `Initial Stock Price: $${message[0]}`,
      z2: `Final Stock Price: $${message[5]}`,
      z3: `Range: $${message[9]} - $${message[8]}`,
      z4: `Percentage Gain/Loss: ${message[10]}%`
    }
  ]
  const stockSpread2 = [
    {
      z1: `Strike Price: $${message[1]}`,
      z2: `Volatility: ${message[3] * 100}%`,
      z3: `Days to Expiry: ${message[4]}`,
      z4: `Risk Free Interest Rate: ${message[2]}%`
    },
    {
      z1: `Date Position Opened: ${message[11]}`,
      z2: `Option Settlement Date: ${message[12]}`,
      z3: `Initial Option Premium $${message[15]}`,
      z4: `Total Cost (100 Share Contract): $${message[7]}`
    },
    {
      z1: `Final Option Premium: $${message[16]}`,
      z2: `Total Settlement Value: $${message[6]}`,
      z3: `Gain/Loss per Contract: $${message[14]}`,
      z4: `Percentage Gain/Loss: ${message[13]}%`
    }
  ]

  const tStyle = {
    "margin-top":"25px"
  }

  return (
    <div>
      <Container style={tStyle} className="tester">
      <BootstrapTable
        id="pTable1"
        keyField="id"
        data={stockSpread}
        columns={columns}
 
      />
      <BootstrapTable
        id="pTable2"
        keyField="id"
        data={stockSpread2}
        columns={columns2}
      /></Container>
    </div>
  )
}

const Toggler = () => {
  const { message, setMessage } = useContext(StateContext)
  return (
    <div className="wrapper">
      <h2>Stat Holder</h2>
    </div>
  )
}

export default Performance
