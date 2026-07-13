import { AutoSaveIndicator, useForm } from "@refinedev/core";

import type { IPost } from "../../interfaces";

type FormValues = Omit<IPost, "id">;

export const PostEdit: React.FC = () => {
  const {
    formLoading,
    onFinish,
    query: queryResult,
    autoSaveProps,
    onFinishAutoSave,
  } = useForm<FormValues>({
    autoSave: {
      enabled: true,
    },
  });

  const defaultValues = queryResult?.data?.data;

  const submit = (
    event: React.FormEvent<HTMLFormElement>,
    isAutosave?: boolean,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const values = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    (isAutosave ? onFinishAutoSave : onFinish)(values).catch(() => {});
  };

  return (
    <div>
      <AutoSaveIndicator {...autoSaveProps} />
      <form
        onSubmit={(event) => submit(event)}
        onChange={(event) => submit(event, true)}
      >
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
