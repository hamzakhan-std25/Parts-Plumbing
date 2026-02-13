import { client } from "@/lib/graphql";
import {
  GET_PRODUCTS,
  GET_FILTERED_PRODUCTS,
} from "@/lib/queries";
import ProductGrid from "@/components/product/ProductGrid";

export default async function ProductsPage({ searchParams }) {
  const material = searchParams?.material;

  const data = material
    ? await client.request(GET_FILTERED_PRODUCTS, {
        material,
      })
    : await client.request(GET_PRODUCTS);


    // console.log("DATA" ,data.products.nodes)

  return (
    <div className="p-8">
      <ProductGrid products={data.products.nodes} />
    </div>
  );
}




// ------------------------------------------
// import Header from "@/components/layout/Header";
// import Container from "@/components/layout/Container";
// import ProductGrid from "@/components/product/ProductGrid";

// // This would normally fetch real products
// const dummyProducts = [
//   { id: 1, name: "Alpha PPR Pipe", slug: "alpha-ppr-pipe", price: "₨ 345/m" },
//   { id: 2, name: "Master PVC Pipe", slug: "master-pvc-pipe", price: "₨ 280/m" },
// ];

// export default function ProductsPage() {
//   return (
//     <>
//       <Header />
//       <Container className="py-8">
//         <h1 className="text-2xl font-bold mb-6">All Products</h1>
//         <ProductGrid products={dummyProducts} />
//       </Container>
//     </>
//   );
// }