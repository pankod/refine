import { useList } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import type { IPost, ILanguage } from "../../interfaces";

export const PostList = () => {
  const { tableProps } = useTable<IPost>();

  const {
    result: data,
    query: { isLoading },
  } = useList<ILanguage>({ resource: "languages" });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="language"
          title="Language"
          render={(value: number) => {
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
