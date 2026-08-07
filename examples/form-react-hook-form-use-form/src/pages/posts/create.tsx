import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useSelect, useApiUrl, useBack } from "@refinedev/core";

import axios from "axios";

export const PostCreate: React.FC = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const back = useBack();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const apiURL = useApiUrl();

  const { options } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  const onSubmitFile = async () => {
    setIsUploading(true);
    const inputFile = document.getElementById("fileInput") as HTMLInputElement;

    const formData = new FormData();
    formData.append("file", inputFile?.files?.item(0) as File);

    const res = await axios.post<{ url: string }>(
      `${apiURL}/media/upload`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

    setValue("thumbnail", res.data.url);
    setIsUploading(false);
  };

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
      <br />
      <label>Image: </label>
      <input id="fileInput" type="file" onChange={onSubmitFile} />
      <input type="hidden" {...register("thumbnail")} />
      {errors.thumbnail && <span>This field is required</span>}
      <br />
      <br />
      <button onClick={back}>Cancel</button>
      <input type="submit" disabled={isUploading} value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
