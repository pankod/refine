import { useState } from "react";

import {
  List,
  useTable,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  DateField,
  EditButton,
  DeleteButton,
  ImageField,
  ShowButton,
} from "@refinedev/antd";

import { Table, Select, Space, Form, Radio, Tag } from "antd";

import type { IPost } from "../../interfaces";

import { API_URL } from "../../constants";

export const PostList = () => {
  const [locale, setLocale] = useState("en");
  const [publicationState, setPublicationState] = useState("live");

  const { tableProps, sorters: sorter } = useTable<IPost>({
    meta: {
      populate: ["category", "cover"],
      locale,
      publicationState,
    },

    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    meta: { locale },

    pagination: {
      mode: "server",
    },
  });

  return (
    <List>
      <Form
        layout="inline"
        initialValues={{
          locale,
          publicationState,
        }}
      >
        <Form.Item label="Locale" name="locale">
          <Radio.Group onChange={(e) => setLocale(e.target.value)}>
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="de">Deutsch</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Publication State" name="publicationState">
          <Radio.Group onChange={(e) => setPublicationState(e.target.value)}>
            <Radio.Button value="live">Published</Radio.Button>
            <Radio.Button value="preview">Draft and Published</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <br />
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
      >
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter={{ multiple: 3 }}
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter={{ multiple: 2 }}
        />
        <Table.Column
          key="[category][id]"
          dataIndex={["category", "title"]}
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
          sorter={{ multiple: 1 }}
        />
        <Table.Column
          dataIndex="publishedAt"
          title="Status"
          render={(value) => {
            return (
              <Tag color={value ? "green" : "blue"}>
                {value ? "Published" : "Draft"}
              </Tag>
            );
          }}
        />
        <Table.Column
          dataIndex={"cover"}
          align="center"
          title="Cover"
          render={(value) => {
            return value ? (
              <ImageField
                value={API_URL + value[0].url}
                alt={value[0]?.name}
                title={value[0]?.name}
                width={48}
                preview={{ mask: <></> }}
              />
            ) : (
              <span>---</span>
            );
          }}
        />
        <Table.Column<{ id: string }>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => {
            return (
              <Space>
                <ShowButton hideText size="small" recordItemId={record.id} />
                <EditButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
