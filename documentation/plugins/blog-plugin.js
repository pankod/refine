const blogPluginExports = require("@docusaurus/plugin-content-blog");
const utils = require("@docusaurus/utils");
const path = require("path");
const fs = require("fs");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");

const defaultBlogPlugin = blogPluginExports.default;

// Module-level map populated during contentLoaded, consumed by postBuild.
let blogLastmodMap = {};
const DEFAULT_BLOG_CATEGORY = "Engineering";
const DEFAULT_POSTS_PER_PAGE_MODE = "ALL";
const PAGINATION_PATH_SEGMENT = "page";
const RANDOM_POSTS_LIMIT = 3;
const AUTHOR_POSTS_PREVIEW_LIMIT = 3;
const CATEGORY_FALLBACK_SLUG = "category";
const BLOG_BASE_PATH = "/blog";
const BLOG_CATEGORIES_LIST_PATH = `${BLOG_BASE_PATH}/categories`;
const BLOG_AUTHORS_LIST_PATH = `${BLOG_BASE_PATH}/authors`;
const BLOG_AUTHORS_BASE_PATH = `${BLOG_BASE_PATH}/author`;
const ALL_TAGS_LABEL = "All tags";
const TAGS_DATA_SUFFIX = "-tags";
const CATEGORIES_DATA_SUFFIX = "-categories";
const AUTHORS_DATA_SUFFIX = "-authors";
const CATEGORY_DATA_SUFFIX = "-category";
const ALL_TAGS_DATA_SUFFIX = "-all-tags";
const LIST_DATA_SUFFIX = "-list";
const DOCUSAURUS_DATA_DIR = ".docusaurus";
const CONTENT_BLOG_PLUGIN_DIR = "docusaurus-plugin-content-blog";
const BLOG_ALIAS_PREFIX = "~blog";
const JSON_FILE_EXTENSION = ".json";
const IS_FEATURED_FRONTMATTER_KEY = "is_featured";
const BLOG_POST_PAGE_COMPONENT = "@theme/BlogPostPage";
const BLOG_LIST_PAGE_COMPONENT = "@theme/BlogListPage";
const BLOG_AUTHOR_PAGE_COMPONENT = "@site/src/components/blog/author-page";
const BLOG_AUTHORS_LIST_PAGE_COMPONENT =
  "@site/src/components/blog/authors-page";
const BLOG_TAGS_POSTS_PAGE_COMPONENT = "@theme/BlogTagsPostsPage";
const BLOG_CATEGORIES_LIST_PAGE_COMPONENT = "@theme/BlogCategoriesListPage";
const BLOG_CATEGORY_POSTS_PAGE_COMPONENT = "@theme/BlogCategoryPostsPage";
const ALLOWED_CATEGORIES = [
  "AI & Innovation",
  "Alternatives",
  "Announcement",
  "Ecosystem / Integrations",
  "Engineering",
  "How To Build",
  "Tutorials",
];
const CATEGORY_SEO_BY_VALUE = {
  "how to build": {
    title: "How to Build: Step-by-Step Development Guides",
    description:
      "Learn how to build modern web applications from scratch with our comprehensive, step-by-step development guides and best practices.",
  },
  tutorials: {
    title: "Practical Web Development Tutorials",
    description:
      "Explore hands-on tutorials covering the latest frameworks, tools, and libraries to enhance your coding skills and efficiency.",
  },
  "ai & innovation": {
    title: "AI & Innovation: The Future of Technology",
    description:
      "Discover the latest trends in Artificial Intelligence, machine learning, and innovative tech solutions shaping the future of software.",
  },
  "ecosystem / integrations": {
    title: "Ecosystem & Third-Party Integrations",
    description:
      "Master the art of connecting tools. In-depth guides on integrations, APIs, and expanding your software ecosystem.",
  },
  alternatives: {
    title: "Top Software Tool Alternatives & Framework Comparisons",
    description:
      "Explore the best alternatives to popular dev tools. Compare top frameworks and libraries with Refine to find the perfect fit for your next software project.",
  },
  engineering: {
    title: "Engineering Blog: Architecture & Scalability",
    description:
      "Deep dives into software architecture, system design, performance optimization, and professional engineering insights.",
  },
  announcement: {
    title: "Product Announcements, News & Feature Updates",
    description:
      "Stay up to date with the latest product releases, company news, and major feature announcements from our team.",
  },
};
const ALLOWED_TAGS = [
  "admin-panel",
  "ai",
  "ant-design",
  "backend",
  "bugs",
  "chakra-ui",
  "comparison",
  "css",
  "dashboards",
  "dev-tools",
  "docker",
  "git",
  "javascript",
  "kubernetes",
  "material-ui",
  "nextjs",
  "opensource",
  "react",
  "redux",
  "refine-week",
  "strapi",
  "supabase",
  "tailwind",
  "tech-industry",
  "typescript",
  "open-source"
];
const allowedCategoryAndTagValues = {
  categories: new Set(ALLOWED_CATEGORIES),
  tags: new Set(ALLOWED_TAGS),
};

