import type * as Types from "./schema.types";

export type CategoryCreateMutationVariables = Types.Exact<{
  input: Types.CreateOneCategoryInput;
}>;

export type CategoryCreateMutation = {
  createOneCategory: Pick<Types.Category, "id" | "title">;
};

export type CategoryEditMutationVariables = Types.Exact<{
  input: Types.UpdateOneCategoryInput;
}>;

export type CategoryEditMutation = {
  updateOneCategory: Pick<Types.Category, "id" | "title">;
};

export type CategoriesListQueryVariables = Types.Exact<{
  paging: Types.OffsetPaging;
  filter?: Types.InputMaybe<Types.CategoryFilter>;
  sorting: Array<Types.CategorySort> | Types.CategorySort;
}>;

export type CategoriesListQuery = {
  categories: Pick<Types.CategoryConnection, "totalCount"> & {
    nodes: Array<Pick<Types.Category, "id" | "title" | "createdAt">>;
  };
};

export type PostCreateMutationVariables = Types.Exact<{
  input: Types.CreateOneBlogPostInput;
}>;

export type PostCreateMutation = {
  createOneBlogPost: Pick<
    Types.BlogPost,
    "id" | "title" | "status" | "content"
  > & { category: Pick<Types.Category, "id"> };
};

export type PostEditMutationVariables = Types.Exact<{
  input: Types.UpdateOneBlogPostInput;
}>;

export type PostEditMutation = {
  updateOneBlogPost: Pick<
    Types.BlogPost,
    "id" | "title" | "status" | "categoryId" | "content"
  > & { category: Pick<Types.Category, "id" | "title"> };
};

export type BlogPostsListQueryVariables = Types.Exact<{
  paging: Types.OffsetPaging;
  filter?: Types.InputMaybe<Types.BlogPostFilter>;
  sorting: Array<Types.BlogPostSort> | Types.BlogPostSort;
}>;

export type BlogPostsListQuery = {
  blogPosts: Pick<Types.BlogPostConnection, "totalCount"> & {
    nodes: Array<
      Pick<Types.BlogPost, "id" | "title" | "content" | "createdAt"> & {
        category: Pick<Types.Category, "title">;
      }
    >;
  };
};

export type PostShowQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type PostShowQuery = {
  blogPost: Pick<Types.BlogPost, "id" | "title" | "status" | "content"> & {
    category: Pick<Types.Category, "title">;
  };
};

export type CategoriesSelectQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type CategoriesSelectQuery = {
  categories: { nodes: Array<Pick<Types.Category, "id" | "title">> };
};

export type GetFieldsFromList<Q extends Record<string, any>> =
  Q[keyof Q]["nodes"][0];

export type GetFields<Q extends Record<string, any>> = Q[keyof Q];

export type GetVariables<Q extends Record<"input", any>> =
  Q["input"]["update"] extends object
    ? Q["input"]["update"]
    : Q["input"][keyof Q["input"]];
