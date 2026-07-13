/**
 * This `meta` object is used to define the necessary metadata for inferencer to work with.
 *
 * They will be used to infer the fields of the response of the data provider.
 * Also they will be included in the generated code, making them easily editable after you generate the boilerplate code for your resource.
 */
export const inferencerPredefinedMeta = {
  blog_posts: {
    getList: {
      fields: [
        "id",
        "title",
        {
          category: ["id", "title"],
        },
        "category_id",
        "content",
        "created_at",
      ],
    },
    getOne: {
      fields: ["id", "title", "content", "category_id"],
    },
  },
  categories: {
    getList: {
      fields: ["id", "title", "created_at"],
    },
    default: {
      fields: ["id", "title"],
    },
  },
};
