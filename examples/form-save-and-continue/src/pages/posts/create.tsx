import React, { useState } from "react";
import { useSelect, useForm } from "@refinedev/core";
import { useNavigate } from "react-router";

import type { IPost } from "../../interfaces";

export const PostCreate: React.FC = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    status: "draft",
    category: {
      id: "",
    },
  });
  const { formLoading, onFinish, redirect } = useForm({
    redirect: false,
  });
  const navigate = useNavigate();

  const { options } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  const handleSubmit = async (redirectTo: "list" | "edit" | "create") => {
    const response = await onFinish(formValues);

    if (redirectTo === "create") {
      setFormValues({
        title: "",
        content: "",
        status: "draft",
        category: {
          id: "",
        },
      });
      return;
    }

    redirect(redirectTo, response?.data?.id);
  };

  return (
    <div>
      <button className="back" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <form className="form-wrapper">
        <div className="form-group">
          <label>Title: </label>
          <input
            id="title"
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                title: e.target.value,
              })
            }
            value={formValues.title}
          />
        </div>
        <div className="form-group">
          <label>Status: </label>
          <select
            id="status"
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                status: e.target.value as IPost["status"],
              })
            }
            value={formValues.status}
          >
            <option value="published">published</option>
            <option value="draft">draft</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category: </label>
          <select
            id="category"
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                category: {
                  id: e.target.value,
                },
              })
            }
            value={formValues.category.id}
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
        </div>
        <div className="form-group">
          <label>Content: </label>
          <textarea
            id="content"
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                content: e.target.value,
              })
            }
            rows={10}
            cols={50}
            value={formValues.content}
          />
        </div>
        <div className="saveActions">
          <button
            onClick={() => handleSubmit("list")}
            type="button"
            disabled={formLoading}
          >
            Save
          </button>
          <button
            onClick={() => handleSubmit("edit")}
            type="button"
            disabled={formLoading}
          >
            Save and continue editing
          </button>
          <button
            onClick={() => handleSubmit("create")}
            type="button"
            disabled={formLoading}
          >
            Save and add another
          </button>
        </div>
        {formLoading && <p>Loading</p>}
      </form>
    </div>
  );
};
