export type BlogPost = {
  id: number;
  title: string;
  content: string;
  category: {
    id: number;
  };
  status: "draft" | "published" | "rejected";
  createdAt: string;
};

export type Category = {
  id: number;
  title: string;
};
