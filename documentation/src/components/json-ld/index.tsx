import React from "react";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// ────────────────────────────────────────────────────────────────────────────
// Organization JSON-LD (rendered globally on every page via Root)
// ────────────────────────────────────────────────────────────────────────────

const organizationJsonLdString = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "refine.dev",
  url: "https://refine.dev",
  logo: {
    "@type": "ImageObject",
    url: "https://refine.dev/img/org-json-ld-logo.png",
  },
  sameAs: [
    "https://github.com/refinedev/refine",
    "https://discord.gg/refine",
    "https://www.reddit.com/r/refine/",
    "https://x.com/refine_dev",
    "https://www.linkedin.com/company/refine-dev",
  ],
});

export const OrganizationJsonLd = () => {
  return (
    <Head>
      <script type="application/ld+json">{organizationJsonLdString}</script>
    </Head>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// BreadcrumbList JSON-LD
// ────────────────────────────────────────────────────────────────────────────

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
};

const toAbsoluteUrl = (siteUrl: string, href: string) => {
  try {
    const url = new URL(href, siteUrl);
    if (!url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}/`;
    }
    return url.toString();
  } catch {
    return href.endsWith("/") ? href : `${href}/`;
  }
};

/**
 * Emits JSON-LD BreadcrumbList markup so search engines can display breadcrumb
 * paths in SERP results.
 */
export const BreadcrumbJsonLd = ({ items }: { items: BreadcrumbItem[] }) => {
  const { siteConfig } = useDocusaurusContext();

  const itemListElement = React.useMemo(() => {
    return items.map((item, index): BreadcrumbListItem => {
      const listItem: BreadcrumbListItem = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };

      if (item.href) {
        if (item.href === "/") {
          listItem.item = toAbsoluteUrl(siteConfig.url, "/core/");
        } else {
          listItem.item = toAbsoluteUrl(siteConfig.url, item.href);
        }
      }

      return listItem;
    });
  }, [items, siteConfig.url]);

  if (!items.length) {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// BlogPosting JSON-LD
// ────────────────────────────────────────────────────────────────────────────

type BlogPostingAuthor = {
  name?: string;
  url?: string;
  imageURL?: string;
};

type BlogPostingJsonLdProps = {
  title: string;
  description?: string;
  date: string;
  lastUpdate?: string;
  image?: string;
  url?: string;
  authors?: BlogPostingAuthor[];
};

/**
 * Emits a JSON-LD BlogPosting script tag for search engine structured data.
 * Google prefers JSON-LD over microdata for rich results.
 */
export const BlogPostingJsonLd = ({
  title,
  description,
  date,
  lastUpdate,
  image,
  url,
  authors,
}: BlogPostingJsonLdProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    ...(lastUpdate && { dateModified: lastUpdate }),
    ...(image && { image: [image] }),
    ...(url && { mainEntityOfPage: { "@type": "WebPage", "@id": url } }),
    ...(authors?.length &&
      authors.length > 0 && {
        author: authors.map((author) => ({
          "@type": "Person",
          ...(author.name && { name: author.name }),
          ...(author.url && { url: author.url }),
          ...(author.imageURL && { image: author.imageURL }),
        })),
      }),
    publisher: {
      "@type": "Organization",
      name: "Refine",
      url: "https://refine.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://refine.dev/img/org-json-ld-logo.png",
      },
    },
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};
