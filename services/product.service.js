import { fetchGraphQL } from "@/lib/graphql";
import { GET_PRODUCT_BY_SLUG } from "@/lib/queries";

export async function getProductBySlug(slug) {
  const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug });
  return data?.product || null;
}