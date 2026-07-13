import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import dataProvider from "@refinedev/simple-rest";
import { parseTableParams } from "@refinedev/remix-router";

import type { IPost } from "../interfaces";
import { API_URL } from "~/constants";

const PostList: React.FC = () => {
  const { initialData } = useLoaderData<typeof loader>();

  const { tableProps } = useTable<IPost>({
    queryOptions: {
      initialData,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};

export default PostList;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const { pagination, filters, sorters } = parseTableParams(url.search);

  const data = await dataProvider(API_URL).getList<IPost>({
    resource: "posts",
    filters,
    pagination,
    sorters,
  });

  return json({ initialData: data });
}
