import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="border p-4 rounded hover:shadow-lg transition"
    >
      <img
        src={product.image?.sourceUrl}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
      <h2 className="mt-4 font-semibold">{product.name}</h2>
    </Link>
  );
}





// ------------------------------------------

// import Link from "next/link";

// export default function ProductCard({ product }) {
//   return (
//     <div className="border rounded-lg p-4 hover:shadow-md transition">
//       <div className="bg-gray-100 h-48 rounded-md mb-4 flex items-center justify-center text-gray-400">
//         Product Image
//       </div>
//       <h3 className="font-semibold text-lg mb-2">
//         <Link href={`/products/${product.slug}`} className="hover:text-blue-600">
//           {product.name}
//         </Link>
//       </h3>
//       <p className="text-gray-600 text-sm">{product.price || "Price on request"}</p>
//     </div>
//   );
// }
