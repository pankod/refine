export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

export interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}
