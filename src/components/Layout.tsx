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
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Salt Analysis - Get Practical Writeup for Any Salt",
  description = "Get detailed, step-by-step practical writeups for salt analysis. Learn about cations, anions, and their reactions in chemistry experiments.",
  ogImage = "https://saltanalysis.com/og.png",
  canonicalUrl = "https://saltanalysis.com/",
  keywords = "salt analysis, chemistry practical, qualitative analysis, cations, anions, chemical reactions, lab experiments, chemistry writeup",
  author = "Aabis"
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Salt Analysis",
    "url": "https://saltanalysis.com",
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://saltanalysis.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a2e" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Additional meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        
        {/* Mobile meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
