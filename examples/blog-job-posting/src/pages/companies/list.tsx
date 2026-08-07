import {
  List,
  TextField,
  useTable,
  getDefaultSortOrder,
  EditButton,
  DeleteButton,
  TagField,
  ShowButton,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import type { ICompany } from "interfaces";

export const CompanyList = () => {
  const { tableProps, sorters: sorter } = useTable<ICompany>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="name"
          key="name"
          title="Name"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="location"
          key="location"
          title="Location"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("location", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="isActive"
          key="isActive"
          title="Is Active"
          render={(value) => <TagField value={value} />}
          defaultSortOrder={getDefaultSortOrder("status", sorter)}
          sorter
        />
        <Table.Column<ICompany>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
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
