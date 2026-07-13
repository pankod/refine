import type { HttpError } from "@refinedev/core";
import type { UseModalFormReturnType } from "@refinedev/react-hook-form";

import type { IPost } from "../../interfaces";
import { Modal } from "../../components/modal";

export const CreatePost: React.FC<
  UseModalFormReturnType<IPost, HttpError, IPost>
> = ({
  register,
  formState: { errors },
  refineCore: { onFinish, formLoading },
  handleSubmit,
  modal: { visible, close },
  saveButtonProps,
}) => {
  return (
    <Modal isOpen={visible} onClose={close}>
      <form className="form" onSubmit={handleSubmit(onFinish)}>
        <div className="form-group">
          <label>Title: </label>
          <input
            id="title"
            {...register("title", {
              required: "This field is required",
            })}
          />
          {errors.title && <span id="title-error">{errors.title.message}</span>}
        </div>
        <div className="form-group">
          <label>Status: </label>
          <select id="status" {...register("status")}>
            <option value="published">published</option>
            <option value="draft">draft</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
        <div className="form-group">
          <label>Content: </label>
          <textarea
            id="content"
            {...register("content", {
              required: "This field is required",
            })}
            rows={10}
          />
          {errors.content && (
            <span id="content-error">{errors.content.message}</span>
          )}
        </div>
        <button type="submit" {...saveButtonProps}>
          {formLoading ? "Loading" : "Save"}
        </button>
      </form>
    </Modal>
  );
};
