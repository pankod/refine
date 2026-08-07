/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("dotenv").config();

const tutorialData = require("./tutorial-units");
const thumbsUpDownFeedbackWidget = require("./plugins/thumbs-up-down-feedback-widget");
const path = require("path");

function singleReact() {
  const reactDir = path.dirname(require.resolve("react/package.json"));
  const reactDomDir = path.dirname(require.resolve("react-dom/package.json"));

  return {
    name: "single-react",
    configureWebpack() {
      return {
        resolve: {
          alias: {
            react: reactDir,
            "react-dom": reactDomDir,
            "react/jsx-runtime": path.join(reactDir, "jsx-runtime.js"),
            "react/jsx-dev-runtime": path.join(reactDir, "jsx-dev-runtime.js"),
          },
        },
      };
    },
  };
}

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
  title: "Refine",
  tagline: "Build your React-based CRUD applications, without constraints",
  url: "https://refine.dev",
  baseUrl: "/",
  projectName: "refine",
  organizationName: "refinedev",
  trailingSlash: true,
  favicon: "assets/favicon.svg",
  onBrokenLinks: "warn",
  scripts: ["https://platform.twitter.com/widgets.js"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: process.env.DISABLE_DOCS
          ? false
          : {
              path: "./docs",
              routeBasePath: "/core/docs",
              sidebarPath: require.resolve("./sidebars.js"),
              editUrl:
                "https://github.com/refinedev/refine/tree/main/documentation",
              showLastUpdateAuthor: true,
              showLastUpdateTime: true,
              disableVersioning: process.env.DISABLE_VERSIONING === "true",
              versions: {
                ...(process.env.DISABLE_VERSIONING === "true"
                  ? {}
                  : {
                      "4.xx.xx": {
                        label: "4.xx.xx",
                        noIndex: true,
                      },
                      "3.xx.xx": {
                        label: "3.xx.xx",
                        noIndex: true,
                      },
                    }),
                current: {
                  label: "5.xx.xx",
                },
              },
              lastVersion: "current",
              admonitions: {
                tag: ":::",
                keywords: [
                  "additional",
                  "note",
                  "tip",
                  "info-tip",
                  "info",
                  "caution",
                  "danger",
                  "sourcecode",
                  "create-example",
                  "simple",
                ],
              },
              exclude: ["**/**/_*.md"],
              remarkPlugins: [thumbsUpDownFeedbackWidget.plugin],
            },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/refine-theme/css/colors.css"),
            require.resolve("./src/refine-theme/css/fonts.css"),
            require.resolve("./src/refine-theme/css/custom.css"),
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/refine-theme/css/blog.css"),
            require.resolve("./src/css/split-pane.css"),
            require.resolve("./src/css/demo-page.css"),
          ],
        },
        googleTagManager: {
          containerId: "GTM-TPCTPDFK",
        },
        sitemap: {
          ignorePatterns: ["**/_*.md"],
        },
      },
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-copy",
      {
        id: "Copy Workers",
        path: "static/workers",
        context: "workers",
        include: ["**/*.{js}"],
      },
    ],
    async function tailwindcss() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    singleReact,
    "./plugins/docgen.js",
    ...(process.env.DISABLE_BLOG
      ? []
      : [
          [
            "./plugins/blog-plugin.js",
            {
              blogTitle: "Refine Blog: Tutorials, News, and Best Practices",
              blogDescription:
                "In-depth posts on React, admin panels, access control, and modern web development. Examples, trade-offs, and implementation patterns.",
              routeBasePath: "/blog",
              postsPerPage: 12,
              blogSidebarTitle: "All posts",
              blogSidebarCount: 0,
              admonitions: {
                tag: ":::",
                keywords: [
                  "additional",
                  "note",
                  "tip",
                  "info-tip",
                  "info",
                  "caution",
                  "danger",
                  "sourcecode",
                  "create-example",
                  "simple",
                ],
              },
              feedOptions: {
                type: "all",
                copyright: `Copyright © ${new Date().getFullYear()} Refine.`,
              },
            },
          ],
        ]),
    "./plugins/clarity.js",
    "./plugins/templates.js",
    "./plugins/tutorial-navigation.js",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "tutorial",
        path: "./tutorial",
        routeBasePath: "/core/tutorial",
        sidebarPath: false,
        docLayoutComponent: "@theme/TutorialPage",
        docItemComponent: "@theme/TutorialItem",
        include: ["**/index.md"],
        admonitions: {
          tag: ":::",
          keywords: [
            "additional",
            "note",
            "tip",
            "info-tip",
            "info",
            "caution",
            "danger",
            "sourcecode",
            "create-example",
            "simple",
          ],
        },
      },
    ],
    [
      "docusaurus-plugin-llms",
      {
        title: "Refine",
        description:
          "Refine is an open-source, headless React framework for building enterprise-grade internal tools, admin panels, dashboards, and B2B applications. It provides industry-standard solutions for critical concerns like authentication, access control, routing, networking, state management, and i18n.",
        docsDir: "docs",
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        excludeImports: true,
        removeDuplicateHeadings: true,
        includeOrder: [
          "getting-started/**/*",
          "guides-concepts/**/*",
          "data/**/*",
          "authentication/**/*",
          "authorization/**/*",
          "routing/**/*",
          "realtime/**/*",
          "notification/**/*",
          "audit-logs/**/*",
          "core/**/*",
          "ui-integrations/**/*",
          "packages/**/*",
          "advanced-tutorials/**/*",
          "examples/**/*",
          "further-readings/**/*",
          "migration-guide/**/*",
        ],
        ignoreFiles: ["partials/**/*"],
        rootContent: `Refine is a meta-framework for building enterprise-grade, production-ready internal tools, admin panels, dashboards, and B2B applications using React.

Key features:
- **Headless by design**: Works with any UI library (shadcn/ui, Ant Design, Material UI, Mantine, Chakra UI, or custom)
- **Data provider agnostic**: Connects to any REST, GraphQL, or custom API backend
- **Authentication & Authorization**: Built-in auth provider and access control (Casbin, Cerbos, Permify, etc.)
- **Routing**: Supports React Router, Next.js, and Remix
- **Realtime**: Live data updates with built-in support
- **i18n**: Internationalization support out of the box
- **Audit Logs**: Track data changes automatically

Documentation: https://refine.dev/core/docs/
GitHub: https://github.com/refinedev/refine
License: MIT`,
      },
    ],
  ],
  themeConfig: {
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/vsDark"),
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-hidden",
          line: "hide-next-line",
          block: { start: "hide-start", end: "hide-end" },
        },
        {
          className: "theme-code-block-added-line",
          line: "added-line",
          block: { start: "added-start", end: "added-end" },
        },
        {
          className: "theme-code-block-removed-line",
          line: "removed-line",
          block: { start: "removed-start", end: "removed-end" },
        },
      ],
    },
    image: "img/refine-core-social.png",
    algolia: {
      appId: "KRR9VEUPCT",
      apiKey: "cd0188125dcd31fb4b011b5e536d963a",
      indexName: "refine",
      contextualSearch: true,
      searchParameters: {
        attributesToHighlight: ["hierarchy.lvl0", "hierarchy"],
      },
    },
    metadata: [
      {
        name: "keywords",
        content:
          "react-admin, react-framework, internal-tool, admin-panel, ant-design, material ui, mui",
      },
    ],
    navbar: {
      logo: {
        alt: "refine",
        src: "img/refine_logo.png",
      },
      items: [
        { to: "/blog/", label: "Blog", position: "left" },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
        },
        {
          href: "https://github.com/refinedev/refine",
          position: "right",
          className: "header-icon-link header-github-link",
        },
        {
          href: "https://discord.gg/refine",
          position: "right",
          className: "header-icon-link header-discord-link",
        },
        {
          href: "https://twitter.com/refine_dev",
          position: "right",
          className: "header-icon-link header-twitter-link",
        },
      ],
    },
    footer: {
      logo: {
        alt: "refine",
        src: "/img/refine_logo.png",
      },
      links: [
        {
          title: "Resources",
          items: [
            {
              label: "Getting Started",
              to: "/core/docs/",
            },
            {
              label: "Tutorials",
              to: "/core/tutorial/",
            },
            {
              label: "Blog",
              to: "/blog/",
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "Examples",
              to: "/core/docs/examples/",
            },
            {
              label: "Integrations",
              to: "/core/integrations/",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              to: "/about/",
            },
          ],
        },
        {
          title: "__LEGAL",
          items: [
            {
              label: "License",
              to: "https://github.com/refinedev/refine/blob/main/LICENSE",
            },
          ],
        },
        {
          title: "__SOCIAL",
          items: [
            {
              href: "https://github.com/refinedev/refine",
              label: "github",
            },
            {
              href: "https://discord.gg/refine",
              label: "discord",
            },
            {
              href: "https://reddit.com/r/refine",
              label: "reddit",
            },
            {
              href: "https://twitter.com/refine_dev",
              label: "twitter",
            },
            {
              href: "https://www.linkedin.com/company/refine-dev",
              label: "linkedin",
            },
          ],
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "dark",
    },
  },
  customFields: {
    /** Footer Fields */
    footerDescription:
      '<strong style="font-weight:700;">refine</strong> is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by <strong style="font-weight:700;">CRUD</strong> operations and provides industry standard solutions.',
    contactTitle: "Contact",
    contactDescription: [
      "Refine Development Inc.",
      "447 Sutter St 405 San Francisco",
    ],
    contactEmail: "info@refine.dev",
    /** ---- */
    /** Live Preview */
    LIVE_PREVIEW_URL:
      process.env.LIVE_PREVIEW_URL ?? "http://localhost:3030/preview",
    /** ---- */
    tutorial: tutorialData,
  },
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2017",
        },
        module: {
          type: isServer ? "commonjs" : "es6",
        },
      },
    }),
  },
};

module.exports = siteConfig;
