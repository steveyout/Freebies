import React, { useEffect } from 'react';
import { Category } from '../types/fmhy';

interface SeoHeadManagerProps {
  activeCategory?: Category;
  activeSubcategoryName?: string;
  searchQuery?: string;
}

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  activeCategory,
  activeSubcategoryName,
  searchQuery,
}) => {
  useEffect(() => {
    // Generate page title
    let pageTitle = 'freebies | Ultimate Directory of Free Tools & Resources';
    if (searchQuery && searchQuery.trim()) {
      pageTitle = `Search "${searchQuery}" | freebies`;
    } else if (activeCategory) {
      if (activeSubcategoryName) {
        pageTitle = `${activeSubcategoryName} - ${activeCategory.name} | freebies`;
      } else {
        pageTitle = `${activeCategory.name} - freebies Directory`;
      }
    }

    document.title = pageTitle;

    // Update meta description
    const metaDescription = activeCategory
      ? `Explore curated ${activeCategory.name} resources, open-source software, adblocking guides, and free media on freebies.`
      : 'freebies is the ultimate open-source mega-directory of free media, tools, adblocking guides, software, and dev resources with GitHub Pages PR contribution workflow.';

    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', metaDescription);

    // Update Open Graph Title
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute('content', pageTitle);

    // Update JSON-LD structured data
    const jsonLdId = 'fmhy-jsonld-schema';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'freebies - Ultimate Free Resources Index',
      'url': window.location.href,
      'description': metaDescription,
      'publisher': {
        '@type': 'Organization',
        'name': 'freebies Community',
        'logo': 'https://fmhy.net/assets/logo.png',
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${window.location.origin}/#search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    scriptTag.text = JSON.stringify(jsonLdData);
  }, [activeCategory, activeSubcategoryName, searchQuery]);

  return null;
};
