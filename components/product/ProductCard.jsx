"use Client"

import Link from "next/link";

export default function ProductCard({ product, isFeatured = false }) {
  const imageUrl = product.image?.sourceUrl || "/placeholder-product.png";
  // Get price – fallback for variable products

  return (
    <Link href={`/products/${product.slug}`} className="group block m-2">
      <div className={`bg-gray-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col  overflow-hidden ${isFeatured ? 'featured-card' : ''}`}>
        {/* Image container with aspect ratio */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '4/3' }}>
          <img
            src={imageUrl}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          {isFeatured && (
            <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-300 mb-1 line-clamp-2 group-hover:text-white transition">
            {product.name}
          </h3>
          {product.productCategories?.nodes?.[0] && (
            <p className="text-xs text-gray-500 mb-2">
              {product.productCategories.nodes[0].name}
            </p>
          )}
          <div className=" flex items-center justify-between">
            <span className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}