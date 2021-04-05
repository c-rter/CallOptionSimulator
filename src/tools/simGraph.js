import * as d3 from "d3"

let stockPrice = 10.57
let exercisePrice = 11.5
let interest = 0
let vol = 0.5 //0.30 = 30% IV
let startDate = 14 //  DTEs

let scholes = option => {
  console.log(option)

  //JS Normal Distrubtion function via T. Ferguson UCLA Math
  const normalcdf = X => {
    //HASTINGS.  MAX ERROR = .000001
    var T = 1 / (1 + 0.2316419 * Math.abs(X))
    var D = 0.3989423 * Math.exp((-X * X) / 2)
    var Prob =
      D *
      T *
      (0.3193815 +
        T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))))
    if (X > 0) {
      Prob = 1 - Prob
    }
    return Prob
  }

  // Black-Scholes-Merton Formula into JS (European Call) -------------------------------------------------------------------------
  let num1 =
    Math.log(option.stockPrice / option.exercisePrice) +
    ((option.interest + ((option.vol * option.vol) / 2)) * (option.DTE / 365))
  let num2 = Math.sqrt(option.DTE / 365) * option.vol
  let d1 = num1 / num2
  let d2 = d1 - num2
  let normD1 = normalcdf(d1)
  let normD2 = normalcdf(d2)
  let min = option.stockPrice * normD1
  let sub = option.exercisePrice * (Math.exp(1) ** (-option.interest * (option.DTE / 365))) * normD2
  let value = min - sub

  return value
}

class Option {
  constructor(stockPrice, exercisePrice, interest, vol, DTE) {
    this.stockPrice = stockPrice
    this.exercisePrice = exercisePrice
    this.interest = interest
    this.vol = vol
    this.DTE = DTE
  }
}

// stock performance simulator, RNG based normal distribution of price deviations --------------------------------------------------------

