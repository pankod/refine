import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";

const DEFAULT_FAVICON_PATH = "/assets/favicon.svg";
const BLOG_FAVICON_PATH = "/assets/favicon-blog.svg";
const BLOG_ROUTE_PREFIX = "/blog";
const ICON_LINK_SELECTOR = 'link[rel~="icon"]';
const FAVICON_TYPE = "image/svg+xml";

const isBlogRoute = (pathname = "") =>
  pathname === BLOG_ROUTE_PREFIX ||
  pathname.startsWith(`${BLOG_ROUTE_PREFIX}/`);

const isIconLink = (node: Node): node is HTMLLinkElement =>
  node instanceof HTMLLinkElement &&
  node.rel.toLowerCase().split(/\s+/).includes("icon");

const ensureFaviconLinks = () => {
  const faviconLinks = Array.from(
    document.head.querySelectorAll<HTMLLinkElement>(ICON_LINK_SELECTOR),
  );

  if (faviconLinks.length > 0) {
    return faviconLinks;
  }

  const iconLink = document.createElement("link");
  iconLink.setAttribute("rel", "icon");
  document.head.appendChild(iconLink);

  return [iconLink];
};

const syncFaviconLinks = (href: string) => {
  const faviconLinks = ensureFaviconLinks();

  faviconLinks.forEach((faviconLink) => {
    if (faviconLink.getAttribute("type") !== FAVICON_TYPE) {
      faviconLink.setAttribute("type", FAVICON_TYPE);
    }

    if (faviconLink.getAttribute("href") !== href) {
      faviconLink.setAttribute("href", href);
    }
  });
};

const useRouteFavicon = () => {
  const { pathname = "" } = useLocation();

  useEffect(() => {
    const faviconPath = isBlogRoute(pathname)
      ? BLOG_FAVICON_PATH
      : DEFAULT_FAVICON_PATH;

    syncFaviconLinks(faviconPath);

    const observer = new MutationObserver((mutations) => {
      const hasIconMutation = mutations.some((mutation) => {
        if (mutation.type === "attributes") {
          return isIconLink(mutation.target);
        }

        return (
          Array.from(mutation.addedNodes).some(isIconLink) ||
          Array.from(mutation.removedNodes).some(isIconLink)
        );
      });

      if (hasIconMutation) {
        syncFaviconLinks(faviconPath);
      }
    });

    observer.observe(document.head, {
      childList: true,
      attributes: true,
      attributeFilter: ["href", "rel", "type"],
    });

    return () => observer.disconnect();
  }, [pathname]);
};

export default useRouteFavicon;
