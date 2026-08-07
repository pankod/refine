export interface ICategory {
  id: string;
  title: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  status: string;
  category: ICategory;
  categoryId: string;
}
