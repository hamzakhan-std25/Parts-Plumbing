import { client } from "@/lib/graphql";
import { GET_PRODUCT } from "@/lib/queries";
import VariationSelector from "@/components/product/VariationSelector";

export default async function ProductPage({ params }) {
  // Await the params promise first
  const resolvedParams = await params;

  const data = await client.request(GET_PRODUCT, {    
    // Access slug from the resolved object
    slug: resolvedParams.slug,
  });


  const product = data.product;
  console.log("PRODUCT :", product)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      <div
        className="mt-4 text-gray-600"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      <VariationSelector variations={product.variations.nodes} />
    </div>
  );
}


// ---------------------------


// import Header from "@/components/layout/Header";
// import Container from "@/components/layout/Container";
// import Description from "@/components/product/Description";
// import VariationSelector from "@/components/product/VariationSelector";
// import { getProductBySlug } from "@/services/product.service";
// import { notFound } from "next/navigation";

// export default async function ProductPage({ params }) {
//   const { slug } = params;
//   const product = await getProductBySlug(slug);

//   if (!product) {
//     notFound();
//   }

//   const variations = product.variations?.nodes || [];

//   return (
//     <>
//       <Header />
//       <Container className="py-8">
//         {/* Breadcrumbs */}
//         <nav className="text-sm text-gray-500 mb-6">
//           <ul className="flex flex-wrap items-center">
//             <li>
//               <a href="/" className="hover:text-gray-900">
//                 Home
//               </a>
//             </li>
//             <li className="mx-2">/</li>
//             <li>
//               <a href="/products" className="hover:text-gray-900">
//                 Pipes
//               </a>
//             </li>
//             <li className="mx-2">/</li>
//             <li className="text-gray-700 font-medium">{product.name}</li>
//           </ul>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Column – Product Image */}
//           <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
//             <span className="text-gray-400">Product Image</span>
//           </div>

//           {/* Right Column – Product Details */}
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </h1>

//             {/* Badges & Rating */}
//             <div className="flex items-center gap-4 mb-4">
//               <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
//                 ISI
//               </span>
//               <div className="flex items-center">
//                 <span className="text-yellow-400 mr-1">★</span>
//                 <span className="text-sm text-gray-700">
//                   4.9/5 (150+ reviews)
//                 </span>
//               </div>
//             </div>

//             {/* Description with Read More */}
//             <Description htmlContent={product.description} />

//             {/* Variation Selector */}
//             {variations.length > 0 && (
//               <VariationSelector
//                 variations={variations}
//                 productName={product.name}
//               />
//             )}
//           </div>
//         </div>

//         {/* Consult Now Section */}
//         <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div>
//             <h3 className="text-lg font-semibold text-blue-900">
//               Need expert advice?
//             </h3>
//             <p className="text-blue-700">
//               Our plumbing specialists are here to help you choose the right
//               product.
//             </p>
//           </div>
//           <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap">
//             Consult Now
//           </button>
//         </div>
//       </Container>
//     </>
//   );
// }