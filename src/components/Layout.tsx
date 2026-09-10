import Head from 'next/head';
import Navigation from '@/components/Navigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  faqs?: Array<{ q: string; a: string }>;
  salt?: {
    name: string;
    formula: string;
    description: string;
    cation?: {
      name: string;
      formula: string;
    };
    anion?: {
      name: string;
      formula: string;
    };
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Salt Analysis | Class 12 Practical Writeups",
  description = "Salt analysis writeups for Class 12 chemistry practicals. Observation tables, confirmatory tests, and a flowchart.",
  ogImage = "https://saltanalysis.com/og.png",
  canonicalUrl = "https://saltanalysis.com/",
  keywords = "salt analysis, chemistry practical, qualitative analysis, cations, anions, chemical reactions, lab experiments, chemistry writeup",
  author = "Aabis",
  robots = "index, follow",
  faqs,
  salt
}) => {
  const isHomePage = canonicalUrl.replace(/\/$/, '') === 'https://saltanalysis.com';
  const websiteJsonLd = isHomePage ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://saltanalysis.com/#website",
    "name": "Salt Analysis",
    "alternateName": "Salt Analysis Guide",
    "url": "https://saltanalysis.com",
    "description": description
  } : null;

  const faqJsonLd = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null;

  const saltJsonLd = salt ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "about": { "@id": `${canonicalUrl}#salt` },
        "isPartOf": { "@id": "https://saltanalysis.com/#website" }
      },
      {
        "@type": "ChemicalSubstance",
        "@id": `${canonicalUrl}#salt`,
        "name": salt.name,
        "description": salt.description,
        "molecularFormula": salt.formula,
        "url": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Salt Analysis",
            "item": "https://saltanalysis.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": salt.name,
            "item": canonicalUrl
          }
        ]
      }
    ]
  } : null;

  const serializeJsonLd = (value: object) => JSON.stringify(value).replace(/</g, '\\u003c');

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a2e" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={salt ? "article" : "website"} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${title} preview`} />
        <meta property="og:site_name" content="Salt Analysis" />
        <meta property="og:locale" content="en_IN" />
        {salt && (
          <>
            <meta property="article:section" content="Chemistry" />
            {salt.publishedTime && <meta property="article:published_time" content={salt.publishedTime} />}
            {salt.modifiedTime && <meta property="article:modified_time" content={salt.modifiedTime} />}
            {salt.tags && salt.tags.map(tag => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          </>
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Additional meta tags */}
        <meta name="robots" content={robots} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="language" content="English" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Mobile meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* JSON-LD */}
        {websiteJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
          />
        )}
        {saltJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(saltJsonLd) }}
          />
        )}
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
          />
        )}
      </Head>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
