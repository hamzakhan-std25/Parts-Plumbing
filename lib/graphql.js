import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  "https://dev-parts-plumbing.pantheonsite.io/graphql"
);