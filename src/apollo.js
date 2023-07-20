import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/44701/marketplace/version/latest',
  cache: new InMemoryCache(),
});
