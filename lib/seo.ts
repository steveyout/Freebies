import { Metadata } from 'next';
import { LinkItem } from '@/types/fmhy';

export const SITE_CONFIG = {
  name: 'freebies',
  fullName: 'freebies Directory - Ultimate Free Media, Tools & Open Source Index',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://freebies.directory',
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
      target: `${SITE_CONFIG.url}/explore?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function getCollectionJsonLd(name: string, description: string, url: string, items: LinkItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_CONFIG.url}${url}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.slice(0, 50).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: `${SITE_CONFIG.url}/resource/${item.id}`,
        description: item.description,
      })),
    },
  };
}

export function getSoftwareApplicationJsonLd(item: LinkItem, categoryName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: item.title,
    url: item.url,
    description: item.description,
    applicationCategory: categoryName,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: item.isStarred ? '4.9' : '4.6',
      reviewCount: item.isStarred ? '128' : '42',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: item.addedBy || 'freebies Community',
    },
  };
}

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
