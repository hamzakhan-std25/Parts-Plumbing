import { getProductBySlug } from '@/services/product.service';
import ProductDetail from '@/components/product/ProductDetail';
import { ViewTransition } from 'react';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  const cleanDescription = stripHtml(product.description || product.shortDescription || '');

  return {
    title: product.name,
    description: cleanDescription || 'Explore product details, pricing, and available options.',
    openGraph: {
      title: product.name,
      description: cleanDescription || 'Explore product details, pricing, and available options.',
      type: 'website',
      images: product.image?.sourceUrl
        ? [
            {
              url: product.image.sourceUrl,
              alt: product.image?.altText || product.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  // const { slug } = params;
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  console.log('[Product Page] -- product details: ', product);

  return (
    <ViewTransition>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <ProductDetail product={product} />
      </div>
    </ViewTransition>
  );
}
