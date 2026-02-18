"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FilterSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);

  const toggleFilters = () => setIsOpen(!isOpen);

  // Handle checkbox changes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Build query string and navigate
  const applyFilters = () => {
    setIsOpen(false)
    const params = new URLSearchParams();

    // Add categories (multiple)
    selectedCategories.forEach((cat) => params.append("category", cat));

    // Add brands (multiple)
    selectedBrands.forEach((brand) => params.append("brand", brand));

    // Add price range (only if not default)
    if (priceRange[0] != 0) params.set("minPrice", priceRange[0]);
    if (priceRange[1] != 0) params.set("maxPrice", priceRange[1]);

    router.push(`/products?${params.toString()}`);
  };

  // Filter content (shared between desktop and mobile)
  const filterContent = (
    <div className="bg-white p-6  rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-4 sm:hidden">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          onClick={toggleFilters}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close filters"
        >
          ✕
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Category</h4>
        <ul className="space-y-1">
          {["Pipes", "Fittings", "Valves", "Sanitary", "Accessories"].map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Price (PKR)</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded px-2 py-1 text-sm"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded px-2 py-1 text-sm"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Brand</h4>
        <ul className="space-y-1">
          {["Alpha", "Master", "Supreme"].map((brand) => (
            <li key={brand}>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop version (always visible) */}
      <div className="hidden lg:block sticky top-24 ">{filterContent}</div>

      {/* Mobile version */}
      <div className="lg:hidden">
        {/* Toggle button */}
        <button
          onClick={toggleFilters}
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4"
          aria-expanded={isOpen}
        >
          <span className="font-medium">Filters</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Collapsible filter panel */}
        {isOpen && (
          <div className="mb-6 animate-slideDown">{filterContent}</div>
        )}
      </div>
    </>
  );
}