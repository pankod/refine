import gql from "graphql-tag";
import { type Action, getMetaProps } from ".";
import type { InferencerComponentProps } from "@/types";

// remove all indentation, newlines, empty spaces
const getMetaPropsForTest = (
  identifier?: string,
  meta?: InferencerComponentProps["meta"],
  actions?: Action[],
) => getMetaProps(identifier, meta, actions).replace(/\s/g, "");

describe("getMetaProps", () => {
  it("should return empty string if no meta, actions, or identifier", () => {
    expect(getMetaProps("posts")).toBe("");
  });

  it("should return empty string if no meta or actions", () => {
    expect(getMetaProps("posts", {})).toBe("");
  });

  it("should return empty string if no actions", () => {
    expect(getMetaProps("posts", {}, [])).toBe("");
  });

  it("should correctly return meta props", () => {
    const inferencerPredefinedMeta: InferencerComponentProps["meta"] = {
      blog_posts: {
        getOne: {
          shouldNotExist: {
            bar: "baz",
            other: ["foo", "bar"],
          },
          gqlQuery: gql`
                        query GetBlogPost($id: uuid!) {
                            blog_posts_by_pk(id: $id) {
                                id
                                title
                                content
                                category_id
                                created_at
                                status
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
        },
        create: {
          shouldExist: {
            bar: "baz",
            other: ["foo", "bar"],
          },
          gqlMutation: gql`
                        mutation CreateBlogPosts(
                            $object: blog_posts_insert_input!
                        ) {
                            insert_blog_posts_one(object: $object) {
                                id
                                title
                                content
                                created_at
                                category_id
                                status
                                category {
                                    id
                                    title
                                }
                            }
                        }
                    `,
        },

        default: { foo: "bar" },
      },
      categories: {
        getList: {
          gqlQuery: gql`
                        query CategoriesList(
                            $offset: Int
                            $limit: Int
                            $order_by: [categories_order_by!]
                            $where: categories_bool_exp
                        ) {
                            categories(
                                offset: $offset
                                limit: $limit
                                order_by: $order_by
                                where: $where
                            ) {
                                id
                                title
                                created_at
                            }
                            categories_aggregate(where: $where) {
                                aggregate {
                                    count
                                }
                            }
                        }
                    `,
        },
      },
    };

    // should return only blog_posts.create meta props
    // because it is the first founded action in inferencerPredefinedMeta
    const result = getMetaPropsForTest("blog_posts", inferencerPredefinedMeta, [
      "update",
      "create",
      "getOne",
    ]);
    expect(result).toBe(
      'meta:{shouldExist:{"bar":"baz","other":["foo","bar"]},gqlMutation:gql`mutationCreateBlogPosts($object:blog_posts_insert_input!){insert_blog_posts_one(object:$object){idtitlecontentcreated_atcategory_idstatuscategory{idtitle}}}`}',
    );
  });

  it("should correctly return default when no action", () => {
    const inferencerPredefinedMeta: InferencerComponentProps["meta"] = {
      blog_posts: {
        getList: {
          gqlQuery: gql`
                        query BlogPostsList(
                            $offset: Int!
                            $limit: Int!
                            $order_by: [blog_posts_order_by!]
                            $where: blog_posts_bool_exp
                        ) {
                            blog_posts(
                                offset: $offset
                                limit: $limit
                                order_by: $order_by
                                where: $where
                            ) {
                                id
                                title
                                content
                                category_id
                                created_at
                                status
                                category {
                                    id
                                    title
                                }
                            }
                            blog_posts_aggregate(where: $where) {
                                aggregate {
                                    count
                                }
                            }
                        }
                    `,
        },
      },
      categories: {
        getList: {
          gqlQuery: gql`
                        query CategoriesList(
                            $offset: Int
                            $limit: Int
                            $order_by: [categories_order_by!]
                            $where: categories_bool_exp
                        ) {
                            categories(
                                offset: $offset
                                limit: $limit
                                order_by: $order_by
                                where: $where
                            ) {
                                id
                                title
                                created_at
                            }
                            categories_aggregate(where: $where) {
                                aggregate {
                                    count
                                }
                            }
                        }
                    `,
        },
        default: { foo: "bar" },
      },
    };

    // should return empty string when
    // 1. no blog_posts.default in inferencerPredefinedMeta
    // 2. no founded action in inferencerPredefinedMeta
    const result = getMetaPropsForTest("blog_posts", inferencerPredefinedMeta, [
      "create",
      "update",
      "getOne",
    ]);
    expect(result).toBe("");

    // add default
    inferencerPredefinedMeta.blog_posts["default"] = {
      gqlQuery: gql`
                query DefaultQuery($id: uuid!) {
                    default(id: $id) {
                        id
                        category {
                            id
                            title
                        }
                    }
                }
            `,
    };

    // should return blog_posts.default from inferencerPredefinedMeta
    const resultWithDefault = getMetaPropsForTest(
      "blog_posts",
      inferencerPredefinedMeta,
      ["create", "update", "getOne"],
    );
    expect(resultWithDefault).toBe(
      "meta:{gqlQuery:gql`queryDefaultQuery($id:uuid!){default(id:$id){idcategory{idtitle}}}`}",
    );
  });

  it("should correctly return first founded action and disgards rest", () => {
    const inferencerPredefinedMeta: InferencerComponentProps["meta"] = {
      blog_posts: {
        create: {
          createFoo: "createBar",
        },
        update: {
          updateFoo: "updateBar",
        },
        getOne: {
          getOneFoo: "getOneBar",
        },
        getList: {
          getListFoo: "getListBar",
        },
      },
    };

    // should return only blog_posts.getOne meta props
    // because it is the first founded action in inferencerPredefinedMeta
    const result = getMetaPropsForTest("blog_posts", inferencerPredefinedMeta, [
      "getOne",
      "update",
      "create",
      "getList",
    ]);
    expect(result).toBe('meta:{getOneFoo:"getOneBar"}');
  });

  it("should return empty string when params are undefined ", () => {
    expect(getMetaPropsForTest(undefined, undefined, undefined)).toBe("");
    expect(getMetaPropsForTest(undefined, {}, [])).toBe("");
    expect(getMetaPropsForTest("foo", undefined, undefined)).toBe("");
    expect(getMetaPropsForTest("foo", {}, undefined)).toBe("");
    expect(getMetaPropsForTest("foo", {}, [])).toBe("");
    expect(getMetaPropsForTest("foo", undefined, [undefined as any])).toBe("");
  });
});
