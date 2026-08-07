import React from "react";

import { Route, Routes } from "react-router";
import type { IRefineOptions, HttpError } from "@refinedev/core";

import { Button, Form, Input, Select, Steps } from "antd";
import { useStepsForm } from "..";
import { useSelect } from "../..";
import { MockJSONServer, TestWrapper, fireEvent, render, waitFor } from "@test";
import { MockRouterProvider } from "@test/dataMocks";
import { SaveButton } from "@components/buttons";
import { act } from "react-dom/test-utils";

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
      current,
      gotoStep,
      stepsProps,
      formProps,
      saveButtonProps,
      formLoading,
    } = useStepsForm<IPost, HttpError, IPost>(formParams);

    const { selectProps: categorySelectProps } = useSelect({
      resource: "categories",
    });

    const formList = [
      <>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
              message: "Category is required",
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
      </>,
      <>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Status is required",
            },
          ]}
        >
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
      </>,
    ];

    return (
      <>
        {formLoading && <div>loading...</div>}
        <Steps
          {...stepsProps}
          items={[{ title: "About Post" }, { title: "Content" }]}
        />

        <Form {...formProps} layout="vertical" style={{ marginTop: 30 }}>
          {formList[current]}
        </Form>
        {current > 0 && (
          <Button
            onClick={async () => {
              try {
                await gotoStep(current - 1);
              } catch (e) {}
            }}
            data-testid="previous-button"
          >
            Previous
          </Button>
        )}
        {current < formList.length - 1 && (
          <Button
            onClick={async () => {
              try {
                await gotoStep(current + 1);
              } catch (e) {}
            }}
            data-testid="next-button"
          >
            Next
          </Button>
        )}
        {current === formList.length - 1 && <SaveButton {...saveButtonProps} />}
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
        dataProvider: {
          ...MockJSONServer,
          getList: async () => {
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  title: "lorem ipsum dolor",
                },
              ],
            });
          },
        },
      }),
    },
  );
};

describe("useStepsForm hook", () => {
  it("should run validation when going to next step", async () => {
    const { getByText, getByTestId } = renderForm({
      formParams: {
        resource: "posts",
        action: "create",
      },
    });

    const nextButton = getByTestId("next-button");

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(getByText("Title is required")).toBeInTheDocument();
      expect(getByText("Category is required")).toBeInTheDocument();
    });
  });

  it("By default, should not run validation when going to previous step", async () => {
    const { getByText, getByTestId, getByLabelText } = renderForm({
      formParams: {
        resource: "posts",
        action: "create",
      },
    });

    const titleInput = getByLabelText("Title");
    const categorySelect = getByLabelText("Category");

    act(() => {
      fireEvent.change(titleInput, { target: { value: "foo" } });
      fireEvent.mouseDown(categorySelect);
    });

    await waitFor(() => {
      fireEvent.click(getByText("lorem ipsum dolor"));
    });

    const nextButton = getByTestId("next-button");

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(getByLabelText("Status")).toBeInTheDocument();
    });

    await waitFor(() => {
      const previousButton = getByTestId("previous-button");

      fireEvent.click(previousButton);
    });

    await waitFor(() => {
      expect(getByLabelText("Title")).toBeInTheDocument();
      expect(getByLabelText("Category")).toBeInTheDocument();
    });
  });

  it("should run validation when going to previous step", async () => {
    const { getByText, getByTestId, getByLabelText } = renderForm({
      formParams: {
        resource: "posts",
        action: "create",
        isBackValidate: true,
      },
    });

    const titleInput = getByLabelText("Title");
    const categorySelect = getByLabelText("Category");

    act(() => {
      fireEvent.change(titleInput, { target: { value: "foo" } });
      fireEvent.mouseDown(categorySelect);
    });

    await waitFor(() => {
      fireEvent.click(getByText("lorem ipsum dolor"));
    });

    const nextButton = getByTestId("next-button");

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(getByLabelText("Status")).toBeInTheDocument();
    });

    await waitFor(() => {
      const previousButton = getByTestId("previous-button");

      fireEvent.click(previousButton);
    });

    await waitFor(() => {
      expect(getByText("Status is required")).toBeInTheDocument();
    });
  });
});
