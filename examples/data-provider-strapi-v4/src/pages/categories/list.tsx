import { useState } from "react";

import {
  List,
  useTable,
  EditButton,
  DateField,
  DeleteButton,
} from "@refinedev/antd";

import { Table, Space, Form, Radio } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryList = () => {
  const [locale, setLocale] = useState("en");

  const { tableProps } = useTable<ICategory>({
    meta: {
      locale,
    },
  });

  return (
    <List>
      <Form layout="inline" initialValues={{ locale }}>
        <Form.Item label="Locale" name="locale">
          <Radio.Group onChange={(e) => setLocale(e.target.value)}>
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="de">Deutsch</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <br />
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column<ICategory>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton size="small" hideText recordItemId={record.id} />
              <DeleteButton size="small" hideText recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
