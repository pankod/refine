import React from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { finalFiles as initialFiles } from "@site/tutorial/ui-libraries/refactoring/ant-design/react-router/sandpack";
import { dependencies } from "@site/tutorial/ui-libraries/intro/ant-design/react-router/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showNavigator
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const ListProductsTsx = /* tsx */ `
import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  List,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

export const ListProducts = () => {
  const { result, tableProps, filters, sorters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [{ field: "category.id", operator: "eq", value: 2 }],
    },
    syncWithLocation: true,
  });

  const { result: categories, query: { isLoading } } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKey) => Number(selectedKey)}
            >
              <Select style={{ minWidth: 200 }} {...selectProps} />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "eq")}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
`.trim();

const ShowProductTsx = /* tsx */ `
import { useShow, useOne } from "@refinedev/core";
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProduct = () => {
  const {
    result: product,
    query: { isLoading },
  } = useShow();

  const { result: category, query: { isLoading: categoryIsLoading } } = useOne({
    resource: "categories",
    id: product?.category.id || "",
    queryOptions: {
      enabled: !!product,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={product?.id} />

      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={product?.name} />

      <Typography.Title level={5}>Description</Typography.Title>
      <MarkdownField value={product?.description} />

      <Typography.Title level={5}>Material</Typography.Title>
      <TextField value={product?.material} />

      <Typography.Title level={5}>Category</Typography.Title>
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryproduct?.title}
      />

      <Typography.Title level={5}>Price</Typography.Title>
      <NumberField value={product?.price} />
    </Show>
  );
};
`.trim();

const CreateProductTsx = /* tsx */ `
import { useForm, useSelect, Create } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  const { formProps, saveButtonProps } = useForm({
    refineCoreProps: {
      redirect: "edit",
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Material" name="material">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name={["category", "id"]}>
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber step="0.01" stringMode />
        </Form.Item>
      </Form>
    </Create>
  );
};
`.trim();

const EditProductTsx = /* tsx */ `
import { useForm, useSelect, Edit } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
  const { formProps, saveButtonProps, query } = useForm({
    refineCoreProps: {
      redirect: "show",
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: query?.product?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Material" name="material">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name={["category", "id"]}>
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber step="0.01" stringMode />
        </Form.Item>
      </Form>
    </Edit>
  );
};
`.trim();

// actions

export const ListInListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/pages/products/list.tsx", ListProductsTsx);
        sandpack.setActiveFile("/src/pages/products/list.tsx");
      }}
    />
  );
};

export const EditInEditProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/pages/products/edit.tsx", EditProductTsx);
        sandpack.setActiveFile("/src/pages/products/edit.tsx");
      }}
    />
  );
};

export const CreateInCreateProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/pages/products/create.tsx", CreateProductTsx);
        sandpack.setActiveFile("/src/pages/products/create.tsx");
      }}
    />
  );
};

export const ShowInShowProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/pages/products/show.tsx", ShowProductTsx);
        sandpack.setActiveFile("/src/pages/products/show.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/pages/products/list.tsx": {
    code: ListProductsTsx,
    active: true,
  },
  "src/pages/products/show.tsx": {
    code: ShowProductTsx,
  },
  "src/pages/products/create.tsx": {
    code: CreateProductTsx,
  },
  "src/pages/products/edit.tsx": {
    code: EditProductTsx,
  },
};
