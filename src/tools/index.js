import { history } from '../configs/storeConfig'
import React from 'react'

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)

const relocateTo = location => () => history.push(`/${location}`)

const redirectButton = name => onClick => ({ onClick, name, key:name })

const genButton = props => <button { ...props }> { props.name } </button>

const actionButton = buttonType =>
  compose(        // we read the following sequence top to bottom to understand what it does
    genButton,
    buttonType,
    relocateTo )  // but we provide the arguments starting from bottom: relocateTo -> buttonType -> genButton

const generateRelocationButton = ({ name, location }) => {
  const namedButton = redirectButton(name)
  const actionedButton = actionButton(namedButton)
  return actionedButton(location)
}

const generateActionButton = ({ name, action }) => {
  const namedButton = redirectButton(name)
  const actionedButton = actionButton(namedButton)
  return actionedButton(action)
}

export {
  compose,
  generateRelocationButton,
  generateActionButton
}
