import { client } from "@/lib/graphql";
import { gql } from "graphql-request";

const GET_PRODUCT = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      name
      description
      ... on VariableProduct {
        variations(first: 20) {
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

export default async function ProductPage({ params }) {
  // Await the params promise first
  const resolvedParams = await params;

  const data = await client.request(GET_PRODUCT, {
    // Access slug from the resolved object
    slug: resolvedParams.slug,
  });

  const product = data.product;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {product.variations?.nodes.map((variation) => (
        <div key={variation.id} className="border p-4 mt-4">
          <p>Price: {variation.price}</p>
          {variation.attributes.nodes.map((attr) => (
            <p key={attr.name}>
              {attr.name}: {attr.value}
            </p>
          ))}
        </div>
      ))}


    </div>
  );
}
