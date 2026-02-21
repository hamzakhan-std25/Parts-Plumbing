

import Container from "@/components/layout/Container";
import { ViewTransition } from 'react';
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { getProducts, getFilteredProducts } from "@/services/product.service";

export default async function ProductsPage({ searchParams }) {
  // 1. Await searchParams (Required in Next.js 15+)
  const filters = await searchParams;

  const toArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };

  const categories = toArray(filters?.category);
  const brands = toArray(filters?.brand);
  const minPrice = filters?.minPrice ? Number(filters.minPrice) : null;
  const maxPrice = filters?.maxPrice ? Number(filters.maxPrice) : null;
  const search = filters?.search || null;


  const hasFilters =
    categories.length > 0 ||
    brands.length > 0 ||
    minPrice !== null ||
    maxPrice !== null ||
    search !== null;

  let products = [];


  const data = !hasFilters ? await getProducts(10)
    : await getFilteredProducts({ categoryIn: categories, brandIn: brands, minPrice, maxPrice, search });
  products = data?.nodes || [];


  // console.log("fetch data is :", data.nodes)
  // console.log("products :", products)


  return (
    <ViewTransition>

      <Container className="py-8 ">
        {/* Breadcrumbs */}
        <nav className="text-sm text-white mb-6">
          <ul className="flex flex-wrap items-center">
            <li>
              <a href="/" className="hover:text-gray-900">Home</a>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-400 font-medium"> {hasFilters ? 'Products' : 'Products'}</li>
          </ul>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0 ">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl text-white font-bold mb-6 "> {hasFilters ? 'Filtered Products' : 'All Products'}</h1>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </Container>
    </ViewTransition>
  );
}