import { useMany, useCan, type HttpError } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  FilterDropdown,
  useSelect,
  TagField,
  NumberField,
} from "@refinedev/antd";

import { Table, Space, Select, Radio, Form, Input, Button } from "antd";

import type { IPost, ICategory } from "../../interfaces";

type PostSearchVariables = {
  title?: string;
};

export const PostList: React.FC = () => {
  const { tableProps, searchFormProps, setFilters } = useTable<
    IPost,
    HttpError,
    PostSearchVariables
  >({
    // Search критерият няма да се пази в URL-а.
    // След refresh страницата ще се зарежда без попълнен search bar.
    syncWithLocation: false,

    onSearch: (values) => {
      const title = values.title?.trim();

      if (!title) {
        return [];
      }

      return [
        {
          field: "title",
          operator: "contains",
          value: title,
        },
      ];
    },
  });

  const removeTitleFilter = () => {
    searchFormProps.form?.setFieldsValue({
      title: undefined,
    });

    setFilters((prevFilters) =>
      prevFilters.filter((filter) => {
        if ("field" in filter) {
          return filter.field !== "title";
        }

        return true;
      }),
    );
  };

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
    optionLabel: "title",
    optionValue: "id",

    pagination: {
      mode: "server",
    },
  });

  const { data: canAccess } = useCan({
    resource: "posts",
    action: "field",
    params: { field: "hit" },
  });

  return (
    <List>
      <Form
        {...searchFormProps}
        layout="inline"
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="title">
          <Input
            placeholder="Search by title"
            allowClear
            onChange={(event) => {
              if (event.target.value === "") {
                removeTitleFilter();
              }
            }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>

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

        {canAccess?.can && (
          <Table.Column
            dataIndex="hit"
            title="Hit"
            render={(value: number) => (
              <NumberField
                value={value}
                options={{
                  notation: "compact",
                }}
              />
            )}
          />
        )}

        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => <TagField value={value} />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value="published">Published</Radio>
                <Radio value="draft">Draft</Radio>
                <Radio value="rejected">Rejected</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
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