export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  hit: number;
  category: {
    id: number;
  };
  user: {
    id: number;
  };
  status: string;
  status_color: string;
  createdAt: string;
  publishedAt: string;
  image: Array<{
    url: string;
    name: string;
    status: string;
    type: string;
    uid: string;
  }>;
  tags: Array<number>;
  language: number;
};

export type Category = {
  id: number;
  title: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  birthday: string;
  skills: Array<string>;
  avatar: Array<{
    name: string;
    percent: number;
    size: number;
    status: string;
    type: string;
    uid: string;
    url: string;
  }>;
};

export type Tag = {
  id: number;
  title: string;
};
