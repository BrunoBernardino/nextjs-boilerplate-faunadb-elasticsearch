import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Write only from the server
const apiKey =
  typeof window === 'undefined'
    ? process.env.FAUNADB_WRITE_API_KEY
    : process.env.FAUNADB_READONLY_API_KEY;

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
