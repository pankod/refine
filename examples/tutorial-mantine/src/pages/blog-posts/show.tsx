import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const BlogPostShow = () => {
  const { query: queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        Id
      </Title>
      <NumberField value={record?.id ?? ""} />
      <Title my="xs" order={5}>
        Title
      </Title>
      <TextField value={record?.title} />
      <Title mt="xs" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
      <Title my="xs" order={5}>
        Category
      </Title>
      {categoryIsLoading ? <>Loading...</> : <>{categoryData?.title}</>}
      <Title my="xs" order={5}>
        Status
      </Title>
      <TextField value={record?.status} />
      <Title my="xs" order={5}>
        Created At
      </Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
