import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  MarkdownField,
  DateField,
} from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

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
      <Heading as="h5" size="sm" mt={4}>
        Id
      </Heading>
      <NumberField value={record?.id ?? ""} />
      <Heading as="h5" size="sm" mt={4}>
        Title
      </Heading>
      <TextField value={record?.title} />
      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      <MarkdownField value={record?.content} />
      <Heading as="h5" size="sm" mt={4}>
        Category
      </Heading>
      {categoryIsLoading ? <>Loading...</> : <>{categoryData?.title}</>}
      <Heading as="h5" size="sm" mt={4}>
        Status
      </Heading>
      <TextField value={record?.status} />
      <Heading as="h5" size="sm" mt={4}>
        Created At
      </Heading>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