const pluginDataDirRoot = path.join(
  DOCUSAURUS_DATA_DIR,
  CONTENT_BLOG_PLUGIN_DIR,
);
const aliasedSource = (source) =>
  `${BLOG_ALIAS_PREFIX}/${utils.posixPath(
    path.relative(pluginDataDirRoot, source),
  )}`;

function formatBlogDate(dateValue) {
  if (!dateValue) {
    return dateValue;
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue;
  }

  const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return shortDateFormatter.format(parsedDate).toUpperCase();
}

function paginateBlogPosts({
  blogPosts,
  basePageUrl,
  blogTitle,
  blogDescription,
  postsPerPageOption,
}) {
  const totalCount = blogPosts.length;
  const postsPerPage =
    postsPerPageOption === DEFAULT_POSTS_PER_PAGE_MODE
      ? totalCount
      : postsPerPageOption;

  const numberOfPages = Math.ceil(totalCount / postsPerPage);

  const pages = [];

  function permalink(page) {
    return page > 0
      ? utils.normalizeUrl([
          basePageUrl,
          `${PAGINATION_PATH_SEGMENT}/${page + 1}`,
        ])
      : basePageUrl;
  }

  for (let page = 0; page < numberOfPages; page += 1) {
    pages.push({
      items: blogPosts
        .slice(page * postsPerPage, (page + 1) * postsPerPage)
        .map((item) => item.id),
      metadata: {
        permalink: permalink(page),
        page: page + 1,
        postsPerPage,
        totalPages: numberOfPages,
        totalCount,
        previousPage: page !== 0 ? permalink(page - 1) : undefined,
        nextPage: page < numberOfPages - 1 ? permalink(page + 1) : undefined,
        blogDescription,
        blogTitle,
      },
    });
  }

  return pages;
}

