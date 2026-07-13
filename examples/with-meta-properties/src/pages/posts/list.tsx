import { List, FilterDropdown, TagField, useTable } from "@refinedev/antd";
import { Table, Radio } from "antd";

import type { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>({
    meta: {
      isAwesome: true,
      foo: "bar",
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
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
    </List>
  );
};
