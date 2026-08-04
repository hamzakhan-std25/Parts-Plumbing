"use client";
import { Suspense } from "react";
import Container from "@/components/layout/Container";
import { ViewTransition } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { useAllProducts } from "@/hooks/useAllProducts";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductsPageContent() {
  // Use useSearchParams to get reactive URL params (works in client)
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { products, loading, error } = useAllProducts();

  // Extract and force lowercase immediately
  const categories = searchParams
    .getAll("category")
    .map((c) => c.toLowerCase());
  const brands = searchParams.getAll("brand").map((b) => b.toLowerCase());

  // For single strings, just use .toLowerCase() directly
  const search = (searchParams.get("search") || "").toLowerCase();

  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : null;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : null;

  // Apply filters client‑side
  let filtered = products;

  // Search (name OR description, all words)
  if (search) {
    const words = search
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    filtered = filtered.filter((product) => {
      const nameLower = product.name.toLowerCase();
      const descLower = product.description
        ? product.description.toLowerCase()
        : "";
      return words.some(
        (word) =>
          // 👈 OR logic
          nameLower.includes(word) || descLower.includes(word),
      );
    });
  }

  // Category filter
  if (categories.length > 0) {
    filtered = filtered.filter((product) => {
      return product.productCategories?.edges.some((edge) =>
        categories.includes(edge.node.name.toLowerCase()),
      );
    });
  }

  // Brand filter (assuming brand is stored as attribute or category)
  if (brands.length > 0) {
    filtered = filtered.filter((product) => {
      return product.allPaBrand?.edges.some((edge) =>
        brands.includes(edge.node.name.toLowerCase()),
      );
    });
  }

  // Price filter – requires price parsing (you may need to extract from product.price)
  if (minPrice !== null || maxPrice !== null) {
    filtered = filtered.filter((product) => {
      const formatPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
      const price = parseFloat(formatPrice) || 0; // adjust based on your price field
      if (minPrice !== null && price < minPrice) return false;
      if (maxPrice !== null && price > maxPrice) return false;
      return true;
    });
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-600">
        Error loading products
      </div>
    );

  const hasFilters =
    categories.length > 0 ||
    brands.length > 0 ||
    minPrice !== null ||
    maxPrice !== null ||
    search !== null;

  const clearSearchAndCategoryFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("category");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <ViewTransition>
      <Container className="py-8 ">
        {/* Breadcrumbs */}
        <nav className="text-sm text-white mb-6">
          <ul className="flex flex-wrap items-center">
            <li>
              <a href="/" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-400 font-medium">
              {" "}
              {hasFilters ? "Products" : "Products"}
            </li>
          </ul>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0 ">
            <FilterSidebar />
          </div>

          {/* Main Content */}

          <Suspense
            fallback={
              <div className="text-center py-20">Loading filters...</div>
            }
          >
            <div className="flex-1">
              <h1 className="text-2xl text-white font-bold mb-6 ">
                {" "}
                {hasFilters ? "Filtered Products" : "All Products"}
              </h1>
              {filtered.length > 0 ? (
                <ProductGrid products={filtered} />
              ) : (
                <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-10 text-center">
                  <h2 className="text-xl font-semibold text-white">
                    No products found
                  </h2>
                  <p className="mt-2 text-slate-300">
                    Try adjusting your search or category filters to see more
                    products.
                  </p>
                  <button
                    type="button"
                    onClick={clearSearchAndCategoryFilters}
                    className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </Container>
    </ViewTransition>
  );
}
