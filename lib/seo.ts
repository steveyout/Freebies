import { Metadata } from 'next';
import { LinkItem } from '@/types/fmhy';

export const SITE_CONFIG = {
  name: 'freebies',
  fullName: 'freebies Directory - Ultimate Free Media, Tools & Open Source Index',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://freeebies.site',
  description: 'The ultimate curated mega-directory of free media, tools, HD streaming, open-source software, dev resources, and privacy guides. Verified daily with zero spam.',
  author: 'freebies Community',
  keywords: [
    'freebies',
    'free media',
    'open source software',
    'adblocker',
    'uBlock Origin',
    'FlixHQ',
    'CineJoy',
    'free streaming',
    'HD movies free',
    'anime streaming',
    'developer tools',
    'free AI tools',
    'free books',
    'curated directory',
    'privacy guides',
    'FMHY alternative',
  ],
  links: {
    github: 'https://github.com/steveyout/Freebies',
  },
};

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  path = '',
  ogType = 'website',
  keywords = SITE_CONFIG.keywords,
  noIndex = false,
}: MetadataProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.fullName;

  const canonicalUrl = `${SITE_CONFIG.url}${path}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.links.github }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
      ],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title || SITE_CONFIG.name)}&desc=${encodeURIComponent(description.slice(0, 120))}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [
        `/api/og?title=${encodeURIComponent(title || SITE_CONFIG.name)}&desc=${encodeURIComponent(description.slice(0, 120))}`,
      ],
    },
  };
}

// JSON-LD Structured Data Generators

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: 'freebies Directory',
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.links.github,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/explore?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbJsonLd(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_CONFIG.url}${crumb.url}`,
    })),
  };
}

export function getCollectionJsonLd(name: string, description: string, path: string, items: LinkItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${name} Directory`,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.slice(0, 30).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: item.url,
        description: item.description,
      })),
    },
  };
}

export function getItemJsonLd(item: LinkItem, categoryName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: item.title,
    applicationCategory: categoryName || item.category,
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: item.description,
    url: item.url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: item.isStarred ? '4.9' : '4.6',
      ratingCount: item.upvotesCount || 10,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export const getSoftwareApplicationJsonLd = getItemJsonLd;

export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
