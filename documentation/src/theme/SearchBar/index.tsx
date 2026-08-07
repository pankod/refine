import { useDocSearchKeyboardEvents } from "@docsearch/react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useHistory, useLocation } from "@docusaurus/router";
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from "@docusaurus/theme-common";
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from "@docusaurus/theme-search-algolia/client";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DocSearchButton } from "@site/src/refine-theme/doc-search-button";
import { isBlogRoute } from "@site/src/utils/is-blog-route";
import translations from "@theme/SearchTranslations";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

let DocSearchModal = null;

function Hit({ hit, children }) {
  return <Link to={hit.url}>{children}</Link>;
}
function ResultsFooter({ state, onClose, searchScope }) {
  const createSearchLink = useSearchLinkCreator();
  const baseSearchLink = createSearchLink(state.query);
  const searchLink = searchScope
    ? `${baseSearchLink}&scope=${encodeURIComponent(searchScope)}`
    : baseSearchLink;

  return (
    <Link to={searchLink} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{ count: state.context.nbHits }}
      >
        {"See all {count} results"}
      </Translate>
    </Link>
  );
}

function mergeFacetFilters(f1, f2) {
  const normalize = (f) => (typeof f === "string" ? [f] : f);
  return [...normalize(f1), ...normalize(f2)];
}

// Prevents DocSearch URL parsing crashes when Algolia hits contain relative or missing URLs.
function safeProcessSearchHitUrl({
  item,
  processSearchResultUrl,
}: {
  item: any;
  processSearchResultUrl: (url: string) => string;
}) {
  const rawUrl = item?.url ?? item?.url_without_anchor ?? "/";
  const url = typeof rawUrl === "string" && rawUrl.trim() ? rawUrl : "/";

  try {
    return processSearchResultUrl(url);
  } catch {
    try {
      const absoluteUrl = new URL(url, window.location.origin).toString();
      return processSearchResultUrl(absoluteUrl);
    } catch {
      return url.startsWith("/") ? url : "/";
    }
  }
}

function DocSearch({
  contextualSearch,
  externalUrlRegex,
  CustomButton,
  searchScope,
  ...props
}: any) {
  const { siteMetadata } = useDocusaurusContext();
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
  const configFacetFilters = props.searchParameters?.facetFilters ?? [];
  const facetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters;
  // We let user override default searchParameters if she wants to
  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  };
  const history = useHistory();
  const searchContainer = useRef(null);
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(undefined);
  const importDocSearchModalIfNeeded = useCallback(async () => {
    if (DocSearchModal) {
      return Promise.resolve();
    }
    return Promise.all([
      import("@docsearch/react/modal"),
      import("@docsearch/react/style"),
      import("./styles.css"),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal;
    });
  }, []);
  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      searchContainer.current = document.createElement("div");
      document.body.insertBefore(
        searchContainer.current,
        document.body.firstChild,
      );
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);
  const onClose = useCallback(() => {
    setIsOpen(false);
    searchContainer.current?.remove();
  }, [setIsOpen]);
  const onInput = useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
        setInitialQuery(event.key);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery],
  );
  const navigator = useRef({
    navigate({ itemUrl }) {
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl;
      } else {
        history.push(itemUrl);
      }
    },
  }).current;
  const transformItems = useRef((items) =>
    props.transformItems
      ? // Custom transformItems
        props.transformItems(items)
      : // Default transformItems
        items.map((item) => ({
          ...item,
          url: safeProcessSearchHitUrl({ item, processSearchResultUrl }),
        })),
  ).current;
  const resultsFooterComponent = useMemo(
    () =>
      function ResultsFooterWrapper(footerProps) {
        return (
          <ResultsFooter
            {...footerProps}
            onClose={onClose}
            searchScope={searchScope}
          />
        );
      },
    [onClose, searchScope],
  );
  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent(
        "docusaurus",
        siteMetadata.docusaurusVersion,
      );

      return searchClient;
    },
    [siteMetadata.docusaurusVersion, props.indexName],
  );
  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  const SearchButton = CustomButton ?? DocSearchButton;

  const {
    apiKey: _apiKey,
    appId: _appId,
    searchPagePath: _searchPagePath,
    indexName: _indexName,
    searchParameters: _searchParameters,
    ...buttonProps
  } = props;

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <SearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={onOpen}
        ref={searchButtonRef}
        {...buttonProps}
      />

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            {...props}
            searchParameters={searchParameters}
            placeholder={translations.placeholder}
            translations={translations.modal}
          />,
          searchContainer.current,
        )}
    </>
  );
}

export default function SearchBar({ CustomButton }: { CustomButton?: any }) {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();

  const algoliaConfig = siteConfig.themeConfig.algolia as Record<string, any>;
  const isBlogPage = isBlogRoute(pathname);

  const resolvedAlgoliaConfig = isBlogPage
    ? {
        ...algoliaConfig,
        indexName: "refine_blog",
        searchScope: "blog",
        contextualSearch: false,
        searchParameters: {
          ...(algoliaConfig?.searchParameters ?? {}),
          attributesToHighlight: [],
        },
      }
    : {
        ...algoliaConfig,
        indexName: algoliaConfig?.indexName ?? "refine",
      };

  return <DocSearch {...resolvedAlgoliaConfig} CustomButton={CustomButton} />;
}
