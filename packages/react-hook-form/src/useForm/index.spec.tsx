import React from "react";

import { useForm } from ".";
import type { IRefineOptions, HttpError } from "@refinedev/core";
import * as Core from "@refinedev/core";
import { MockJSONServer, TestWrapper, act, render, waitFor } from "../../test";
import { Route, Routes } from "react-router";
import { Controller } from "react-hook-form";

interface IPost {
  title: string;
  content: string;
  slug: string;
  category: { id: number };
  tags: string[];
  userId?: number;
}

const renderForm = ({
  refineCoreProps,
  refineOptions,
  useFormProps,
}: {
  useFormProps?: any;
  refineCoreProps?: any;
  refineOptions?: IRefineOptions;
}) => {
  const EditPage = () => {
    const {
      refineCore: { formLoading },
      saveButtonProps,
      register,
      formState: { errors },
    } = useForm<IPost, HttpError, IPost>({
      ...useFormProps,
      refineCoreProps: {
        resource: "posts",
        ...refineCoreProps,
      },
    });

    return (
      <div>
        {formLoading && <p>loading</p>}
        <input {...register("title")} />
        {errors.title && <span>{errors?.title?.message?.toString()}</span>}

        <input {...register("content")} />
        {errors.content && <span>{errors?.content?.message?.toString()}</span>}

        <input {...register("slug")} />
        {errors.slug && <span>{errors?.slug?.message?.toString()}</span>}

        <select
          {...register("category.id", {
            required: true,
          })}
        >
          {["1", "2", "3"]?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <span>{`${errors.category?.id?.message}`}</span>}

        <button
          {...saveButtonProps}
          onClick={(e) => {
            saveButtonProps?.onClick(e);
          }}
          data-testid="refine-save-button"
          type="submit"
        >
          save
        </button>
      </div>
    );
  };

  return render(
    <Routes>
      <Route path="/" element={<EditPage />} />
    </Routes>,
    {
      wrapper: TestWrapper({
        options: refineOptions,
        i18nProvider: {
          changeLocale: () => Promise.resolve(),
          getLocale: () => "en",
          translate: (key: string) => {
            if (key === "form.error.content") {
              return "Translated content error";
            }

            return key;
          },
        },
        dataProvider: {
          ...MockJSONServer,
          update: async () => {
            const error: HttpError = {
              message: "An error occurred while updating the record.",
              statusCode: 400,
              errors: {
                title: ["Title is required"],
                "category.id": ["Category is required"],
                slug: true,
                content: {
                  key: "form.error.content",
                  message: "Content is required",
                },
              },
            };

            return Promise.reject(error);
          },
          create: async () => {
            const error: HttpError = {
              message: "An error occurred while creating the record.",
              statusCode: 400,
              slug: true,
              errors: {
                title: ["Title is required"],
                "category.id": ["Category is required"],
                slug: true,
                content: {
                  key: "form.error.content",
                  message: "Content is required",
                },
              },
            };

            return Promise.reject(error);
          },
        },
      }),
    },
  );
};

describe("useForm hook", () => {
  it.each(["edit", "create"] as const)(
    "should set %s-form errors from data provider",
    async (action) => {
      const onMutationError = vi.fn();

      const { getByText, getByTestId } = renderForm({
        refineCoreProps: {
          onMutationError,
          action: action,
          id: action === "edit" ? "1" : undefined,
        },
      });

      await waitFor(() => {
        expect(document.body).not.toHaveTextContent("loading");
      });

      await act(() => {
        getByTestId("refine-save-button").click();
        return Promise.resolve();
      });

      await waitFor(() => {
        expect(document.body).not.toHaveTextContent("loading");
      });

      expect(onMutationError).toHaveBeenCalledTimes(1);

      expect(getByText("Title is required")).toBeInTheDocument();
      expect(getByText("Category is required")).toBeInTheDocument();
      expect(getByText("Translated content error")).toBeInTheDocument();
      expect(getByText("Field is not valid.")).toBeInTheDocument();
    },
  );

  it.each([
    {
      action: "edit",
      disableFromRefineOption: false,
      disableFromHook: true,
    },
    {
      action: "edit",
      disableFromRefineOption: true,
      disableFromHook: false,
    },
    {
      action: "create",
      disableFromRefineOption: false,
      disableFromHook: true,
    },
    {
      action: "create",
      disableFromRefineOption: true,
      disableFromHook: false,
    },
  ] as const)("should disable server-side validation", async (testCase) => {
    const onMutationErrorMock = vi.fn();

    const { getByTestId, queryByText } = renderForm({
      refineOptions: {
        disableServerSideValidation: testCase.disableFromRefineOption,
      },
      useFormProps: {
        disableServerSideValidation: testCase.disableFromHook,
      },

      refineCoreProps: {
        action: testCase.action,
        onMutationError: onMutationErrorMock,
        id: testCase.action === "edit" ? "1" : undefined,
      },
    });

    await waitFor(() => {
      expect(document.body).not.toHaveTextContent("loading");
    });

    await act(() => {
      getByTestId("refine-save-button").click();
      return Promise.resolve();
    });

    await waitFor(() => {
      expect(document.body).not.toHaveTextContent("loading");
      expect(onMutationErrorMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(queryByText("Title is required")).not.toBeInTheDocument();
      expect(queryByText("Category is required")).not.toBeInTheDocument();
      expect(queryByText("Translated content error")).not.toBeInTheDocument();
      expect(queryByText("Field is not valid.")).not.toBeInTheDocument();
    });
  });

  it("should sync values for fields registered after query resolves", async () => {
    const useFormCoreSpy = vi.spyOn(Core, "useForm").mockReturnValue({
      query: {
        data: {
          data: {
            id: "1",
            title: "Post 1",
            content: "",
            slug: "",
            category: { id: 1 },
            tags: [],
            userId: 5,
          },
        },
      },
      onFinish: vi.fn().mockResolvedValue({}),
      onFinishAutoSave: vi.fn().mockResolvedValue({}),
      formLoading: false,
    } as any);

    try {
      const EditPage = () => {
        const {
          control,
          register,
          refineCore: { query },
        } = useForm<IPost, HttpError, IPost>({
          refineCoreProps: {
            resource: "posts",
            action: "edit",
            id: "1",
          },
        });

        const [showLateField, setShowLateField] = React.useState(false);

        return (
          <div>
            <input data-testid="title-field" {...register("title")} />
            <span data-testid="query-user-id">
              {query?.data?.data?.userId ?? ""}
            </span>
            <button
              type="button"
              data-testid="show-late-field"
              onClick={() => setShowLateField(true)}
            >
              show
            </button>
            {showLateField && (
              <Controller
                control={control}
                name="userId"
                render={({ field }) => (
                  <input
                    data-testid="late-field"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                )}
              />
            )}
          </div>
        );
      };

      const { findByTestId } = render(
        <Routes>
          <Route path="/" element={<EditPage />} />
        </Routes>,
        {
          wrapper: TestWrapper({}),
        },
      );

      const queryUserId = await findByTestId("query-user-id");

      await waitFor(() => {
        expect(queryUserId).toHaveTextContent("5");
      });

      await act(async () => {
        (await findByTestId("show-late-field")).click();
      });

      const lateField = await findByTestId("late-field");
      await waitFor(() => {
        expect(lateField).toHaveValue("5");
      });
    } finally {
      useFormCoreSpy.mockRestore();
    }
  });
});
