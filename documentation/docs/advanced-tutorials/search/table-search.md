---
id: table-search
title: "Table Search Tutorial | Pagination in Refine v5"
display_title: "Table Search"
sidebar_label: "Table Search"
description: "Learn to implement Table Search in Refine v5. Learn advanced patterns for pagination, sorting for production-ready workflows. Hands-on examples included."
---

We can make extensive search / filter operations using the `useTable` hook on the listing pages.

First, we create a form by extracting `searchFormProps` from `useTable`. We will use this form for search / filtering.

```tsx title="pages/list.tsx"
import {
  // highlight-next-line
  useTable,
  List,
} from "@refinedev/antd";
import {
  // highlight-start
  Form,
  Table,
  // highlight-end
  Row,
  Col,
  Button,
  DatePicker,
  Space,
  Input,
} from "antd";
// highlight-next-line
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

export const ListPage: React.FC = () => {
  // highlight-next-line
  const { searchFormProps } = useTable<IPost>();

  return (
    // highlight-start
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Form layout="vertical" {...searchFormProps}>
          <Form.Item label="Search" name="q">
            <Input
              placeholder="ID, Title, Content, etc."
              prefix={<SearchOutlined />}
            />
          </Form.Item>
          <Form.Item label="Created At" name="createdAt">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col lg={18} xs={24}>
        <List>
          <Table>...</Table>
        </List>
      </Col>
    </Row>
    // highlight-end
  );
};

interface IPost {
  id: number;
  title: string;
  createdAt: string;
}
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/table-search/form.png" />

<br />

When the form is submitted, the `onSearch` method runs and we get the search form values. We have to return an object of type [`CrudFilters`](/core/docs/core/interface-references#crudfilters) for this method.

```tsx title="pages/list.tsx"
...
import { HttpError } from "@refinedev/core";
import { Dayjs } from "dayjs";

const { searchFormProps } = useTable<IPost, HttpError, { title: string; createdAt: [Dayjs, Dayjs] }>({
    onSearch: (params) => {
        const filters: CrudFilters = [];
        const { q, createdAt } = params;

            filters.push(
                {
                    field: "q",
                    operator: "eq",
                    value: q,
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
...
```

:::caution

`CrudFilters` types object has `field`, `operator`, and `value` properties. These properties help us to filter in which field, with which operator, and with which data.

:::

## Example

<CodeSandboxExample path="table-antd-table-filter" />
