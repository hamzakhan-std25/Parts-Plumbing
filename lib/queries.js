import { gql } from "graphql-request";

export const GET_PRODUCTS = gql`
  query GetProducts (
 $first: Int
  ) {
    products(
    first: $first
    ) 
  {
   pageInfo {
        hasNextPage
        endCursor
      }
    
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


// export const GET_PRODUCTS = `
//   query GetProducts($first: Int, $after: String) {
//     products(first: 20) {
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       nodes {
//         id
//         slug
//         name
//         price
//         ... on SimpleProduct {
//           price
//         }
//         ... on VariableProduct {
//           price
//           variations(first: 1) {
//             nodes {
//               price
//             }
//           }
//         }
//         image {
//           sourceUrl
//           altText
//         }
//         productCategories {
//           nodes {
//             name
//           }
//         }
//       }
//     }
//   }
// `;





export const GET_FILTERED_PRODUCTS = `
  query GetFilteredProducts(
    $categoryIn: [String],
    $brandIn: [String],
    $minPrice: Float,
    $maxPrice: Float,
    $search: String,                           
  ) {
    products(
      where: {
        categoryIn: $categoryIn
               taxonomyFilter: {
        filters: [
          {
            taxonomy: PA_BRAND, # Or "BRAND" depending on your plugin
            terms: $brandIn,
            operator: IN
          }
        ]
      }
        minPrice: $minPrice
        maxPrice: $maxPrice
        search : $search
      }
      first: 50
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


export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      name
      description
      shortDescription
            productCategories {
      nodes {
        name
        slug
      }
    }
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        variations(first: 50) {
          nodes {
            id
            databaseId
            price
            name
            stockStatus
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
