import { ApolloClient, InMemoryCache } from '@apollo/client';

// Write only from the server
const apiKey =
  typeof window === 'undefined'
    ? process.env.FAUNADB_WRITE_API_KEY
    : process.env.FAUNADB_READONLY_API_KEY;

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${apiKey}`,
  },
  cache: new InMemoryCache(),
});

export default client;
