import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'semantic-ui-css/semantic.min.css'

import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider,
   createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
   uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
   // get the authentication token from local storage if it exists
   // const token = localStorage.getItem('token')
   // return the headers to the context so httpLink can read them
   const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN
      ? process.env.REACT_APP_GITHUB_ACCESS_TOKEN
      : ''
   return {
      headers: {
         ...headers,
         authorization: token ? `Bearer ${token}` : null,
      },
   }
})

const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
})

ReactDOM.render(
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
   document.getElementById('root')
)