let createOption = liveOpt => {
  let marketData = []
  var activeDate = new Date()
  let activeDTE = liveOpt[4]
  let hi = liveOpt[0]
  let lo = liveOpt[0]
  let zLuck = liveOpt[liveOpt.length - 1]

  let hiLoTester = sp => {
    if (sp > hi) {
      hi = sp
    } else if (sp < lo) {
      lo = sp
    }
  }

  stockPrice = liveOpt[0]
  exercisePrice = liveOpt[1]
  interest = liveOpt[2]
  vol = liveOpt[3] //0.30 = 30% IV
  startDate = liveOpt[4] //  DTEs

  let stockValue = stockPrice * 100
  let initStockValue = stockValue
  let formattedDate

  let option1 = new Option(
    liveOpt[0],
    liveOpt[1],
    liveOpt[2],
    liveOpt[3],
    liveOpt[4]
  )
  let scholValue = scholes(option1)
  let initPrice = (scholValue * 100).toFixed(2)
  /* console.log(`Price per stock contract is $${scholValue.toFixed(2)}`)
  console.log(
    `Option Price for $${exercisePrice.toFixed(
      2
    )} Call with ${startDate} Days to Expire is $${initPrice} (100 Contracts)`
  ) 
  console.log(`Implied Volatility is ${vol}%`)
  console.log("------")

 console.log(`Stock Value is ${stockValue / 100}`)*/
  let standardDeviation = stockPrice * vol * Math.sqrt(1 / 365)
  // console.log(`Standard Daily Deviation is ${standardDeviation.toFixed(2)}`)
  let a = 0
  let b = 0
  let c = 0
  let d = 0

  let random50 = () => {
    let decider = Math.ceil(Math.random() * 2)
    if (decider === 1) {
      return 1
    } else {
      return -1
    }
  }

  let one99 = Math.floor(Math.random() * 100)
  let gainLoss = 0
  let coin = 0
  let newOptionValue = 0
  let optionF = new Option(stockPrice, exercisePrice, interest, vol, startDate)

  for (let i = startDate; i > 0; i--) {
    activeDTE--
    one99 = Math.floor(Math.random() * 100)
    if (one99 < 1) {
      coin = random50()
      gainLoss = Math.ceil(Math.random() * standardDeviation * 100) * coin * 4
      stockValue += gainLoss
      //      console.log(`WHAT ON EARTH: ` + gainLoss / 100)
      //     console.log(`New Stock Price: ${stockValue / 100}`)
      d++
      optionF.stockPrice = stockValue / 100
      optionF.DTE = activeDTE
      newOptionValue = scholes(optionF)
      //   console.log(
      //       `Your option is currently worth $${(newOptionValue * 100).toFixed(2)}`
      //    )

      activeDate.setDate(activeDate.getDate() + 1)
      formattedDate = activeDate.toISOString().slice(0, 10)
      console.log(formattedDate)
      hiLoTester(optionF.stockPrice)
      marketData.push({
        date: formattedDate,
        value: optionF.stockPrice,
        price: newOptionValue,
      })
    } else if (one99 > 0 && one99 < 5) {
      coin = random50()
      gainLoss = Math.ceil(Math.random() * standardDeviation * 100) * coin * 3
      stockValue += gainLoss
      //    console.log(`MEGA DAY: ` + gainLoss / 100)
      //    console.log(`New Stock Price: ${stockValue / 100}`)
      c++
      optionF.stockPrice = stockValue / 100
      optionF.DTE = activeDTE
      newOptionValue = scholes(optionF)
      //     console.log(
      //       `Your option is currently worth $${(newOptionValue * 100).toFixed(2)}`
      //    )

      activeDate.setDate(activeDate.getDate() + 1)
      formattedDate = activeDate.toISOString().slice(0, 10)
      console.log(formattedDate)
      hiLoTester(optionF.stockPrice)
      marketData.push({
        date: formattedDate,
        value: optionF.stockPrice,
        price: newOptionValue,
      })
    } else if (one99 > 4 && one99 < 33) {
      coin = random50()
      gainLoss = Math.ceil(Math.random() * standardDeviation * 100) * coin * 2

      stockValue += gainLoss
      //    console.log(`Big Day: ` + gainLoss / 100)
      //   console.log(`New Stock Price: ${stockValue / 100}`)
      b++
      optionF.stockPrice = stockValue / 100
      optionF.DTE = activeDTE
      newOptionValue = scholes(optionF)
      //    console.log(
      //      `Your option is currently worth $${(newOptionValue * 100).toFixed(2)}`
      //      )

      activeDate.setDate(activeDate.getDate() + 1)
      formattedDate = activeDate.toISOString().slice(0, 10)
      console.log(formattedDate)
      hiLoTester(optionF.stockPrice)
      marketData.push({
        date: formattedDate,
        value: optionF.stockPrice,
        price: newOptionValue,
      })
    } else if (one99 > 32 && one99 < 100) {
      coin = random50()
      // replace coin with -1 to sabotage market
      gainLoss = Math.ceil(Math.random() * standardDeviation * 100) * coin
      if (gainLoss < 0 && zLuck == "Good") {
        gainLoss *= -1
      } else if (gainLoss > 0 && zLuck == "Bad") {
        gainLoss *= -1
      }
      stockValue += gainLoss
      //     console.log(`Normal Day: ` + gainLoss / 100)
      //     console.log(`New Stock Price: ${stockValue / 100}`)
      a++
      optionF.stockPrice = stockValue / 100
      optionF.DTE = activeDTE
      newOptionValue = scholes(optionF)
      //   console.log(
      //      `Your option is currently worth $${(newOptionValue * 100).toFixed(2)}`
      //    )
      activeDate.setDate(activeDate.getDate() + 1)
      formattedDate = activeDate.toISOString().slice(0, 10)
      console.log(formattedDate)
      hiLoTester(optionF.stockPrice)
      marketData.push({
        date: formattedDate,
        value: optionF.stockPrice,
        price: newOptionValue,
      })
    }
    //   console.log(`-----------------------`)
    if (activeDTE > 0) {
      //     console.log(`DAYS TO EXPIRY ${activeDTE}`)
    }
    if (optionF.stockPrice <= 0) {
     // console.log("BANKRUPT")
      break
    }
  }

  let returns = stockValue - initStockValue
  let returnPercent = (returns / initStockValue) * 100

 /* console.log(`Closing Bell, XYZ Global: $${stockValue / 100}`)
  console.log(
    `Total Returns: $${
      returns / 100
    }         Percentage Gain: ${returnPercent.toFixed(2)}%`
  )
  console.log("")
  console.log(`Market Days - Normal: ${a} Big: ${b} Mega: ${c} Unreal: ${d}`) */

  let newSharePrice = stockValue / 100

  let option2 = new Option(newSharePrice, exercisePrice, interest, vol, 0)
  let scholValue2 = scholes(option2)
  let gross = (scholValue2 * 100).toFixed(2)
  /* console.log(
    `Option initially priced at $${initPrice} has Exercised at $${exercisePrice.toFixed(
      2
    )} grossing you $${gross}`
  )
  console.log(`Net Gain/Loss is $${(gross - initPrice).toFixed(2)}`)
  console.log("------")
  console.log(initPrice)
  console.log(`hi ${hi} lo ${lo}`)
  console.log("exit") */

  let percentager = 0
  let percentGain = 0
  let perCon = 0

  if (optionF.stockPrice < 0) {
    marketData.pop()
    percentager = -100.0
    perCon = initPrice * -1
//  console.log("percon " + perCon)

    marketData.push({
      date: formattedDate,
      value: 0,
      price: 0,
      iPrice: initPrice,
      hiLo: [hi, 0],
      percentage: percentager,
      pGain: -100,
      perContractGain: perCon,
    })
  } else {
    percentager = ((optionF.stockPrice - stockPrice) / stockPrice) * 100
  //  console.log("percentager is" + percentager)
    percentGain = ((newOptionValue * 100 - initPrice) / initPrice) * 100
  /*  console.log(newOptionValue)
    console.log(initPrice)
    console.log("percentage gain on option is " + percentGain) */
    percentGain = percentGain.toFixed(2)
    perCon = newOptionValue * 100 - initPrice

    marketData.push({
      date: formattedDate,
      value: optionF.stockPrice,
      price: scholValue2,
      iPrice: initPrice,
      hiLo: [hi, lo],
      percentage: percentager.toFixed(2),
      pGain: percentGain,
      perContractGain: perCon.toFixed(2),
    })
  }
  percentager = 0
  return marketData
}








