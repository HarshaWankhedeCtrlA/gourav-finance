import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.gouravfinance.com'; // Replace with actual domain

  // All public pages
  const routes = [
    '',
    '/loans/business',
    '/loans/housing',
    '/emi-calculator',
    '/about',
    '/branches',
    '/customer-hub',
    '/contact',
    '/grievance',
    '/disclosures',
    '/careers',
    '/privacy',
    '/terms',
    '/investors',
    '/notices',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Loop through all routes and add both EN and HI versions
  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
    sitemapEntries.push({
      url: `${baseUrl}/hi${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  return sitemapEntries;
}