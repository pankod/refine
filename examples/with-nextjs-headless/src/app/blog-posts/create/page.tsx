"use client";

import { useForm } from "@refinedev/react-hook-form";
import { Link, useSelect, useTranslate } from "@refinedev/core";
import type { BlogPost, Category } from "@types";

export default function BlogPostCreate() {
  const translate = useTranslate();

  const {
    refineCore: { onFinish },
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BlogPost>();

  const { options } = useSelect<Category>({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <div>
      <h1>{translate("blog_posts.titles.create")}</h1>
      <form onSubmit={handleSubmit(onFinish)}>
        <div>
          <label>{translate("blog_posts.fields.title")}</label>
          <br />
          <input
            type="text"
            {...register("title", {
              required: "This field is required",
            })}
          />
          {errors.title && <span>{errors.title.message?.toString()}</span>}
        </div>

        <br />

        <div>
          <label>{translate("blog_posts.fields.category")}</label>
          <br />
          <select
            defaultValue={""}
            {...register("category.id", { required: true })}
          >
            <option value={""} disabled>
              Please select
            </option>
            {options?.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && <span>This field is required</span>}
        </div>

        <br />
        <div>
          <label>{translate("blog_posts.fields.content")}</label>
          <br />
          <textarea
            {...register("content", {
              required: "This field is required",
            })}
          />
          {errors.content && <span>{errors.content.message?.toString()}</span>}
        </div>

        <br />
        <button type="submit">{translate("blog_posts.buttons.save")}</button>
        <button type="button">
          <Link to="/blog-posts">Cancel</Link>
        </button>
      </form>
    </div>
  );
}
