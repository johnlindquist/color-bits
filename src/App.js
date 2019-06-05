import React, { useState } from "react"
import { toBit } from "./utils"
import "./App.css"

function ToggleBitButton(props) {
  return (
    <button style={props.style} onClick={() => props.toggleBit(props.note)}>
      {props.bit}
    </button>
  )
}

const App = () => {
  const [color, setColor] = useState(toBit(0xff0000, 24))

  const leftShift = "<<"
  const signPropagatingRightShift = ">>"
  const zeroFillRightShift = ">>>"
  const colorArray = [...color]
  const hexColor = (color => {
    let temp = parseInt(color, 2).toString(16)
    while (temp.length < 6) {
      temp = `0${temp}`
    }

    return temp
  })(color)
  const backgroundColor = `#${hexColor}`

  const toggleBit = position => _ => {
    const newColorArray = colorArray.map((bit, i) =>
      i === position ? Math.abs(bit - +1).toString() : bit.toString()
    )
    console.log(newColorArray)
    setColor(newColorArray.join(""))
  }

  const shiftLeft = () => {
    const newColor = parseInt(color, 2) << 1
    let newBits = toBit(newColor, 24)

    if (newBits.length > 24) newBits = newBits.substr(-24)

    setColor(newBits)
  }
  const zeroFillShiftRight = () => {
    let newColor = parseInt(color, 2) >>> 1
    let newBits = toBit(newColor, 24)

    if (newBits.length > 24) newBits = newBits.substr(-24)

    setColor(newBits)
  }
  const signPropagatingShiftRight = () => {
    let newColor = parseInt(color, 2) >> 1
    let newBits = newColor.toString(2)

    if (newBits.length < 24)
      newBits =
        Array.from({ length: 24 - newBits.length })
          .map(() => color[0])
          .join("") + newBits

    setColor(newBits)
  }
  const invert = () => {
    const newColor = ~parseInt(color, 2)
    let newBits = toBit(newColor, 24)

    if (newBits.length > 24) newBits = newBits.substr(-24)

    setColor(newBits)
  }

  return (
    <>
      <div style={{ fontFamily: "monospace" }}>{color}</div>
      <div style={{ fontFamily: "monospace" }}>{backgroundColor}</div>
      <button onClick={shiftLeft}>{leftShift}</button>
      {colorArray.map((bit, i) => {
        return (
          <ToggleBitButton
            key={i}
            toggleBit={toggleBit(i)}
            bit={bit}
            style={{ width: "30px" }}
          />
        )
      })}
      <button onClick={zeroFillShiftRight}>{zeroFillRightShift}</button>
      <button onClick={signPropagatingShiftRight}>
        {signPropagatingRightShift}
      </button>
      <div>
        <button onClick={invert}>~</button>
      </div>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor
        }}
      />
    </>
  )
}

export default App

/*
["C4", 0b10000000, false],
  ["D4", 0b01000000, false],
  ["E4", 0b00100000, false],
  ["F4", 0b00010000, false],
  ["G4", 0b00001000, false],
  ["A4", 0b00000100, false],
  ["B4", 0b00000010, false],
  ["C5", 0b00000001, false]
  */
