import * as React from 'react';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: 'bearer <personal-access-token>',
  },
});

const queryLoggedInUser = gql`
  query {
    viewer {
      login
    }
  }
`;

const GH = () => {
  const { loading, error, data } = useQuery(queryLoggedInUser);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <h1> User: {data.viewer.login} </h1>;
};

export const Github: React.VFC = () => (
  <ApolloProvider client={client}>
    <GH />
  </ApolloProvider>
);
