
import { getProductBySlug } from "@/services/product.service";
import ProductDetail from "@/components/product/ProductDetail";
import { ViewTransition } from 'react';

export default async function ProductPage({ params }) {
  // const { slug } = params;
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <ViewTransition>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <ProductDetail product={product} />
      </div>
    </ViewTransition>
  );
}
