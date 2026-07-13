import { useEffect } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useBack, useSelect } from "@refinedev/core";

export const PostEdit: React.FC = () => {
  const back = useBack();
  const {
    refineCore: { onFinish, formLoading, query: queryResult },
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    saveButtonProps,
  } = useForm();

  const { options } = useSelect({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category?.id,

    queryOptions: {
      enabled: !!queryResult?.data?.data?.category?.id,
    },

    pagination: {
      mode: "server",
    },
  });

  useEffect(() => {
    setValue("category.id", queryResult?.data?.data?.category?.id);
  }, [queryResult?.data]);

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input id="title" {...register("title", { required: true })} />
      {errors.title && <span id="title-error">This field is required</span>}
      <br />
      <label>Status: </label>
      <select id="status" {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Category: </label>
      <select
        id="category"
        {...register("category.id", {
          required: true,
        })}
        defaultValue={queryResult?.data?.data.category.id}
      >
        {options?.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {errors.category && (
        <span id="category-error">This field is required</span>
      )}
      <br />
      <label>Content: </label>
      <br />
      <textarea
        id="content"
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span id="content-error">This field is required</span>}
      <br />

      {queryResult?.data?.data?.thumbnail && (
        <>
          <br />
          <label>Image: </label>
          <br />

          <img
            src={queryResult?.data?.data?.thumbnail}
            width={200}
            height={200}
          />
          <br />
          <br />
        </>
      )}
      <button onClick={back}>Cancel</button>
      <input type="submit" value="Submit" disabled={saveButtonProps.disabled} />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
