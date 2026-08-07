import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Content
        </Typography>
        <MarkdownField value={record?.content} />
        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>

        {categoryIsLoading ? <>Loading...</> : <>{categoryData?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={record?.status} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} />
      </Stack>
    </Show>
  );
};
