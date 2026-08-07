import React from "react";
import { vi } from "vitest";

import { Route, Routes } from "react-router";
import type { IRefineOptions, HttpError } from "@refinedev/core";

import { Form, Input, Select } from "antd";
import { useForm, useSelect } from "..";
import {
  MockJSONServer,
  TestWrapper,
  render,
  waitFor,
  fireEvent,
  renderHook,
  act,
} from "@test";
import { MockRouterProvider } from "@test/dataMocks";
import { SaveButton } from "@components/buttons";

interface IPost {
  title: string;
  content: string;
  slug: string;
  category: { id: number };
  tags: string[];
}

const renderForm = ({
  formParams,
  refineOptions,
}: {
  formParams: any;
  refineOptions?: IRefineOptions;
}) => {
  const Page = () => {
    const {
      formProps,
      saveButtonProps,
      query,
      formLoading,
      defaultFormValuesLoading,
    } = useForm<IPost, HttpError, IPost>(formParams);

    const postData = query?.data?.data;
    const { selectProps: categorySelectProps } = useSelect({
      resource: "categories",
      defaultValue: postData?.category?.id,
      queryOptions: {
        enabled: !!postData?.category?.id,
      },
    });

    return (
      <>
        {formLoading && <div>formLoading</div>}
        {defaultFormValuesLoading && <div>defaultFormValuesLoading</div>}
        <SaveButton {...saveButtonProps} />
        <Form {...formProps} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name={["category", "id"]}>
            <Select {...categorySelectProps} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              options={[
                {
                  label: "Published",
                  value: "published",
                },
                {
                  label: "Draft",
                  value: "draft",
                },
                {
                  label: "Rejected",
                  value: "rejected",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <Input />
          </Form.Item>
        </Form>
      </>
    );
  };

  return render(
    <Routes>
      <Route path="/" element={<Page />} />
    </Routes>,
    {
      wrapper: TestWrapper({
        options: refineOptions,
        routerProvider: MockRouterProvider(),
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
                status: true,
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
              message: "Create is not supported in this example.",
              statusCode: 400,
              slug: true,
              errors: {
                title: ["Title is required"],
                "category.id": ["Category is required"],
                status: true,
                content: {
                  key: "form.error.content",
                  message: "Content is required",
                },
              },
            };

            return Promise.reject(error);
          },
          getMany: async () => {
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  name: "lorem ipsum dolor",
                },
              ],
            });
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

      const { getByText, getByTestId } = renderForm({
        formParams: {
          onMutationError: onMutationErrorMock,
          resource: "posts",
          action: action,
          id: action === "edit" ? "1" : undefined,
        },
      });

      const saveButton = getByTestId("refine-save-button");

      await waitFor(() => {
        expect(document.body).not.toHaveTextContent("loading");
        expect(saveButton).not.toBeDisabled();
      });

      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(document.body).not.toHaveTextContent("loading");
        expect(onMutationErrorMock).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(getByText("Title is required")).toBeInTheDocument();
        expect(getByText("Category is required")).toBeInTheDocument();
        expect(getByText("Translated content error")).toBeInTheDocument();
        expect(getByText("Field is not valid.")).toBeInTheDocument();
      });
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

    const { queryByText, getByTestId } = renderForm({
      refineOptions: {
        disableServerSideValidation: testCase.disableFromRefineOption,
      },
      formParams: {
        onMutationError: onMutationErrorMock,
        resource: "posts",
        action: testCase.action,
        id: testCase.action === "edit" ? "1" : undefined,
        disableServerSideValidation: testCase.disableFromHook,
      },
    });

    const saveButton = getByTestId("refine-save-button");

    await waitFor(() => {
      expect(document.body).not.toHaveTextContent("loading");
      expect(saveButton).not.toBeDisabled();
    });

    fireEvent.click(saveButton);

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

  it("should accept defaultFormValues", async () => {
    const { getByLabelText } = renderForm({
      formParams: {
        resource: "posts",
        action: "create",
        defaultFormValues: {
          title: "Default Title",
          content: "Default Content",
        },
      },
    });

    await waitFor(() => {
      expect(getByLabelText("Title")).toHaveValue("Default Title");
      expect(getByLabelText("Content")).toHaveValue("Default Content");
    });
  });

  it("should accept defaultFormValues as promise", async () => {
    const { getByLabelText } = renderForm({
      formParams: {
        resource: "posts",
        action: "create",
        defaultFormValues: async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
          return {
            title: "Default Title",
            content: "Default Content",
          };
        },
      },
    });

    await waitFor(() => {
      expect(getByLabelText("Title")).toHaveValue("");
      expect(getByLabelText("Content")).toHaveValue("");
    });

    await waitFor(() => {
      expect(getByLabelText("Title")).toHaveValue("Default Title");
      expect(getByLabelText("Content")).toHaveValue("Default Content");
    });
  });

  it("formLoading and defaultFormValuesLoading should work", async () => {
    vi.useFakeTimers();

    const { result } = renderHook(
      () => {
        return useForm<IPost, HttpError, IPost>({
          resource: "posts",
          action: "edit",
          id: "1",
          defaultFormValues: async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            return {
              title: "Default Title",
              content: "Default Content",
            };
          },
        });
      },
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            getOne: async () => {
              await new Promise((resolve) => setTimeout(resolve, 600));
              return {
                data: {
                  id: 1,
                  title:
                    "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                  content: "Content",
                  category: {
                    id: 1,
                  },
                  tags: ["tag1", "tag2"],
                },
              };
            },
          },
        }),
      },
    );

    expect(result.current.formLoading).toBe(true);
    expect(result.current.defaultFormValuesLoading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current.formLoading).toBe(true);
    expect(result.current.defaultFormValuesLoading).toBe(false);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.formLoading).toBe(false);
    expect(result.current.defaultFormValuesLoading).toBe(false);
  });
});
