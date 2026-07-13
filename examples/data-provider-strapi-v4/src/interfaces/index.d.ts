export interface ICategory {
  id: string;
  title: string;
}

export interface IPost {
  id: string;
  title: string;
  category: ICategory;
  content: string;
  locale: string;
  createdAt: string;
  cover: {
    id: number;
    name: string;
    alternativeText: any;
    caption: any;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: any;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  }[];
}
