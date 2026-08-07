import React from "react";
import { useMany, useDeleteMany } from "@refinedev/core";

import {
  List,
  TextField,
  EditButton,
  MarkdownField,
  SaveButton,
  useEditableTable,
  useSelect,
} from "@refinedev/antd";

import { Table, Form, Input, Select, Space, Button } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

export const PostList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const {
    result: data,
    query: { isLoading },
  } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: categoryIds,

    pagination: {
      mode: "server",
    },
  });

  const {
    mutate,

    mutation: { isSuccess, isPending: deleteManyIsLoading },
  } = useDeleteMany<IPost>();

  const deleteSelectedItems = () => {
    mutate({
      resource: "posts",
      ids: selectedRowKeys.map(String),
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setSelectedRowKeys([]);
    }
  }, [isSuccess]);

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const hasSelected = selectedRowKeys.length > 0;

  const expandedRowRender = (record: IPost) => {
    if (isEditing(record.id)) {
      return (
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
      );
    }
    return <MarkdownField value={record.content} />;
  };

  return (
    <List
      headerProps={{
        subTitle: hasSelected && (
          <Button
            danger
            onClick={deleteSelectedItems}
            disabled={!hasSelected}
            loading={deleteManyIsLoading}
          >
            {`Delete selected ${selectedRowKeys.length} items`}
          </Button>
        ),
      }}
    >
      <Form {...formProps}>
        <Table<IPost>
          expandable={{
            expandedRowRender,
          }}
          rowSelection={rowSelection}
          {...tableProps}
          rowKey="id"
          scroll={{ x: 400 }}
        >
          <Table.Column dataIndex="id" title="ID" align="center" />
          <Table.Column<IPost>
            dataIndex="title"
            title="Title"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="title" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          />
          <Table.Column<IPost>
            dataIndex={["category", "id"]}
            title="Category"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name={["category", "id"]} style={{ margin: 0 }}>
                    <Select {...categorySelectProps} />
                  </Form.Item>
                );
              }

              if (isLoading) {
                return <TextField value="Loading..." />;
              }

              return (
                <TextField
                  value={data?.data.find((item) => item.id === value)?.title}
                />
              );
            }}
          />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            width={200}
            render={(_, record) => {
              if (isEditing(record.id)) {
                return (
                  <Space>
                    <SaveButton {...saveButtonProps} size="small" />
                    <Button {...cancelButtonProps} size="small">
                      Cancel
                    </Button>
                  </Space>
                );
              }
              return (
                <EditButton
                  {...editButtonProps(record.id)}
                  hideText
                  size="small"
                />
              );
            }}
          />
        </Table>
      </Form>
    </List>
  );
};
