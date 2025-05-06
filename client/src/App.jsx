import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HoneycombBackground from './components/HoneycombBackground';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Only keeping the current user string;

  return (
    <ApolloProvider client={client}>
    <div className="container">
      <HoneycombBackground />
      
      <Header />
      
      <main>
        <Outlet />
      </main>
      

    </div>
    </ApolloProvider>
  );
}

export default App;
