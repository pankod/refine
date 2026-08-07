import { useMemo } from "react";
import {
  useMany,
  type CrudFilters,
  type HttpError,
  getDefaultFilter,
} from "@refinedev/core";
import { List, useSimpleList, NumberField, useSelect } from "@refinedev/antd";
import {
  Typography,
  List as AntdList,
  Space,
  Select,
  Form,
  DatePicker,
} from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Text } = Typography;

import type { IPost, ICategory, IPostFilterVariables } from "../../interfaces";

export const PostList: React.FC = () => {
  const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
    { listProps, searchFormProps, filters } = useSimpleList<
      IPost,
      HttpError,
      IPostFilterVariables
    >({
      pagination: {
        pageSize: 3,
      },
      onSearch: (params) => {
        const filters: CrudFilters = [];
        const { category, createdAt } = params;

        filters.push(
          {
            field: "category.id",
            operator: "eq",
            value: category,
          },
          {
            field: "createdAt",
            operator: "gte",
            value: createdAt ? createdAt[0].toISOString() : undefined,
          },
          {
            field: "createdAt",
            operator: "lte",
            value: createdAt ? createdAt[1].toISOString() : undefined,
          },
        );

        return filters;
      },
    });

  const categoryIds =
    listProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { result: data } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const renderItem = (item: IPost) => {
    const { title, hit, content } = item;

    const categoryTitle = data?.data.find(
      (category: ICategory) => category.id === item.category.id,
    )?.title;

    return (
      <AntdList.Item
        actions={[
          <Space key={item.id} direction="vertical" align="end">
            <NumberField
              value={hit}
              options={{
                notation: "compact",
              }}
            />
            <Text>{categoryTitle}</Text>
          </Space>,
        ]}
      >
        <AntdList.Item.Meta title={title} description={content} />
      </AntdList.Item>
    );
  };

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters),

    pagination: {
      mode: "server",
    },
  });

  const createdAt = useMemo(() => {
    const start = getDefaultFilter("createdAt", filters, "gte");
    const end = getDefaultFilter("createdAt", filters, "lte");

    const startFrom = dayjs(start);
    const endAt = dayjs(end);

    if (start && end) {
      return [startFrom, endAt];
    }
    return undefined;
  }, [filters]);

  return (
    <List>
      <Form
        {...searchFormProps}
        layout="vertical"
        onValuesChange={() => searchFormProps.form?.submit()}
        initialValues={{
          category: getDefaultFilter("category.id", filters),
          createdAt,
        }}
      >
        <Space wrap>
          <Form.Item label="Category" name="category">
            <Select
              {...categorySelectProps}
              style={{ minWidth: "250px" }}
              allowClear
              placeholder="Search Categories"
            />
          </Form.Item>
          <Form.Item label="Created At" name="createdAt">
            <RangePicker />
          </Form.Item>
        </Space>
      </Form>
      <AntdList {...listProps} renderItem={renderItem} />
    </List>
  );
};
