import type { BlogPostContextValue } from "@docusaurus/theme-common/internal";

type BlogCategory = {
  label: string;
  value: string;
  permalink: string;
};

type BlogPostContextValueWithCategory = Omit<
  BlogPostContextValue,
  "metadata"
> & {
  metadata: BlogPostContextValue["metadata"] & {
    category: BlogCategory;
  };
};

declare module "@docusaurus/theme-common/internal" {
  export function useBlogPost(): BlogPostContextValueWithCategory;
}
