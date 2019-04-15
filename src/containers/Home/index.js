import React from 'react'
import { generateRelocationButton } from '../../tools'

const actionBar = {
  startNewGame: 'newgame',
  destroyInternet: 'quit',
  destroyInternet1: 'quit1',

}

const keys = Object.keys(actionBar)
const config = keys.map( k => { return { name: k, location: actionBar[k], key:k } } )


const genActionToolbar = config =>
  config.map(generateRelocationButton)

export default function Home(props) {

  return (
    <div>
      <h1> Hello Player 1</h1>
      { genActionToolbar(config) }
    </div>
  );

}
