import Head from "next/head";
import { Fragment, type ReactNode } from "react";
import config from "@config/seo_meta.json";

const storeUrl = "store.refine.dev";
const storeBaseUrl = storeUrl ? `https://${storeUrl}` : null;

interface OgImage {
  url?: string;
  width?: string;
  height?: string;
  alt?: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    type?: string;
    locale?: string;
    description?: string;
    site_name?: string;
    url?: string;
    images?: OgImage[];
  };
  children?: ReactNode;
}

const ogImage = ({ url, width, height, alt }: OgImage, index: number) => {
  // generate full URL for OG image url with store base URL
  // eslint-disable-next-line
  const imgUrl = storeBaseUrl ? new URL(url!, storeBaseUrl).toString() : url;
  return (
    <Fragment key={`og:image:${index}`}>
      <meta
        key={`og:image:url:${index}`}
        property="og:image"
        content={imgUrl}
      />
      <meta
        key={`og:image:width:${index}`}
        property="og:image:width"
        content={width}
      />
      <meta
        key={`og:image:height:${index}`}
        property="og:image:height"
        content={height}
      />
      <meta
        key={`og:image:alt:${index}`}
        property="og:image:alt"
        content={alt}
      />
    </Fragment>
  );
};

export const SEO: React.FC<SeoProps> = ({
  title,
  description,
  openGraph,
  robots,
  children,
}) => {
  /**
   * @see https://nextjs.org/docs/api-reference/next/head
   *
   * meta or any other elements need to be contained as direct children of the Head element,
   * or wrapped into maximum one level of <React.Fragment> or arrays
   * otherwise the tags won't be correctly picked up on client-side navigations.
   *
   * The `key` property makes the tag is only rendered once,
   */
  return (
    <Head>
      <title key="title">
        {title ? `${config.titleTemplate.replace(/%s/g, title)}` : config.title}
      </title>
      <meta
        key="description"
        name="description"
        content={description || config.description}
      />
      <meta
        key="og:type"
        property="og:type"
        content={openGraph?.type ?? config.openGraph.type}
      />
      <meta
        key="og:title"
        property="og:title"
        content={
          openGraph?.title ?? config.openGraph.title ?? title ?? config.title
        }
      />
      <meta
        key="og:description"
        property="og:description"
        content={
          openGraph?.description ??
          config.openGraph.description ??
          description ??
          config.description
        }
      />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={openGraph?.site_name ?? config.openGraph.site_name}
      />
      <meta
        key="og:url"
        property="og:url"
        content={openGraph?.url ?? config.openGraph.url}
      />
      {openGraph?.locale && (
        <meta key="og:locale" property="og:locale" content={openGraph.locale} />
      )}
      {openGraph?.images?.length
        ? openGraph.images.map((img, index) => ogImage(img, index))
        : ogImage(config.openGraph.images[0], 0)}
      {config.twitter.cardType && (
        <meta
          key="twitter:card"
          name="twitter:card"
          content={config.twitter.cardType}
        />
      )}
      {config.twitter.site && (
        <meta
          key="twitter:site"
          name="twitter:site"
          content={config.twitter.site}
        />
      )}
      {config.twitter.handle && (
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={config.twitter.handle}
        />
      )}
      <meta key="robots" name="robots" content={robots ?? "index,follow"} />
      <meta
        key="googlebot"
        name="googlebot"
        content={robots ?? "index,follow"}
      />
      {children}
    </Head>
  );
};
