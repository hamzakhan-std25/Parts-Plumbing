
// -----------------------------

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  // Unique grid logic: Every 5th product becomes a "featured" card (spans 2 columns)
  // On desktop (min-width: 1024px) we use a 4-column grid, so featured cards take 2 columns.
  // On tablet (min-width: 640px) we use 2 columns, featured cards also take 2 columns (full width).
  // On mobile, all cards stack.

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {products.map((product, index) => {
        // Determine if this product should be featured (index % 5 === 0)
        const isFeatured = index % 5 === 0;

        return (
          <div
            key={product.id}
            className={`${isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}`}
          >
            <ProductCard product={product} isFeatured={isFeatured} />
          </div>
        );
      })}
    </div>
  );
}