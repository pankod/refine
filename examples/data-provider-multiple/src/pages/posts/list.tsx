import { useMany, getDefaultFilter } from "@refinedev/core";

import {
  List,
  TextField,
  EditButton,
  ShowButton,
  FilterDropdown,
  TagField,
  useTable,
  useSelect,
  useSimpleList,
} from "@refinedev/antd";

import { Table, Space, Select, Radio, Collapse, List as AntdList } from "antd";

import type { IPost, ICategory, IProducts } from "../../interfaces";

export const PostList = () => {
  const { Panel } = Collapse;

  const { tableProps, filters } = useTable<IPost>({
    syncWithLocation: true,
  });

  const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
    { listProps } = useSimpleList<IProducts>({
      resource: "products",
      dataProviderName: "fineFoods",
    });

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
    defaultValue: getDefaultFilter("category.id", filters, "in"),

    pagination: {
      mode: "server",
    },
  });

  const renderItem = (item: IProducts) => {
    const { name, description } = item;

    return (
      <AntdList.Item>
        <AntdList.Item.Meta title={name} description={description} />
      </AntdList.Item>
    );
  };

  return (
    <List>
      <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
        <Panel header="Default Data Provider" key="1">
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
                <FilterDropdown
                  {...props}
                  mapValue={(selectedKeys) => selectedKeys.map(Number)}
                >
                  <Select
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Category"
                    {...categorySelectProps}
                  />
                </FilterDropdown>
              )}
              defaultFilteredValue={getDefaultFilter(
                "category.id",
                filters,
                "in",
              )}
            />
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
          </Table>
        </Panel>
        <Panel header="Fine Foods Data Provider" key="2">
          <AntdList {...listProps} renderItem={renderItem} />
        </Panel>
      </Collapse>
    </List>
  );
};
