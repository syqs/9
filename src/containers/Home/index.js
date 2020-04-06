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
  // this.state = {konj:1}
  return (
    <div>
      <h1> Hello Player 1 {this.state.konj}</h1> <button onclick={()=>this.setState({konj:23})}>CLIASK</button>
      { genActionToolbar(config) }
    </div>
  );

}
