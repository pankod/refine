import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

const text = "Explore Refine";
const description =
  "The next-gen approach to build enterprise-ready React-based internal tools with the power of GenAI.";
const image =
  "https://refine.ams3.cdn.digitaloceanspaces.com/blog-banners/blog-side-banner.webp";

export const BannerSidebar = () => {
  return (
    <Link
      to={"https://refine.dev/?ref=refine-banner-sidebar"}
      target="_blank"
      rel="noopener"
      className={clsx("flex", "w-full", "rounded-md", "overflow-hidden")}
      title={text}
      aria-label={description}
    >
      <img src={image} alt={text} title={description} loading="lazy" />
    </Link>
  );
};
