import { history } from '../configs/storeConfig'
import React from 'react'

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)

const relocateTo = location => () => history.push(`/${location}`)

const dispatchAction = dispatch => action => () => dispatch(action)

const assignButtonProps = name => onClick => ({ onClick, name, key:name })

const genButton = props => <button { ...props }> { props.name } </button>

const relocateToButton = buttonType =>
  compose(        // we read the following sequence top to bottom to understand what it does
    genButton,
    buttonType,
    relocateTo )  // but we provide the arguments starting from bottom: relocateTo -> buttonType -> genButton

const dispatchActionButton = buttonType => dispatch =>
  compose(
    genButton,
    buttonType,
    dispatchAction(dispatch) )


const generateRelocationButton = ({ name, location }) => {
  const namedButton = assignButtonProps(name)
  const actionedButton = relocateToButton(namedButton)

  return actionedButton(location)
}

const generateActionButton = ({ name, action, dispatch }) => {
  const namedButton = assignButtonProps(name)
  const actionedButton = dispatchActionButton(namedButton)(dispatch)

  return actionedButton(action)
}

export {
  compose,
  generateRelocationButton,
  generateActionButton
}
