import React from "react";
import { MockJSONServer, TestWrapper, render, waitFor } from "@test";
import { Routes, Route } from "react-router";
import { useForm } from ".";
import { Select, TextInput } from "@mantine/core";
import { useSelect } from "@hooks/useSelect";
import { Edit } from "@components/crud";
import type { IRefineOptions, HttpError } from "@refinedev/core";
import { act } from "react";
import { vi } from "vitest";

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
      saveButtonProps,
      getInputProps,
      refineCore: { query, formLoading },
    } = useForm({
      ...useFormProps,
      refineCoreProps: {
        ...refineCoreProps,
        resource: "posts",
        id: refineCoreProps.action === "edit" ? "1" : undefined,
        action: refineCoreProps.action,
      },
      initialValues: {
        title: "",
        content: "",
        category: {
          id: "",
        },
        tags: [],
      },
    });

    const { selectProps, query: categoriesQueryResult } = useSelect({
      resource: "categories",
      defaultValue: query?.data?.data?.category?.id,
    });

    if (formLoading || categoriesQueryResult.isLoading) {
      return <div>loading</div>;
    }

    return (
      <Edit saveButtonProps={saveButtonProps}>
        <form>
          <TextInput
            mt={8}
            id="title"
            label="Title"
            placeholder="Title"
            {...getInputProps("title")}
          />
          <TextInput
            mt={8}
            id="content"
            label="Content"
            placeholder="Content"
            {...getInputProps("content")}
          />
          <Select
            mt={8}
            id="categoryId"
            label="Category"
            placeholder="Pick one"
            {...getInputProps("category.id")}
            {...selectProps}
          />
          <TextInput placeholder="Tag 1" {...getInputProps(`tags.${0}`)} />
          <TextInput placeholder="Tag 2" {...getInputProps(`tags.${1}`)} />
        </form>
      </Edit>
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
          create: async () => {
            const error: HttpError = {
              message: "An error occurred while updating the record.",
              statusCode: 400,
              errors: {
                title: ["Title is required"],
                "category.id": ["Category is required"],
                content: {
                  key: "form.error.content",
                  message: "Content is required",
                },
                "tags.0": ["Tag 0 is required"],
                "tags.1": ["Tag 1 is required"],
              },
            };
            return Promise.reject(error);
          },
          update: async () => {
            const error: HttpError = {
              message: "An error occurred while updating the record.",
              statusCode: 400,
              errors: {
                title: ["Title is required"],
                "category.id": ["Category is required"],
                content: {
                  key: "form.error.content",
                  message: "Content is required",
                },
                "tags.0": ["Tag 0 is required"],
                "tags.1": ["Tag 1 is required"],
              },
            };
            return Promise.reject(error);
          },
          getMany: async () => {
            return Promise.resolve([
              {
                id: 1,
                name: "lorem ipsum dolor",
              },
              {
                id: 2,
                name: "Sit amet consectetur",
              },
            ]);
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
      const onMutationErrorMock = vi.fn();

      const { getByTestId, getByText } = renderForm({
        refineCoreProps: {
          action: action,
          onMutationError: onMutationErrorMock,
        },
      });

      await act(() => Promise.resolve());

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

      expect(getByText("Title is required")).toBeInTheDocument();
      expect(getByText("Category is required")).toBeInTheDocument();
      expect(getByText("Translated content error")).toBeInTheDocument();
      expect(getByText("Tag 0 is required")).toBeInTheDocument();
      expect(getByText("Tag 1 is required")).toBeInTheDocument();
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
      },
    });

    await act(() => Promise.resolve());

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
});
