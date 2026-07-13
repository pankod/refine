import { useRef, useState, useEffect } from "react";
import { useMany } from "@refinedev/core";
import { keepPreviousData } from "@tanstack/react-query";
import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  FilterDropdown,
  useSelect,
} from "@refinedev/antd";
import { Table, Space, Select, type SelectProps } from "antd";

import type { IPost, ICategory } from "../../interfaces";

export const PostList = () => {
  const { tableProps } = useTable<IPost>();
  const [page, setPage] = useState<number>(1);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [search, setSearch] = useState<string>("");

  const hasMore = useRef(true);

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

  const { selectProps: categorySelectProps, query: categoriesQuery } =
    useSelect<ICategory>({
      resource: "categories",
      pagination: {
        currentPage: page,
        pageSize: 20,
        mode: "server",
      },

      queryOptions: {
        placeholderData: keepPreviousData,
      },

      onSearch: (value) => {
        setPage(1);
        hasMore.current = true;
        setSearch(value);

        return [
          {
            field: "title",
            operator: "contains",
            value,
          },
        ];
      },
    });

  useEffect(() => {
    const data = categoriesQuery?.data;
    if (!data?.data?.length) {
      hasMore.current = false;
      return;
    }

    const normalizedData = data.data?.map((item: any) => ({
      label: item.title,
      value: item.id,
    }));

    if (!search?.length) {
      setOptions((prev) => [...(prev || []), ...normalizedData]);
    } else {
      setOptions(normalizedData);
    }
  }, [categoriesQuery?.data, search]);

  return (
    <List>
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
                mode="multiple"
                style={{ minWidth: 200 }}
                {...categorySelectProps}
                // need to add options with searchValue and onPopupScroll
                options={options}
                onPopupScroll={(event) => {
                  const target = event.currentTarget;
                  if (
                    target.scrollTop + target.offsetHeight ===
                    target.scrollHeight
                  ) {
                    if (categorySelectProps.options && hasMore.current) {
                      setPage((curr) => curr + 1);
                    }
                  }
                }}
              />
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
