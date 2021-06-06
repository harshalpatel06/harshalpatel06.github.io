import * as React from 'react';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const BASE_CURRENCY = 'GBP';
const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io', // Coinbase GQL service
  cache: new InMemoryCache(),
});

const round = (value: number) => Math.round(value * 100) / 100;
const EXCHANGE_RATES = gql`
  query GetExchangeRates($baseCurrency: String!) {
    rates(currency: $baseCurrency) {
      currency
      rate
    }
  }
`;

const ExchangeRatesList = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    variables: { baseCurrency: BASE_CURRENCY },
    pollInterval: 6 * 60 * 1000, // minutes
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>Exchange rates for GBP</h1>
      <br></br>
      {data.rates.map(({ currency, rate }: any) => (
        <div key={currency}>
          <p>
            {currency}: {round(rate)}
          </p>
        </div>
      ))}
    </>
  );
};

export const Forex: React.VFC = () => (
  <ApolloProvider client={client}>
    <ExchangeRatesList />
  </ApolloProvider>
);
