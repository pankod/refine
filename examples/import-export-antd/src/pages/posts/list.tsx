import { useMany, useExport } from "@refinedev/core";
import {
  useTable,
  useImport,
  EditButton,
  ShowButton,
  List,
  TextField,
  ExportButton,
  ImportButton,
} from "@refinedev/antd";
import { Space, Table } from "antd";

import type { IPost, ICategory, IPostFile } from "../../interfaces";

export const PostList = () => {
  const { tableProps } = useTable<IPost>();

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

  const importProps = useImport<IPostFile>({
    mapData: (item) => {
      return {
        title: item.title,
        content: item.content,
        status: item.status,
        category: {
          id: item.categoryId,
        },
        user: {
          id: item.userId,
        },
      };
    },
  });

  const { triggerExport, isLoading: exportLoading } = useExport<IPost>({
    mapData: (item) => {
      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        content: item.content,
        status: item.status,
        categoryId: item.category.id,
        userId: item.user?.id,
      };
    },
  });

  return (
    <List
      headerProps={{
        extra: (
          <Space>
            <ImportButton {...importProps} />
            <ExportButton onClick={triggerExport} loading={exportLoading} />
          </Space>
        ),
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
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
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