function getMultipleRandomElement(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function toPostInfo(post) {
  return {
    title: post.metadata.title,
    description: post.metadata.description,
    permalink: post.metadata.permalink,
    authors: post.metadata.authors,
    readingTime: post.metadata.readingTime,
    date: post.metadata.date,
    formattedDate: post.metadata.formattedDate,
    lastUpdate: post.metadata.lastUpdate,
    formattedLastUpdateDate: post.metadata.formattedLastUpdateDate,
  };
}

function toComparableTimestamp(dateValue) {
  const timestamp = new Date(dateValue).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function sortBlogPostsByDateDescending(blogPosts) {
  return [...blogPosts].sort((postA, postB) => {
    const timestampDiff =
      toComparableTimestamp(postB.metadata.date) -
      toComparableTimestamp(postA.metadata.date);

    if (timestampDiff !== 0) {
      return timestampDiff;
    }

    return `${postA.metadata.title ?? ""}`.localeCompare(
      `${postB.metadata.title ?? ""}`,
    );
  });
}

function createBlogAuthors({ allBlogPosts, blogCategories }) {
  const authorsMap = new Map();

  allBlogPosts.forEach((post) => {
    const author = post.metadata.authors?.[0];

    if (!author?.key) {
      return;
    }

    const existingEntry = authorsMap.get(author.key);

    if (existingEntry) {
      existingEntry.posts.push(post);
      return;
    }

    authorsMap.set(author.key, {
      author,
      permalink: `${BLOG_AUTHORS_BASE_PATH}/${author.key}`,
      posts: [post],
    });
  });

  return [...authorsMap.values()]
    .map(({ author, permalink, posts }) => {
      const sortedPosts = sortBlogPostsByDateDescending(posts);

      return {
        author,
        permalink,
        count: sortedPosts.length,
        recentPosts: sortedPosts
          .slice(0, AUTHOR_POSTS_PREVIEW_LIMIT)
          .map((post) => ({
            title: post.metadata.title,
            permalink: post.metadata.permalink,
            date: post.metadata.date,
            formattedDate: post.metadata.formattedDate,
            category: getBlogPostCategoryData({
              frontMatter: post.metadata.frontMatter,
              blogCategories,
            }),
          })),
      };
    })
    .sort((authorA, authorB) => {
      const countDiff = (authorB.count ?? 0) - (authorA.count ?? 0);

      if (countDiff !== 0) {
        return countDiff;
      }

      return `${authorA.author?.name ?? ""}`.localeCompare(
        `${authorB.author?.name ?? ""}`,
      );
    });
}

function getRelatedPosts(allBlogPosts, metadata) {
  const currentPostTags = normalizeTags(metadata.frontMatter.tags);
  const currentPostCategory = getBlogPostCategory(metadata.frontMatter);
  const hasTags = currentPostTags.length > 0;

  const relatedPosts = allBlogPosts.filter((post) => {
    if (post.metadata.title === metadata.title) {
      return false;
    }

    if (hasTags) {
      const postTags = normalizeTags(post.metadata.frontMatter.tags);
      return postTags.some((tag) => currentPostTags.includes(tag));
    }

    const postCategory = getBlogPostCategory(post.metadata.frontMatter);
    return postCategory === currentPostCategory;
  });

  return getMultipleRandomElement(relatedPosts, RANDOM_POSTS_LIMIT).map(
    toPostInfo,
  );
}

function getAuthorPosts(allBlogPosts, metadata) {
  const authorPosts = allBlogPosts.filter(
    (post) =>
      post.metadata.frontMatter.authors === metadata.frontMatter.authors &&
      post.metadata.title !== metadata.title,
  );

  return getMultipleRandomElement(authorPosts, RANDOM_POSTS_LIMIT).map(
    toPostInfo,
  );
}

function getBlogPostCategory(frontMatter = {}) {
  const { category } = frontMatter;
  const normalized = typeof category === "string" ? category.trim() : "";
  return normalized || DEFAULT_BLOG_CATEGORY;
}

function getCategorySeo(categoryValue = "") {
  return CATEGORY_SEO_BY_VALUE[`${categoryValue}`.trim().toLowerCase()];
}

function toCategorySlug(label) {
  const normalized = `${label}`
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized) {
    return normalized;
  }

  return encodeURIComponent(`${label}`.trim().toLowerCase());
}

function toCategoryName(label = "") {
  let value = `${label}`.trim().replace(/-/g, " ");

  if (!value) {
    return "";
  }

  value = value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const replacements = [
    ["Ai", "AI"],
    ["Ui", "UI"],
    ["Ux", "UX"],
    ["Api", "API"],
    ["Ecosystem / Integrations", "Integrations"],
  ];

  replacements.forEach(([from, to]) => {
    value = value.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  });

  return value;
}

function getBlogPostCategoryData({ frontMatter = {}, blogCategories = {} }) {
  const value = getBlogPostCategory(frontMatter);
  const categoryKey = value.toLowerCase();
  const existingCategory = blogCategories[categoryKey];

  return {
    value,
    label: existingCategory.name,
    permalink: existingCategory.permalink,
  };
}

function createBlogCategories({
  allBlogPosts,
  basePageUrl,
  blogTitle,
  blogDescription,
  postsPerPageOption,
}) {
  const categories = {};
  const usedSlugs = new Set();

  function getUniqueCategorySlug(baseSlug) {
    let suffix = 2;
    let candidate = baseSlug || CATEGORY_FALLBACK_SLUG;

    while (usedSlugs.has(candidate)) {
      candidate = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(candidate);

    return candidate;
  }

  allBlogPosts.forEach((post) => {
    const categoryValue = getBlogPostCategory(post.metadata.frontMatter);
    const categoryKey = categoryValue.toLowerCase();

    if (!categories[categoryKey]) {
      const uniqueSlug = getUniqueCategorySlug(toCategorySlug(categoryValue));
      categories[categoryKey] = {
        value: categoryValue,
        name: toCategoryName(categoryValue),
        permalink: utils.normalizeUrl([basePageUrl, uniqueSlug]),
        seo: getCategorySeo(categoryValue),
        items: [],
      };
    }

    categories[categoryKey].items.push(post);
  });

  Object.values(categories).forEach((category) => {
    category.pages = paginateBlogPosts({
      blogPosts: category.items,
      basePageUrl: category.permalink,
      blogTitle,
      blogDescription,
      postsPerPageOption,
    });
  });

  return categories;
}

function mapTagsProp(blogTags) {
  return Object.values(blogTags).map((tag) => ({
    label: tag.label,
    permalink: tag.permalink,
    count: tag.items.length,
  }));
}

function mapCategoriesProp(blogCategories) {
  return Object.values(blogCategories).map((category) => ({
    value: category.value,
    name: category.name,
    permalink: category.permalink,
    count: category.items.length,
  }));
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => `${tag}`.trim()).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && tag !== "-");
  }

  return [];
}

