import { useSelect, type HttpError } from "@refinedev/core";
import { useStepsForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import type { IPost } from "../../interfaces";

const stepTitles = ["Title", "Status", "Category and content"];

export const PostCreate: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
    control,
  } = useStepsForm<IPost, HttpError, IPost>();

  const { options } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>Title: </label>
            <input
              id="title"
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </>
        );
      case 1:
        return (
          <>
            <label>Status: </label>
            <select id="status" {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </>
        );
      case 2:
        return (
          <>
            <Controller
              name="category.id"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <label>Category: </label>
                    <select id="category" {...field}>
                      {options?.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && <span>{errors.category.message}</span>}
                  </>
                );
              }}
            />
            <br />
            <br />
            <label>Content: </label>
            <textarea
              id="content"
              {...register("content", {
                required: "This field is required",
              })}
              rows={10}
              cols={50}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </>
        );
    }
  };

  if (formLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 36 }}>
        {stepTitles.map((title, index) => (
          <button
            key={index}
            onClick={() => gotoStep(index)}
            style={{
              backgroundColor: currentStep === index ? "lightgray" : "initial",
            }}
          >
            {index + 1} - {title}
          </button>
        ))}
      </div>
      <form autoComplete="off">{renderFormByStep(currentStep)}</form>
      <div style={{ display: "flex", gap: 8 }}>
        {currentStep > 0 && (
          <button
            onClick={() => {
              gotoStep(currentStep - 1);
            }}
          >
            Previous
          </button>
        )}
        {currentStep < stepTitles.length - 1 && (
          <button
            onClick={() => {
              gotoStep(currentStep + 1);
            }}
          >
            Next
          </button>
        )}
        {currentStep === stepTitles.length - 1 && (
          <button onClick={handleSubmit(onFinish)}>Save</button>
        )}
      </div>
    </div>
  );
};
