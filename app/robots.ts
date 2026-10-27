import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Stop Google from indexing the admin panel
    },
    sitemap: 'https://www.gouravfinance.com/sitemap.xml',
  };
}