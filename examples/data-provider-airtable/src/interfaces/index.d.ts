export interface ICategory {
  id: string;
  title: string;
}

export interface IPost {
  id: string;
  title: string;
  status: "published" | "draft" | "rejected";
  category: string[];
  content: string;
  image: IImage[];
}

interface IImage {
  id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  thumbnails: {
    full: IImageThumbnails;
    large: IImageThumbnails;
    small: IImageThumbnails;
  };
}

interface IImageThumbnails {
  height: number;
  url: string;
  width: number;
}