function validateCategoryAndTags({ allBlogPosts, allowedValues }) {
  const invalidCategories = [];
  const invalidTags = [];
  const unknownCategories = new Set();
  const unknownTags = new Set();

  allBlogPosts.forEach((post) => {
    const frontMatter = post.metadata.frontMatter || {};
    const postSlug = frontMatter.slug || post.metadata.permalink || post.id;
    const category = getBlogPostCategory(frontMatter);

    if (!allowedValues.categories.has(category)) {
      unknownCategories.add(category);
      invalidCategories.push(`- ${postSlug}: "${category}"`);
    }

    normalizeTags(frontMatter.tags).forEach((tag) => {
      if (!allowedValues.tags.has(tag)) {
        unknownTags.add(tag);
        invalidTags.push(`- ${postSlug}: "${tag}"`);
      }
    });
  });

  if (unknownCategories.size === 0 && unknownTags.size === 0) {
    return;
  }

  const messageLines = [
    "[blog-plugin] Invalid category/tag values found in blog frontmatter.",
    "",
  ];

  if (unknownCategories.size > 0) {
    messageLines.push(
      `Unknown categories (${unknownCategories.size}): ${[...unknownCategories]
        .sort()
        .join(", ")}`,
    );
    messageLines.push(...invalidCategories);
    messageLines.push("");
  }

  if (unknownTags.size > 0) {
    messageLines.push(
      `Unknown tags (${unknownTags.size}): ${[...unknownTags]
        .sort()
        .join(", ")}`,
    );
    messageLines.push(...invalidTags);
    messageLines.push("");
  }

  messageLines.push(
    "Update ALLOWED_CATEGORIES / ALLOWED_TAGS in blog-plugin.js.",
  );

  throw new Error(messageLines.join("\n"));
}

/**
 * Patches the generated sitemap.xml with <lastmod> dates from blog frontmatter.
 *
 * Sitemap uses absolute URLs (https://refine.dev/blog/foo) while our map stores
 * relative permalinks (/blog/foo), so we compare by pathname only.
 */
