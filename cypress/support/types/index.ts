import type posts from "../../fixtures/posts.json";
import type categories from "../../fixtures/categories.json";

export type IPost = (typeof posts)[number];
export type ICategory = (typeof categories)[number];
