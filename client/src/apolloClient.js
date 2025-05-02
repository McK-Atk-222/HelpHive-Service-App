import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define the backend endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

// Attach token from localStorage to every request
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');     // This will make sure the token is stored after login
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Combine the link and cache
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;