export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type BlogPost = {
  category: Category;
  categoryId: Scalars["ID"]["output"];
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  status: PostStatus;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type BlogPostAggregateFilter = {
  and?: InputMaybe<Array<BlogPostAggregateFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<BlogPostAggregateFilter>>;
  status?: InputMaybe<PostStatusFilterComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BlogPostAggregateGroupBy = {
  categoryId?: Maybe<Scalars["ID"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  status?: Maybe<PostStatus>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BlogPostAggregateGroupByCreatedAtArgs = {
  by?: GroupBy;
};

export type BlogPostAggregateGroupByUpdatedAtArgs = {
  by?: GroupBy;
};

export type BlogPostAggregateResponse = {
  avg?: Maybe<BlogPostAvgAggregate>;
  count?: Maybe<BlogPostCountAggregate>;
  groupBy?: Maybe<BlogPostAggregateGroupBy>;
  max?: Maybe<BlogPostMaxAggregate>;
  min?: Maybe<BlogPostMinAggregate>;
  sum?: Maybe<BlogPostSumAggregate>;
};

export type BlogPostAvgAggregate = {
  categoryId?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type BlogPostConnection = {
  /** Array of nodes. */
  nodes: Array<BlogPost>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars["Int"]["output"];
};

export type BlogPostCountAggregate = {
  categoryId?: Maybe<Scalars["Int"]["output"]>;
  content?: Maybe<Scalars["Int"]["output"]>;
  createdAt?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["Int"]["output"]>;
};

export type BlogPostDeleteFilter = {
  and?: InputMaybe<Array<BlogPostDeleteFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<BlogPostDeleteFilter>>;
  status?: InputMaybe<PostStatusFilterComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BlogPostDeleteResponse = {
  categoryId?: Maybe<Scalars["ID"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  status?: Maybe<PostStatus>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BlogPostFilter = {
  and?: InputMaybe<Array<BlogPostFilter>>;
  category?: InputMaybe<BlogPostFilterCategoryFilter>;
  categoryId?: InputMaybe<IdFilterComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<BlogPostFilter>>;
  status?: InputMaybe<PostStatusFilterComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BlogPostFilterCategoryFilter = {
  and?: InputMaybe<Array<BlogPostFilterCategoryFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<BlogPostFilterCategoryFilter>>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BlogPostMaxAggregate = {
  categoryId?: Maybe<Scalars["ID"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  status?: Maybe<PostStatus>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BlogPostMinAggregate = {
  categoryId?: Maybe<Scalars["ID"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  status?: Maybe<PostStatus>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BlogPostSort = {
  direction: SortDirection;
  field: BlogPostSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type BlogPostSortFields =
  | "categoryId"
  | "content"
  | "createdAt"
  | "id"
  | "status"
  | "title"
  | "updatedAt";

export type BlogPostSubscriptionFilter = {
  and?: InputMaybe<Array<BlogPostSubscriptionFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<BlogPostSubscriptionFilter>>;
  status?: InputMaybe<PostStatusFilterComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BlogPostSumAggregate = {
  categoryId?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type BlogPostUpdateFilter = {
  and?: InputMaybe<Array<BlogPostUpdateFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<BlogPostUpdateFilter>>;
  status?: InputMaybe<PostStatusFilterComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type Category = {
  blogPosts: CategoryBlogPostsConnection;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type CategoryBlogPostsArgs = {
  filter?: BlogPostFilter;
  paging?: OffsetPaging;
  sorting?: Array<BlogPostSort>;
};

export type CategoryBlogPostsConnection = {
  /** Array of nodes. */
  nodes: Array<BlogPost>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars["Int"]["output"];
};

export type CategoryConnection = {
  /** Array of nodes. */
  nodes: Array<Category>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars["Int"]["output"];
};

export type CategoryCreateInput = {
  title: Scalars["String"]["input"];
};

export type CategoryDeleteFilter = {
  and?: InputMaybe<Array<CategoryDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CategoryDeleteFilter>>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CategoryDeleteResponse = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CategoryFilter = {
  and?: InputMaybe<Array<CategoryFilter>>;
  blogPosts?: InputMaybe<CategoryFilterBlogPostFilter>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CategoryFilter>>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CategoryFilterBlogPostFilter = {
  and?: InputMaybe<Array<CategoryFilterBlogPostFilter>>;
  categoryId?: InputMaybe<IdFilterComparison>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CategoryFilterBlogPostFilter>>;
  status?: InputMaybe<PostStatusFilterComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CategorySort = {
  direction: SortDirection;
  field: CategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type CategorySortFields = "createdAt" | "id" | "title" | "updatedAt";

export type CategorySubscriptionFilter = {
  and?: InputMaybe<Array<CategorySubscriptionFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CategorySubscriptionFilter>>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CategoryUpdateFilter = {
  and?: InputMaybe<Array<CategoryUpdateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CategoryUpdateFilter>>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CategoryUpdateInput = {
  title: Scalars["String"]["input"];
};

export type CreateBlogPostSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BlogPostSubscriptionFilter;
};

export type CreateCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: CategorySubscriptionFilter;
};

export type CreateManyBlogPostsInput = {
  /** Array of records to create */
  blogPosts: Array<PostCreateInput>;
};

export type CreateManyCategoriesInput = {
  /** Array of records to create */
  categories: Array<CategoryCreateInput>;
};

export type CreateOneBlogPostInput = {
  /** The record to create */
  blogPost: PostCreateInput;
};

export type CreateOneCategoryInput = {
  /** The record to create */
  category: CategoryCreateInput;
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  is?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNot?: InputMaybe<Scalars["Boolean"]["input"]>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  neq?: InputMaybe<Scalars["DateTime"]["input"]>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars["DateTime"]["input"];
  upper: Scalars["DateTime"]["input"];
};

export type DeleteManyBlogPostsInput = {
  /** Filter to find records to delete */
  filter: BlogPostDeleteFilter;
};

export type DeleteManyCategoriesInput = {
  /** Filter to find records to delete */
  filter: CategoryDeleteFilter;
};

export type DeleteManyResponse = {
  /** The number of records deleted. */
  deletedCount: Scalars["Int"]["output"];
};

export type DeleteOneBlogPostInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]["input"];
};

export type DeleteOneBlogPostSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BlogPostSubscriptionFilter;
};

export type DeleteOneCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]["input"];
};

export type DeleteOneCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: CategorySubscriptionFilter;
};

/** Group by */
export type GroupBy = "DAY" | "MONTH" | "WEEK" | "YEAR";

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  iLike?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  is?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNot?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["ID"]["input"]>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  neq?: InputMaybe<Scalars["ID"]["input"]>;
  notILike?: InputMaybe<Scalars["ID"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  notLike?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Mutation = {
  createManyBlogPosts: Array<BlogPost>;
  createManyCategories: Array<Category>;
  createOneBlogPost: BlogPost;
  createOneCategory: Category;
  deleteManyBlogPosts: DeleteManyResponse;
  deleteManyCategories: DeleteManyResponse;
  deleteOneBlogPost: BlogPostDeleteResponse;
  deleteOneCategory: CategoryDeleteResponse;
  updateManyBlogPosts: UpdateManyResponse;
  updateManyCategories: UpdateManyResponse;
  updateOneBlogPost: BlogPost;
  updateOneCategory: Category;
};

export type MutationCreateManyBlogPostsArgs = {
  input: CreateManyBlogPostsInput;
};

export type MutationCreateManyCategoriesArgs = {
  input: CreateManyCategoriesInput;
};

export type MutationCreateOneBlogPostArgs = {
  input: CreateOneBlogPostInput;
};

export type MutationCreateOneCategoryArgs = {
  input: CreateOneCategoryInput;
};

export type MutationDeleteManyBlogPostsArgs = {
  input: DeleteManyBlogPostsInput;
};

export type MutationDeleteManyCategoriesArgs = {
  input: DeleteManyCategoriesInput;
};

export type MutationDeleteOneBlogPostArgs = {
  input: DeleteOneBlogPostInput;
};

export type MutationDeleteOneCategoryArgs = {
  input: DeleteOneCategoryInput;
};

export type MutationUpdateManyBlogPostsArgs = {
  input: UpdateManyBlogPostsInput;
};

export type MutationUpdateManyCategoriesArgs = {
  input: UpdateManyCategoriesInput;
};

export type MutationUpdateOneBlogPostArgs = {
  input: UpdateOneBlogPostInput;
};

export type MutationUpdateOneCategoryArgs = {
  input: UpdateOneCategoryInput;
};

export type OffsetPageInfo = {
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars["Boolean"]["output"]>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars["Boolean"]["output"]>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type PostCreateInput = {
  categoryId: Scalars["ID"]["input"];
  content: Scalars["String"]["input"];
  status: PostStatus;
  title: Scalars["String"]["input"];
};

export type PostStatus = "DRAFT" | "PUBLISHED" | "REJECTED";

export type PostStatusFilterComparison = {
  eq?: InputMaybe<PostStatus>;
  gt?: InputMaybe<PostStatus>;
  gte?: InputMaybe<PostStatus>;
  iLike?: InputMaybe<PostStatus>;
  in?: InputMaybe<Array<PostStatus>>;
  is?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNot?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<PostStatus>;
  lt?: InputMaybe<PostStatus>;
  lte?: InputMaybe<PostStatus>;
  neq?: InputMaybe<PostStatus>;
  notILike?: InputMaybe<PostStatus>;
  notIn?: InputMaybe<Array<PostStatus>>;
  notLike?: InputMaybe<PostStatus>;
};

export type PostUpdateInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<PostStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  blogPost: BlogPost;
  blogPostAggregate: Array<BlogPostAggregateResponse>;
  blogPosts: BlogPostConnection;
  categories: CategoryConnection;
  category: Category;
};

export type QueryBlogPostArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryBlogPostAggregateArgs = {
  filter?: InputMaybe<BlogPostAggregateFilter>;
};

export type QueryBlogPostsArgs = {
  filter?: BlogPostFilter;
  paging?: OffsetPaging;
  sorting?: Array<BlogPostSort>;
};

export type QueryCategoriesArgs = {
  filter?: CategoryFilter;
  paging?: OffsetPaging;
  sorting?: Array<CategorySort>;
};

export type QueryCategoryArgs = {
  id: Scalars["ID"]["input"];
};

/** Sort Directions */
export type SortDirection = "ASC" | "DESC";

/** Sort Nulls Options */
export type SortNulls = "NULLS_FIRST" | "NULLS_LAST";

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  iLike?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  is?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNot?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
  notILike?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
};

export type Subscription = {
  createdBlogPost: BlogPost;
  createdCategory: Category;
  deletedManyBlogPosts: DeleteManyResponse;
  deletedManyCategories: DeleteManyResponse;
  deletedOneBlogPost: BlogPostDeleteResponse;
  deletedOneCategory: CategoryDeleteResponse;
  updatedManyBlogPosts: UpdateManyResponse;
  updatedManyCategories: UpdateManyResponse;
  updatedOneBlogPost: BlogPost;
  updatedOneCategory: Category;
};

export type SubscriptionCreatedBlogPostArgs = {
  input?: InputMaybe<CreateBlogPostSubscriptionFilterInput>;
};

export type SubscriptionCreatedCategoryArgs = {
  input?: InputMaybe<CreateCategorySubscriptionFilterInput>;
};

export type SubscriptionDeletedOneBlogPostArgs = {
  input?: InputMaybe<DeleteOneBlogPostSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneCategoryArgs = {
  input?: InputMaybe<DeleteOneCategorySubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneBlogPostArgs = {
  input?: InputMaybe<UpdateOneBlogPostSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneCategoryArgs = {
  input?: InputMaybe<UpdateOneCategorySubscriptionFilterInput>;
};

export type UpdateManyBlogPostsInput = {
  /** Filter used to find fields to update */
  filter: BlogPostUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: PostUpdateInput;
};

export type UpdateManyCategoriesInput = {
  /** Filter used to find fields to update */
  filter: CategoryUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: CategoryUpdateInput;
};

export type UpdateManyResponse = {
  /** The number of records updated. */
  updatedCount: Scalars["Int"]["output"];
};

export type UpdateOneBlogPostInput = {
  /** The id of the record to update */
  id: Scalars["ID"]["input"];
  /** The update to apply. */
  update: PostUpdateInput;
};

export type UpdateOneBlogPostSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BlogPostSubscriptionFilter;
};

export type UpdateOneCategoryInput = {
  /** The id of the record to update */
  id: Scalars["ID"]["input"];
  /** The update to apply. */
  update: CategoryUpdateInput;
};

export type UpdateOneCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: CategorySubscriptionFilter;
};
