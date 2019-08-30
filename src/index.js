import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './containers/App'
import { client } from './apolloClientConfig'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App networkInfo={{ network: process.env.REACT_APP_GRAPH_NETWORK }} />
  </ApolloProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
