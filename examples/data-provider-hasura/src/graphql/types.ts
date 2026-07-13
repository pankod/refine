import type * as Types from "./schema.types";

export type GetCategoriesQueryVariables = Types.Exact<{
  offset: Types.Scalars["Int"]["input"];
  limit: Types.Scalars["Int"]["input"];
  order_by?: Types.InputMaybe<
    Array<Types.Categories_Order_By> | Types.Categories_Order_By
  >;
  where?: Types.InputMaybe<Types.Categories_Bool_Exp>;
}>;

export type GetCategoriesQuery = {
  categories: Array<Pick<Types.Categories, "id" | "title" | "created_at">>;
  categories_aggregate: {
    aggregate?: Types.Maybe<Pick<Types.Categories_Aggregate_Fields, "count">>;
  };
};

export type CreateCategoryMutationVariables = Types.Exact<{
  object: Types.Categories_Insert_Input;
}>;

export type CreateCategoryMutation = {
  insert_categories_one?: Types.Maybe<Pick<Types.Categories, "id">>;
};

export type UpdateCategoryMutationVariables = Types.Exact<{
  id: Types.Scalars["uuid"]["input"];
  object: Types.Categories_Set_Input;
}>;

export type UpdateCategoryMutation = {
  update_categories_by_pk?: Types.Maybe<Pick<Types.Categories, "id" | "title">>;
};

export type GetPostsQueryVariables = Types.Exact<{
  offset: Types.Scalars["Int"]["input"];
  limit: Types.Scalars["Int"]["input"];
  order_by?: Types.InputMaybe<
    Array<Types.Posts_Order_By> | Types.Posts_Order_By
  >;
  where?: Types.InputMaybe<Types.Posts_Bool_Exp>;
}>;

export type GetPostsQuery = {
  posts: Array<
    Pick<
      Types.Posts,
      "id" | "title" | "content" | "category_id" | "created_at"
    > & { category?: Types.Maybe<Pick<Types.Categories, "id" | "title">> }
  >;
  posts_aggregate: {
    aggregate?: Types.Maybe<Pick<Types.Posts_Aggregate_Fields, "count">>;
  };
};

export type GetPostQueryVariables = Types.Exact<{
  id: Types.Scalars["uuid"]["input"];
}>;

export type GetPostQuery = {
  posts_by_pk: Types.Maybe<
    Pick<Types.Posts, "id" | "title" | "content"> & {
      category?: Types.Maybe<Pick<Types.Categories, "id" | "title">>;
    }
  >;
};

export type CreatePostMutationVariables = Types.Exact<{
  object: Types.Posts_Insert_Input;
}>;

export type CreatePostMutation = {
  insert_posts_one?: Types.Maybe<Pick<Types.Posts, "id">>;
};

export type UpdatePostMutationVariables = Types.Exact<{
  id: Types.Scalars["uuid"]["input"];
  object: Types.Posts_Set_Input;
}>;

export type UpdatePostMutation = {
  update_posts_by_pk?: Types.Maybe<
    Pick<Types.Posts, "id" | "title" | "content" | "category_id"> & {
      category?: Types.Maybe<Pick<Types.Categories, "id" | "title">>;
    }
  >;
};

export type DeletePostMutationVariables = Types.Exact<{
  id: Types.Scalars["uuid"]["input"];
}>;

export type DeletePostMutation = {
  delete_posts_by_pk?: Types.Maybe<
    Pick<Types.Posts, "id" | "content"> & {
      category?: Types.Maybe<Pick<Types.Categories, "id">>;
    }
  >;
};

export type GetPostCategoriesSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.Categories_Bool_Exp>;
}>;

export type GetPostCategoriesSelectQuery = {
  categories: Array<Pick<Types.Categories, "id" | "title">>;
  categories_aggregate: {
    aggregate?: Types.Maybe<Pick<Types.Categories_Aggregate_Fields, "count">>;
  };
};
