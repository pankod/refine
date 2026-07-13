import React from "react";
import { type BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  MarkdownField,
  DateField,
  DeleteButton,
  FilterDropdown,
  useSelect,
} from "@refinedev/antd";
import { Table, Space, Select } from "antd";

export const BlogPostList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" sorter />
        <Table.Column
          dataIndex="title"
          title="Title"
          sorter={{ multiple: 1 }}
        />
        <Table.Column
          dataIndex="content"
          title="Content"
          render={(value: any) => (
            <MarkdownField value={`${value.slice(0, 80)}...`} />
          )}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value)?.title
            )
          }
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
