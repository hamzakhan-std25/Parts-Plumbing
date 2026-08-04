import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://dev-parts-plumbing.pantheonsite.io/graphql');

export default client;

// lib/graphql.js

const ISR_REVALIDATE_SECONDS = 3600;

export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch('https://dev-parts-plumbing.pantheonsite.io/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: ISR_REVALIDATE_SECONDS }, // ISR – revalidate every hour
  });

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    throw new Error('Failed to fetch data from GraphQL');
  }
  return json.data;
}
