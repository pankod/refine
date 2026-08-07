"use client";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Link, useSelect, useTranslate } from "@refinedev/core";
import type { BlogPost, Category } from "@types";

export default function BlogPostEdit() {
  const translate = useTranslate();

  const {
    refineCore: { onFinish, query },
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<BlogPost>();
  const data = query?.data?.data;

  const { options: categoryOptions } = useSelect<Category>({
    resource: "categories",
    defaultValue: query?.data?.data?.category?.id,

    pagination: {
      mode: "server",
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />

      <h1>
        {translate("blog_posts.titles.edit")} #{data?.id}
      </h1>
      <form onSubmit={handleSubmit(onFinish)}>
        <div>
          <label htmlFor="title">{translate("blog_posts.fields.title")}</label>
          <br />
          <Controller
            control={control}
            name="title"
            rules={{ required: "This field is required" }}
            render={({ field }) => {
              return (
                <input
                  {...field}
                  value={field.value || ""}
                  id="title"
                  type="text"
                />
              );
            }}
          />
          {errors.title && <span>{errors.title.message?.toString()}</span>}
        </div>

        <div>
          <label htmlFor="content">
            {translate("blog_posts.fields.content")}
          </label>
          <br />
          <Controller
            control={control}
            name="content"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <textarea {...field} id="content" rows={5} />
            )}
          />
          {errors.content && <span>{errors.content.message?.toString()}</span>}
        </div>

        <div>
          <label htmlFor="category">
            {translate("blog_posts.fields.category")}
          </label>
          <br />
          <Controller
            control={control}
            name="category.id"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <select {...field} id="category">
                {categoryOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.category && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="status">
            {translate("blog_posts.fields.status.title")}
          </label>
          <br />
          <Controller
            control={control}
            name="status"
            rules={{ required: "This field is required" }}
            defaultValue="draft"
            render={({ field }) => (
              <select {...field} id="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          />
          {errors.status && <span>{errors.status.message?.toString()}</span>}
        </div>

        <br />

        <button type="submit">{translate("buttons.save")}</button>
        <button type="button">
          <Link go={{ to: { resource: "blog_posts", action: "list" } }}>
            {translate("buttons.cancel")}
          </Link>
        </button>
      </form>
    </div>
  );
}
