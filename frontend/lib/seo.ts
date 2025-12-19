/**
 * SEO Utilities for setting meta tags and JSON-LD schema
 */

export interface SEOMetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterHandle?: string;
}

/**
 * Update meta tags in document head
 */
export function updateMetaTags(seo: SEOMetaTags) {
  // Update title
  document.title = seo.title;
  
  // Update or create meta tags
  updateMetaTag('description', seo.description);
  if (seo.keywords) {
    updateMetaTag('keywords', seo.keywords);
  }
  if (seo.ogImage) {
    updateMetaTag('og:image', seo.ogImage, 'property');
  }
  if (seo.ogUrl) {
    updateMetaTag('og:url', seo.ogUrl, 'property');
  }
  updateMetaTag('og:title', seo.title, 'property');
  updateMetaTag('og:description', seo.description, 'property');
  
  if (seo.twitterHandle) {
    updateMetaTag('twitter:creator', seo.twitterHandle);
  }
  updateMetaTag('twitter:title', seo.title);
  updateMetaTag('twitter:description', seo.description);
  if (seo.ogImage) {
    updateMetaTag('twitter:image', seo.ogImage);
  }
}

/**
 * Helper to update or create a meta tag
 */
function updateMetaTag(name: string, content: string, type: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${type}="${name}"]`) as HTMLMetaElement;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(type, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

/**
 * Inject JSON-LD schema
 */
export function injectSchemaMarkup(schema: Record<string, any>) {
  // Remove existing schema if any
  const existingScript = document.getElementById('schema-markup');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create and inject new schema
  const script = document.createElement('script');
  script.id = 'schema-markup';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Hotel organization schema
 */
export function getHotelOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    'name': 'Heritage Boutique Hotel',
    'description': 'Luxury boutique hotel in the heart of the historic city',
    'url': 'https://heritagehotel.com',
    'telephone': '+1-555-123-4567',
    'email': 'reservations@heritagehotel.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Historic Riverfront Lane',
      'addressLocality': 'Historic City',
      'addressRegion': 'State',
      'postalCode': '12345',
      'addressCountry': 'US'
    },
    'priceRange': '$$$$',
    'starRating': {
      '@type': 'Rating',
      'ratingValue': '5',
      'bestRating': '5',
      'worstRating': '1'
    },
    'image': 'https://images.pexels.com/photos/6743737/pexels-photo-6743737.jpeg',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.7',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '342',
      'reviewCount': '342'
    }
  };
}

/**
 * Room offer schema
 */
export function getRoomOfferSchema(roomId: string, roomName: string, price: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': roomName,
    'description': `${roomName} at Heritage Boutique Hotel`,
    'url': `https://heritagehotel.com/rooms/${roomId}`,
    'image': 'https://images.pexels.com/photos/12277300/pexels-photo-12277300.jpeg',
    'offers': {
      '@type': 'Offer',
      'url': `https://heritagehotel.com/rooms/${roomId}`,
      'priceCurrency': 'USD',
      'price': price.toString(),
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Heritage Boutique Hotel'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.7',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '156'
    }
  };
}

/**
 * Breadcrumb schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}
