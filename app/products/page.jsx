
import { client } from "../../lib/graphql"
import { gql } from "graphql-request";
import Link from "next/link";

const GET_PRODUCTS = gql`
  query {
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

const whatsappNumber = "03359183182";

function generateWhatsAppLink(productName) {
  const message = `Hi, I'm interested in ${productName}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}


export default async function ProductsPage() {
  const data = await client.request(GET_PRODUCTS);
  const whatsappNumber = "1234567890";



  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {data.products.nodes.map((product) => (
        <div 
        className="border p-4 hover:shadow-lg transition flex flex-col justify-center items-center"
        key={product.id}
        >
          <Link
            
            href={`/products/${product.slug}`}
          >
            <img
              src={product.image?.sourceUrl}
              alt={product.name}
              className="w-full h-40 object-contain"
            />
            <h2 className="mt-2 font-semibold text-center">{product.name}</h2>
          </Link>
          <a
            href={generateWhatsAppLink(product.name)}
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 inline-block mt-6 "
          >
            Order on WhatsApp
          </a>
        </div>

      ))}


    </div>
  );
}
