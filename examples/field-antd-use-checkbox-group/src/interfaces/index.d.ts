export interface ITag {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  tags: Array<string>;
}
