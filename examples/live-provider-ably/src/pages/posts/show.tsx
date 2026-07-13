import { useState } from "react";
import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  MarkdownField,
  DeleteButton,
  ListButton,
  EditButton,
  RefreshButton,
} from "@refinedev/antd";
import { Typography, Alert } from "antd";

import type { IPost, ICategory } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const [deprecated, setDeprecated] = useState<
    "deleted" | "updated" | undefined
  >();

  const { query: queryResult } = useShow<IPost>({
    liveMode: "manual",
    onLiveEvent: (event) => {
      if (event.type === "deleted" || event.type === "updated") {
        setDeprecated(event.type);
      }
    },
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const handleRefresh = () => {
    queryResult?.refetch();
    setDeprecated(undefined);
  };

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <>
            <ListButton />
            <EditButton />
            <DeleteButton />
            <RefreshButton onClick={handleRefresh} />
          </>
        ),
      }}
    >
      {deprecated === "deleted" && (
        <Alert
          message="This post is deleted."
          type="warning"
          style={{
            marginBottom: 20,
          }}
          action={<ListButton size="small" />}
        />
      )}
      {deprecated === "updated" && (
        <Alert
          message="This post is updated. Refresh to see changes."
          type="warning"
          style={{
            marginBottom: 20,
          }}
          action={<RefreshButton size="small" onClick={handleRefresh} />}
        />
      )}
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.title}</Text>
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
