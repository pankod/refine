import { type HttpError, useForm } from "@refinedev/core";

import type { IPost } from "../../interfaces";

type FormValues = Omit<IPost, "id">;

export const PostCreate: React.FC = () => {
  const {
    formLoading,
    onFinish,
    query: queryResult,
  } = useForm<IPost, HttpError, FormValues>();

  // if action is "clone", we'll have defaultValues
  const defaultValues = queryResult?.data?.data;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const values = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    onFinish(values).catch(() => {});
  };

  return (
    <div>
      <form onSubmit={(event) => submit(event)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            defaultValue={defaultValues?.title || ""}
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Content"
            rows={10}
            defaultValue={defaultValues?.content || ""}
          />
        </div>
        <button type="submit" disabled={formLoading}>
          {formLoading && <div>Loading...</div>}
          <span>Save</span>
        </button>
      </form>
    </div>
  );
};
