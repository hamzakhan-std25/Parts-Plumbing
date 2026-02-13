import { gql } from "graphql-request";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 20) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`;


export const GET_PRODUCT = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      name
      description
      # Use an inline fragment to safely access variations
      ... on VariableProduct {
        variations(first: 50) {
          nodes {
            id
            price
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;




export const GET_FILTERED_PRODUCTS = gql`
  query GetFilteredProducts($material: String!) {
    products(
      first: 20
      where: {
        taxQuery: {
          taxArray: [
            {
              taxonomy: PA_MATERIAL
              terms: [$material]
              field: SLUG
            }
          ]
        }
      }
    ) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`;
