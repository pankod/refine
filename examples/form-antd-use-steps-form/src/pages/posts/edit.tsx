import React from "react";

import { Edit, SaveButton, useSelect, useStepsForm } from "@refinedev/antd";

import { Form, Input, Select, Button, Steps } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

export const PostEdit = () => {
  const {
    current,
    gotoStep,
    stepsProps,
    formProps,
    saveButtonProps,
    query,
    formLoading,
  } = useStepsForm<IPost>();

  const postData = query?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  const formList = [
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
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
          },
        ]}
      >
        <Select {...categorySelectProps} />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
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
    <>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <MDEditor data-color-mode="light" />
      </Form.Item>
    </>,
  ];

  return (
    <Edit
      isLoading={formLoading}
      footerButtons={
        <>
          {current > 0 && (
            <Button
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < formList.length - 1 && (
            <Button
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </Button>
          )}
          {current === formList.length - 1 && (
            <SaveButton {...saveButtonProps} />
          )}
        </>
      }
    >
      <Steps
        {...stepsProps}
        items={[{ title: "About Post" }, { title: "Content" }]}
      />

      <Form {...formProps} layout="vertical" style={{ marginTop: 30 }}>
        {formList[current]}
      </Form>
    </Edit>
  );
};
