import Head from "next/head";
import Navigation from "@/components/Navigation";

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
  extraJsonLd?: object | object[];
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
    aliases?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
}

const serializeJsonLd = (value: object) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

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
  extraJsonLd,
  salt,
}) => {
  const isHomePage =
    canonicalUrl.replace(/\/$/, "") === "https://saltanalysis.com";
  const robotsContent = robots.includes("max-image-preview")
    ? robots
    : `${robots}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`;

  const websiteJsonLd = isHomePage
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://saltanalysis.com/#website",
        name: "Salt Analysis",
        alternateName: ["Salt Analysis Guide", "Class 12 Salt Analysis"],
        url: "https://saltanalysis.com",
        description,
        inLanguage: "en-IN",
        publisher: {
          "@type": "Person",
          name: "Aabis",
          sameAs: ["https://aabis.dev"],
        },
      }
    : null;

  const faqJsonLd =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  const saltJsonLd = salt
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: title,
            description,
            dateModified: salt.modifiedTime,
            about: { "@id": `${canonicalUrl}#salt` },
            isPartOf: { "@id": "https://saltanalysis.com/#website" },
            inLanguage: "en-IN",
            isAccessibleForFree: true,
          },
          {
            "@type": "ChemicalSubstance",
            "@id": `${canonicalUrl}#salt`,
            name: salt.name,
            alternateName: salt.aliases,
            description: salt.description,
            molecularFormula: salt.formula,
            url: canonicalUrl,
          },
          {
            "@type": "LearningResource",
            "@id": `${canonicalUrl}#writeup`,
            name: title,
            description,
            url: canonicalUrl,
            learningResourceType: "Lab writeup",
            educationalLevel: "CBSE Class 12",
            educationalUse: "practical",
            inLanguage: "en-IN",
            isAccessibleForFree: true,
            about: { "@id": `${canonicalUrl}#salt` },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Salt Analysis",
                item: "https://saltanalysis.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: salt.name,
                item: canonicalUrl,
              },
            ],
          },
        ],
      }
    : null;

  const extraBlocks = extraJsonLd
    ? Array.isArray(extraJsonLd)
      ? extraJsonLd
      : [extraJsonLd]
    : [];

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link
          rel="alternate"
          type="text/plain"
          href="https://saltanalysis.com/llms.txt"
          title="LLM"
        />
        <meta name="theme-color" content="#10141b" />
        <meta name="application-name" content="Salt Analysis" />
        <meta name="apple-mobile-web-app-title" content="Salt Analysis" />

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
            {salt.publishedTime && (
              <meta
                property="article:published_time"
                content={salt.publishedTime}
              />
            )}
            {salt.modifiedTime && (
              <meta
                property="article:modified_time"
                content={salt.modifiedTime}
              />
            )}
            {salt.tags &&
              salt.tags.map((tag) => (
                <meta key={tag} property="article:tag" content={tag} />
              ))}
          </>
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xBolt" />
        <meta name="twitter:creator" content="@0xBolt" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        <meta name="robots" content={robotsContent} />
        <meta name="googlebot" content={robotsContent} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="language" content="en-IN" />
        <meta name="color-scheme" content="dark light" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

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
        {extraBlocks.map((block, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(block) }}
          />
        ))}
      </Head>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