function injectSitemapLastmod(sitemapPath) {
  const xmlOptions = {
    ignoreAttributes: false,
    preserveOrder: true,
    commentPropName: "#comment",
    format: true,
    indentBy: "  ",
  };

  // Normalize permalinks by stripping trailing slashes for consistent matching
  const permalinkToLastmod = new Map();
  for (const [permalink, lastmod] of Object.entries(blogLastmodMap)) {
    permalinkToLastmod.set(permalink.replace(/\/+$/, ""), lastmod);
  }

  const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
  const parser = new XMLParser(xmlOptions);
  const parsed = parser.parse(sitemapXml);

  const urlsetNode = parsed.find((node) => node.urlset);
  if (!urlsetNode) return;

  let patchCount = 0;

  for (const child of urlsetNode.urlset) {
    if (!child.url) continue;

    const urlChildren = child.url;
    const locNode = urlChildren.find((c) => c.loc !== undefined);
    if (!locNode) continue;

    const locValue = locNode.loc?.[0]?.["#text"];
    if (!locValue) continue;

    // Extract pathname from absolute URL to match against relative permalinks
    let pathname;
    try {
      pathname = new URL(locValue).pathname;
    } catch {
      pathname = locValue;
    }

    const lastmod = permalinkToLastmod.get(pathname.replace(/\/+$/, ""));
    if (!lastmod) continue;

    // Don't duplicate if the entry already has a <lastmod> (e.g. from another plugin)
    const hasLastmod = urlChildren.some((c) => c.lastmod !== undefined);
    if (hasLastmod) continue;

    // Insert <lastmod> right after <loc> to follow standard sitemap element order
    const locIndex = urlChildren.indexOf(locNode);
    urlChildren.splice(locIndex + 1, 0, {
      lastmod: [{ "#text": lastmod }],
    });
    patchCount++;
  }

  if (patchCount > 0) {
    const builder = new XMLBuilder(xmlOptions);
    fs.writeFileSync(sitemapPath, builder.build(parsed), "utf-8");
    console.log(
      `[blog-plugin] Injected <lastmod> into ${patchCount} sitemap entries.`,
    );
  }
}

/**
 * Waits for a file to appear on disk within a timeout.
 * Returns true if the file exists, false if the timeout is reached.
 */
function waitForFile(filePath, { timeoutMs = 30_000, intervalMs = 200 } = {}) {
  return new Promise((resolve) => {
    if (fs.existsSync(filePath)) {
      resolve(true);
      return;
    }

    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += intervalMs;
      if (fs.existsSync(filePath)) {
        clearInterval(timer);
        resolve(true);
      } else if (elapsed >= timeoutMs) {
        clearInterval(timer);
        resolve(false);
      }
    }, intervalMs);
  });
}

