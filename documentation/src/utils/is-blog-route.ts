const BLOG_PATH_REGEX = /(^|\/)blog(\/|$)/;

export const isBlogRoute = (pathname?: string): boolean => {
  if (typeof pathname !== "string") {
    return false;
  }

  return BLOG_PATH_REGEX.test(pathname);
};

export const isCurrentBlogRoute = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return isBlogRoute(window.location.pathname);
};
