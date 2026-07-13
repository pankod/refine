export interface ICategory {
  _updatedAt: string;
  _createdAt: string;
  _rev: string;
  _type: string;
  description: string;
  _id: string;
  title: string;
}

export interface IPost {
  _createdAt: string;
  content: string;
  slug: {
    current: string;
  };
  title: string;
  _id: string;
  categories: {
    _ref: string;
    _type: string;
    _key: string;
  }[];
  _type: string;
  _updatedAt: string;
  _rev: string;
}
