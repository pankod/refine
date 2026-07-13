import fetch from "node-fetch";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

import type { Feed, FeedSection } from "@refinedev/devtools-shared";

import { FEED_MD_URL } from "src/constants";

const splitSections = (feed: string) => {
  const sections = feed.split("---section");

  return sections.slice(1).map((section) => `---section${section}`);
};

const contentToHtml = (content: string) => {
  const renderer = new marked.Renderer();
  renderer.link = function (...args) {
    const out = marked.Renderer.prototype.link.apply(this, args);
    return out.replace(/^<a/, '<a target="_blank" rel="noopener noreferrer"');
  };

  const html = marked(content, {
    renderer,
  });

  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src"],
    },
  });
};

const parseSection = (section: string): FeedSection => {
  const parsed = matter(section.replace("---section", "---"));

  return {
    ...parsed.data,
    content: contentToHtml(parsed.content),
  } as FeedSection;
};

const fetchFeed = async () => {
  try {
    const response = await fetch(FEED_MD_URL);

    return response.text();
  } catch (_) {
    return "";
  }
};

export const getFeed = async (): Promise<Feed> => {
  try {
    const rawContent = await fetchFeed();
    const rawSections = splitSections(rawContent);
    const sections = rawSections.map(parseSection);

    return sections;
  } catch (e) {
    return [];
  }
};