async function blogPluginExtended(...pluginArgs) {
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);

  const { blogTitle, blogDescription, postsPerPage } = pluginArgs[1];

  return {
    // Add all properties of the default blog plugin so existing functionality is preserved
    ...blogPluginInstance,
    /**
     * Override the default `contentLoaded` hook to access blog posts data
     */
    contentLoaded: async function (data) {
      const { content: blogContents, actions } = data;
      const { addRoute, createData } = actions;
      const {
        blogPosts: allBlogPosts,
        blogTags,
        blogTagsListPath,
      } = blogContents;
      const blogCategoriesListPath = BLOG_CATEGORIES_LIST_PATH;

      validateCategoryAndTags({
        allBlogPosts,
        allowedValues: allowedCategoryAndTagValues,
      });

      blogLastmodMap = {};

      allBlogPosts.forEach((post) => {
        post.metadata.formattedDate = formatBlogDate(post.metadata.date);
        const lastUpdateRaw =
          post.metadata.frontMatter.last_update ?? post.metadata.date;
        post.metadata.lastUpdate = new Date(lastUpdateRaw).toISOString();
        post.metadata.formattedLastUpdateDate = formatBlogDate(lastUpdateRaw);
        blogLastmodMap[post.metadata.permalink] = post.metadata.lastUpdate;
      });

      const blogItemsToMetadata = {};

      function blogPostItemsModule(items) {
        return items.map((postId) => {
          const blogPostMetadata = blogItemsToMetadata[postId];

          return {
            content: {
              __import: true,
              path: blogPostMetadata.source,
              query: {
                truncated: true,
              },
            },
          };
        });
      }

      const featuredBlogPosts = allBlogPosts.filter(
        (post) =>
          post.metadata.frontMatter[IS_FEATURED_FRONTMATTER_KEY] === true,
      );
      const featuredBlogPostIds = featuredBlogPosts.map((post) => post.id);

      const blogPosts = allBlogPosts.filter(
        (post) =>
          post.metadata.frontMatter[IS_FEATURED_FRONTMATTER_KEY] !== true,
      );

      const blogListPaginated = paginateBlogPosts({
        blogPosts,
        basePageUrl: BLOG_BASE_PATH,
        blogTitle,
        blogDescription,
        postsPerPageOption: postsPerPage,
      });

      const blogCategories = createBlogCategories({
        allBlogPosts,
        basePageUrl: blogCategoriesListPath,
        blogTitle,
        blogDescription,
        postsPerPageOption: postsPerPage,
      });
      const tagsProp = mapTagsProp(blogTags);
      const categoriesProp = mapCategoriesProp(blogCategories);
      let tagsPropPathPromise;
      let categoriesPropPathPromise;

      function getTagsPropPath() {
        if (!tagsPropPathPromise) {
          tagsPropPathPromise = createData(
            `${utils.docuHash(
              `${blogTagsListPath}${TAGS_DATA_SUFFIX}`,
            )}${JSON_FILE_EXTENSION}`,
            JSON.stringify(tagsProp, null, 2),
          );
        }

        return tagsPropPathPromise;
      }

      function getCategoriesPropPath() {
        if (!categoriesPropPathPromise) {
          categoriesPropPathPromise = createData(
            `${utils.docuHash(
              `${blogCategoriesListPath}${CATEGORIES_DATA_SUFFIX}`,
            )}${JSON_FILE_EXTENSION}`,
            JSON.stringify(categoriesProp, null, 2),
          );
        }

        return categoriesPropPathPromise;
      }

      // Create routes for blog entries.
      await Promise.all(
        allBlogPosts.map(async (blogPost) => {
          const { id, metadata } = blogPost;

          const relatedPosts = getRelatedPosts(allBlogPosts, metadata);

          const authorPosts = getAuthorPosts(allBlogPosts, metadata);
          const category = getBlogPostCategoryData({
            frontMatter: metadata.frontMatter,
            blogCategories,
          });

          await createData(
            // Note that this created data path must be in sync with
            // metadataPath provided to mdx-loader.
            `${utils.docuHash(metadata.source)}${JSON_FILE_EXTENSION}`,
            JSON.stringify(
              { ...metadata, relatedPosts, authorPosts, category },
              null,
              2,
            ),
          );

          addRoute({
            path: metadata.permalink,
            component: BLOG_POST_PAGE_COMPONENT,
            exact: true,
            modules: {
              content: metadata.source,
            },
          });

          blogItemsToMetadata[id] = metadata;
        }),
      );

      // Create routes for blog's paginated list entries.
      await Promise.all(
        blogListPaginated.map(async (listPage) => {
          const { metadata, items } = listPage;
          const { permalink } = metadata;

          const pageMetadataPath = await createData(
            `${utils.docuHash(permalink)}${JSON_FILE_EXTENSION}`,
            JSON.stringify(metadata, null, 2),
          );

          const [tagsPropPath, categoriesPropPath] = await Promise.all([
            getTagsPropPath(),
            getCategoriesPropPath(),
          ]);

          addRoute({
            path: permalink,
            component: BLOG_LIST_PAGE_COMPONENT,
            exact: true,
            modules: {
              items: blogPostItemsModule(items),
              featuredPosts: blogPostItemsModule(featuredBlogPostIds),
              metadata: aliasedSource(pageMetadataPath),
              tags: aliasedSource(tagsPropPath),
              categories: aliasedSource(categoriesPropPath),
            },
          });
        }),
      );

      const blogAuthors = createBlogAuthors({
        allBlogPosts,
        blogCategories,
      });

      if (blogAuthors.length > 0) {
        const authorsPropPath = await createData(
          `${utils.docuHash(
            `${BLOG_AUTHORS_LIST_PATH}${AUTHORS_DATA_SUFFIX}`,
          )}${JSON_FILE_EXTENSION}`,
          JSON.stringify(blogAuthors, null, 2),
        );

        addRoute({
          path: BLOG_AUTHORS_LIST_PATH,
          component: BLOG_AUTHORS_LIST_PAGE_COMPONENT,
          exact: true,
          modules: {
            authors: aliasedSource(authorsPropPath),
          },
        });
      }

      const authorsArray = allBlogPosts
        .map((post) => post.metadata.frontMatter.authors)
        .filter((authorName) => authorName !== undefined);
      const uniqueAuthors = [...new Set(authorsArray)];

      uniqueAuthors.forEach((author) => {
        const authorPosts = allBlogPosts.filter(
          (post) => post.metadata.frontMatter.authors === author,
        );

        const authorListPaginated = paginateBlogPosts({
          blogPosts: authorPosts,
          basePageUrl: `${BLOG_AUTHORS_BASE_PATH}/${author}`,
          blogTitle,
          blogDescription,
          postsPerPageOption: DEFAULT_POSTS_PER_PAGE_MODE,
        });

        authorListPaginated.forEach((authorListPage) => {
          const { metadata, items } = authorListPage;
          const { permalink } = metadata;

          addRoute({
            path: permalink,
            component: BLOG_AUTHOR_PAGE_COMPONENT,
            exact: true,
            modules: {
              items: blogPostItemsModule(items),
            },
          });
        });
      });

      // This is the last part so we early-return if there are no tags/categories.
      const hasTags = Object.keys(blogTags).length > 0;
      const hasCategories = Object.keys(blogCategories).length > 0;

      if (!hasTags && !hasCategories) {
        return;
      }

      async function createTagsListPage() {
        const tagsPropPath = await getTagsPropPath();
        const allTagsListPaginated = paginateBlogPosts({
          blogPosts: allBlogPosts,
          basePageUrl: blogTagsListPath,
          blogTitle,
          blogDescription,
          postsPerPageOption: postsPerPage,
        });

        await Promise.all(
          allTagsListPaginated.map(async (blogPaginated) => {
            const { metadata, items } = blogPaginated;

            const tagProp = {
              label: ALL_TAGS_LABEL,
              permalink: blogTagsListPath,
              allTagsPath: blogTagsListPath,
              count: allBlogPosts.length,
              isAllTagsPage: true,
            };

            const tagPropPath = await createData(
              `${utils.docuHash(
                `${metadata.permalink}${ALL_TAGS_DATA_SUFFIX}`,
              )}${JSON_FILE_EXTENSION}`,
              JSON.stringify(tagProp, null, 2),
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(
                `${metadata.permalink}${ALL_TAGS_DATA_SUFFIX}`,
              )}${LIST_DATA_SUFFIX}${JSON_FILE_EXTENSION}`,
              JSON.stringify(metadata, null, 2),
            );

            addRoute({
              path: metadata.permalink,
              component: BLOG_TAGS_POSTS_PAGE_COMPONENT,
              exact: true,
              modules: {
                items: blogPostItemsModule(items),
                tag: aliasedSource(tagPropPath),
                tags: aliasedSource(tagsPropPath),
                listMetadata: aliasedSource(listMetadataPath),
              },
            });
          }),
        );
      }

      async function createTagPostsListPage(tag) {
        await Promise.all(
          tag.pages.map(async (blogPaginated) => {
            const { metadata, items } = blogPaginated;
            const tagProp = {
              label: tag.label,
              permalink: tag.permalink,
              allTagsPath: blogTagsListPath,
              count: tag.items.length,
            };
            const tagPropPath = await createData(
              `${utils.docuHash(metadata.permalink)}${JSON_FILE_EXTENSION}`,
              JSON.stringify(tagProp, null, 2),
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(
                metadata.permalink,
              )}${LIST_DATA_SUFFIX}${JSON_FILE_EXTENSION}`,
              JSON.stringify(metadata, null, 2),
            );

            const tagsPropPath = await getTagsPropPath();

            addRoute({
              path: metadata.permalink,
              component: BLOG_TAGS_POSTS_PAGE_COMPONENT,
              exact: true,
              modules: {
                items: blogPostItemsModule(items),
                tag: aliasedSource(tagPropPath),
                tags: aliasedSource(tagsPropPath),
                listMetadata: aliasedSource(listMetadataPath),
              },
            });
          }),
        );
      }

      async function createCategoriesListPage() {
        const categoriesPropPath = await getCategoriesPropPath();

        addRoute({
          path: blogCategoriesListPath,
          component: BLOG_CATEGORIES_LIST_PAGE_COMPONENT,
          exact: true,
          modules: {
            categories: aliasedSource(categoriesPropPath),
          },
        });
      }

      async function createCategoryPostsListPage(category) {
        await Promise.all(
          category.pages.map(async (blogPaginated) => {
            const { metadata, items } = blogPaginated;
            const categoryProp = {
              value: category.value,
              name: category.name,
              permalink: category.permalink,
              allCategoriesPath: blogCategoriesListPath,
              count: category.items.length,
              seoTitle: category.seo?.title,
              seoDescription: category.seo?.description,
            };
            const categoryPropPath = await createData(
              `${utils.docuHash(
                `${metadata.permalink}${CATEGORY_DATA_SUFFIX}`,
              )}${JSON_FILE_EXTENSION}`,
              JSON.stringify(categoryProp, null, 2),
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(
                `${metadata.permalink}${CATEGORY_DATA_SUFFIX}`,
              )}${LIST_DATA_SUFFIX}${JSON_FILE_EXTENSION}`,
              JSON.stringify(metadata, null, 2),
            );

            const categoriesPropPath = await getCategoriesPropPath();

            addRoute({
              path: metadata.permalink,
              component: BLOG_CATEGORY_POSTS_PAGE_COMPONENT,
              exact: true,
              modules: {
                items: blogPostItemsModule(items),
                featuredPosts: blogPostItemsModule(featuredBlogPostIds),
                category: aliasedSource(categoryPropPath),
                categories: aliasedSource(categoriesPropPath),
                listMetadata: aliasedSource(listMetadataPath),
              },
            });
          }),
        );
      }

      if (hasTags) {
        await createTagsListPage();
        await Promise.all(Object.values(blogTags).map(createTagPostsListPage));
      }

      if (hasCategories) {
        await createCategoriesListPage();
        await Promise.all(
          Object.values(blogCategories).map(createCategoryPostsListPage),
        );
      }
    },

    /**
     * Runs after build completes. All plugin postBuild hooks execute
     * concurrently via Promise.all, so we wait for the sitemap plugin
     * to finish writing sitemap.xml before patching it.
     */
    async postBuild({ outDir }) {
      if (Object.keys(blogLastmodMap).length === 0) return;

      const sitemapPath = path.join(outDir, "sitemap.xml");
      const sitemapReady = await waitForFile(sitemapPath);

      if (!sitemapReady) {
        console.warn(
          "[blog-plugin] sitemap.xml not found after timeout, skipping <lastmod> injection.",
        );
        return;
      }

      injectSitemapLastmod(sitemapPath);
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
