'use client';

import dynamic from 'next/dynamic';

// Dynamically import the actual content component with SSR disabled
const ProductsPageContent = dynamic(
  () => import('./ProductsPageContent'), // adjust path as needed
  { ssr: false }
);

export default function ProductsPageContentWrapper(props) {
  return <ProductsPageContent {...props} />;
}