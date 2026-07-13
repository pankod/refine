import isInternalUrl from "@docusaurus/isInternalUrl";
/**
 * This function will generate rel attribute for links.
 * @param {string} URL to be dest for link
 */
export const getLinkRel = (URL?: string): string => {
  let rel = "noopener nofollow";

  const isInternalURL = isInternalUrl(URL);

  if (URL?.includes("github.com/refinedev/refine")) {
    rel = "noopener";
  }

  if (isInternalURL || URL?.includes("refine.dev")) {
    rel = "noopener dofollow";
  }

  if (isInternalURL || URL?.includes("reactadminpanel.com")) {
    rel = "noopener dofollow";
  }

  return rel;
};
