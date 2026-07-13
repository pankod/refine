import React from "react";
import type { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  UrlField,
  TextField,
} from "@refinedev/antd";
import { Table, Space, Avatar, Input, Form } from "antd";

export const CompanyList = () => {
  const { tableProps, searchFormProps } = useTable({
    meta: {
      fields: [
        "id",
        "avatarUrl",
        "name",
        "businessType",
        "companySize",
        "country",
        "website",
        { salesOwner: ["id", "name"] },
      ],
    },

    onSearch: (params: { name: string }) => [
      {
        field: "name",
        operator: "contains",
        value: params.name,
      },
    ],
  });

  return (
    <List
      headerButtons={({ defaultButtons }) => (
        <>
          <Form
            {...searchFormProps}
            onValuesChange={() => {
              searchFormProps.form?.submit();
            }}
          >
            <Form.Item noStyle name="name">
              <Input.Search placeholder="Search by name" />
            </Form.Item>
          </Form>
          {defaultButtons}
        </>
      )}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="Name"
          render={(_, record: { name: string; avatarUrl: string }) => (
            <Space>
              <Avatar
                src={record.avatarUrl}
                size="large"
                shape="square"
                alt={record.name}
              />
              <TextField value={record.name} />
            </Space>
          )}
        />
        <Table.Column dataIndex="businessType" title="Type" />
        <Table.Column dataIndex="companySize" title="Size" />
        <Table.Column dataIndex="country" title="Country" />
        <Table.Column
          dataIndex={["website"]}
          title="Website"
          render={(value: string) => <UrlField value={value} />}
        />
        <Table.Column dataIndex={["salesOwner", "name"]} title="Sales Owner" />
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
