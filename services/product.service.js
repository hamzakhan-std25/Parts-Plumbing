import client from "@/lib/graphql";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_PRODUCTS, GET_FILTERED_PRODUCTS, GET_PRODUCT_BY_SLUG } from "@/lib/queries";


export async function getProductBySlug(slug) {
  // console.log("DEBUG: Sending slug to WP ->", slug);

  try {
    // The key here 'slug' must match the '$slug' in the query above
    const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug: slug });
    return data?.product;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return null;
  }
}
export async function getProducts(first, after = null) {
  const data = await fetchGraphQL(GET_PRODUCTS, { first, after });
  // console.log("all product calling ....")

  return data?.products || { nodes: [] }; // ← returns products object
}



export async function getFilteredProducts({
  categoryIn = [],
  brandIn = [],
  minPrice,
  maxPrice,
  search,  
  }) {
  const data = await fetchGraphQL(GET_FILTERED_PRODUCTS, {
    categoryIn,
    brandIn,
    minPrice,
    maxPrice,
    search
  });
  // console.log("filters :", { categoryIn, brandIn, minPrice, maxPrice, search })

  return data?.products || { nodes: [] }; // ← returns products object
}