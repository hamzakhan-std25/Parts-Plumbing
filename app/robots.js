import { SITE_URL } from '@/constants/config';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL.replace(/\/$/, '')}/sitemap.xml`,
  };
}