// d3 Graph -----------------------------------------------------------------------------------------------------

let runSim = (newArr, luck) => {
  // alert(newArr);
  let zOpt = createOption(newArr, luck)
/*  console.log("zOpt ")
  console.log(zOpt)
  console.log(zOpt[zOpt.length - 1].hiLo) */

  let margin = { top: 20, right: 30, bottom: 30, left: 35 },
    width = 600 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom
  document.getElementById("my_dataviz").innerHTML = ""
  let svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("viewBox", `0 0 600 400`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  //Read the data
  let newSet = []
  for (let dz of zOpt) {
    newSet.push({
      date: d3.timeParse("%Y-%m-%d")(dz.date),
      value: dz.value,
      price: dz.price,
    })
  }
  console.log(newSet)
  // Add X axis --> it is a date format
  let x = d3
    .scaleTime()
    .domain(
      d3.extent(newSet, function (d) {
        return d.date
      })
    )
    .range([0, width])
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "customClass")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(7))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")
  // Add Y axis

  let newHi = zOpt[zOpt.length - 1].hiLo[0]
  let newLo = zOpt[zOpt.length - 1].hiLo[1]
  let aSpan = newHi - newLo
  aSpan /= 2
  if (newLo - aSpan < 0) {
    newLo = aSpan
  }

  let y = d3
    .scaleLinear()
    .domain([newLo - aSpan, newHi + aSpan])
    .range([height, 0])
  svg.append("g").attr("class", "customClass").call(d3.axisLeft(y).ticks(7))

  // Add the line

  function make_x_gridlines() {
    return d3.axisBottom(x).ticks(10)
  }

  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.axisLeft(y).ticks(10)
  }

  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines().tickSize(-height).tickFormat(""))

  // add the Y gridlines
  svg
    .append("g")
    .attr("class", "grid")
    .call(make_y_gridlines().tickSize(-width).tickFormat(""))

  svg
    .append("path")
    .datum(newSet)
    .attr("fill", "none")
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.date)
        })
        .y(function (d) {
          return y(d.value)
        })
    )
  // Add the points
  let formatD = 0
  svg
    .append("g")
    .selectAll("dot")
    .data(newSet)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.date)
    })
    .attr("cy", function (d) {
      return y(d.value)
    })
    .attr("r", 3)
    .attr("fill", "#FFFFFF")
    .on("mouseover", function (event, d) {
     // console.log(d)
      formatD = (d.price).toFixed(2)
      document.getElementById("#dOpt").innerHTML = "Stock Price: $" + d.value + "    Option Premium: $" + formatD ;
    })
    .on("mouseout", function () {
      document.getElementById("#dOpt").innerHTML =
        "Option Value (Hover over point to activate)"
    })

  return zOpt
}

export { runSim, createOption }
