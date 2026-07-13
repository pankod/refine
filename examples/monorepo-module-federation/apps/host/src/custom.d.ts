declare module "blog_posts/*";
declare module "categories/*";

interface ImportMeta {
  env: {
    VITE_CATEGORIES_URL: string;
  };
}
