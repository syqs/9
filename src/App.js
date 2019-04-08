import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // v4
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configs/storeConfig'
import Home from './containers/Home'
import Game from './containers/Game'

const store = configureStore(/* provide initial state if any */)

const App = (props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>

      <Switch>
        <Route exact path='/' render={Home} />
        <Route path='/newgame' render={() => (<Game />)} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>

    </ConnectedRouter>
  </Provider>
)

export default App
