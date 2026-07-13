"use client";

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany, useTranslation } from "@refinedev/core";
import { Space, Table, Typography } from "antd";

export default function BlogPostList() {
  const { translate: t } = useTranslation();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useMany({
    resource: "categories",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={t("ID")} />
        <Table.Column dataIndex="title" title={t("blog_posts.fields.title")} />
        <Table.Column
          dataIndex="content"
          title={t("blog_posts.fields.content")}
          render={(value: any) => {
            if (!value) return "-";
            return <MarkdownField value={`${value.slice(0, 80)}...`} />;
          }}
        />
        <Table.Column
          dataIndex={"category"}
          title={t("blog_posts.fields.category")}
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value?.id)?.title
            )
          }
        />
        <Table.Column
          dataIndex="status"
          title={t("blog_posts.fields.status.title")}
          render={(value: string) => {
            return (
              <Typography.Text>
                {t(`blog_posts.fields.status.${value}`)}
              </Typography.Text>
            );
          }}
        />
        <Table.Column
          dataIndex={["createdAt"]}
          title={t("blog_posts.fields.createdAt")}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={t("table.actions")}
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
}
