import { useList } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
} from "@refinedev/antd";

import { Table, Space, Tag } from "antd";

import type { IPost, ITag } from "../../interfaces";

export const PostList = () => {
  const { tableProps } = useTable<IPost>();

  const {
    result: data,
    query: { isLoading },
  } = useList<ITag>({ resource: "tags" });

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
          dataIndex={["tags"]}
          title="Tags"
          render={(value: Array<number>) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <>
                {value?.map((tagId) => (
                  <Tag key={tagId}>
                    {data?.data.find((item) => item.id === tagId)?.title}
                  </Tag>
                ))}
              </>
            );
          }}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          key="actions"
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
