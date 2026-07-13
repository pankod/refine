export type FeedSection = {
  content: string;
  // frontmatter
  title: string;
  featured?: boolean;
  date: string;
  author: string;
  avatar: string;
  cover?: string;
};

export type Feed = FeedSection[];
