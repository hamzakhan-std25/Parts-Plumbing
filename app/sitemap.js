import { SITE_URL } from '@/constants/config';
import { getProducts } from '@/services/product.service';

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = SITE_URL.replace(/\/$/, '');

  const staticRoutes = ['/', '/home', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  let productRoutes = [];

  try {
    const products = await getProducts(1000);
    productRoutes = (products?.nodes || [])
      .filter((product) => product?.slug)
      .map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch (error) {
    console.error('Failed to generate product sitemap entries:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
