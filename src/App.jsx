import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Dice from './Dice'
import Heading from './Heading'
import { nanoid } from 'nanoid'
import './App.css'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [result, setResult] = useState(false)

  useEffect(
    () => {
      const allHeld = dice.every(die => die.isHeld)
      const firstVal = dice[0].value
      const allVal = dice.every(die => die.value === firstVal)
      if (allHeld && allVal) {
        setResult(true)
      }
    }, [dice])

  function generateNum() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNum())
    }
    return newArr
  }

  function rollDice() {
    if (result) {
      setResult(false)
      setDice(allNewDice())
    }
    else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNum()
      }))
    }
  }

  function numHold(did) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === did ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die =>
    <Dice key={die.id} value={die.value} isHeld={die.isHeld} numHold={() => numHold(die.id)} />
  )

  return (
    <main>
      {result && <Confetti className='conft' />}
      <div className='main-bg'>
        <Heading />
        <div className='die-container'>
          {diceElements}
        </div>
      </div>
      <button className='roll-btn' onClick={rollDice}>
        {result ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
