import { MetadataRoute } from 'next';
import { getAllCategories, getAllResources } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
  const resources = getAllResources();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/explore`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/audit`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/contribute`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_CONFIG.url}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const subcategoryRoutes: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => {
      const subSlug = sub.id.replace(`${cat.id}-`, '') || sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        url: `${SITE_CONFIG.url}/category/${cat.slug}/${subSlug}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.85,
      };
    })
  );

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((res) => ({
    url: `${SITE_CONFIG.url}/resource/${res.id}`,
    lastModified: res.lastVerified ? new Date(res.lastVerified) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...resourceRoutes,
  ];
}
