// app/products/page.jsx
import { Suspense } from 'react';
import ProductsPageContentWrapper from '@/components/product/ProductsPageContentWrapper';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsPageContentWrapper />
    </Suspense>
  );
}