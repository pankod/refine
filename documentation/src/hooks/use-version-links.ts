import {
  useActiveDocContext,
  useVersions,
} from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";

type VersionLink = {
  to: string;
  label: string;
};

/**
 * Returns a list of links. Each link points to the same doc, but in a different version.
 * If the doc is not available in a version, it will fallback to the "main doc" of the version.
 * The list is ordered by version, from the newest to the oldest.
 * @returns {VersionLink[]} A list of links
 */
const useVersionLinks = () => {
  const { search, hash } = useLocation();
  const docContext = useActiveDocContext();
  const versions = useVersions();

  const getVersionMainDoc = (version) =>
    version.docs.find((doc) => doc.id === version.mainDocId);

  const links = versions.map((version) => {
    // We try to link to the same doc, in another version
    // When not possible, fallback to the "main doc" of the version
    const versionDoc =
      docContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);
    return {
      to: `${versionDoc.path}${search}${hash}`,
      label: version.label,
    };
  }) as VersionLink[];

  return {
    links,
  };
};

export default useVersionLinks;
