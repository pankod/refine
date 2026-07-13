import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";

export const PostCreate: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { options } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit(onFinish)}>
        <label>Title: </label>
        <input {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}
        <br />
        <label>Status: </label>
        <select {...register("status")}>
          <option value="published">published</option>
          <option value="draft">draft</option>
          <option value="rejected">rejected</option>
        </select>
        <br />
        <label>Category: </label>
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
        <br />
        <label>Content: </label>
        <br />
        <textarea
          {...register("content", { required: true })}
          rows={10}
          cols={50}
        />
        {errors.content && <span>This field is required</span>}
        <br />
        <br />
        <input type="submit" disabled={formLoading} value="Submit" />
        {formLoading && <p>Loading</p>}
      </form>
    </>
  );
};
