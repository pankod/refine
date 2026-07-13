import { useShow, useTranslate, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  BooleanField,
  MarkdownField,
  DateField,
} from "@refinedev/mui";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const ProductShow = () => {
  const translate = useTranslate();
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
          {translate("id")}
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("Name")}
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          {translate("IsActive")}
        </Typography>
        <BooleanField value={record?.isActive} />
        <Typography variant="body1" fontWeight="bold">
          {translate("Description")}
        </Typography>
        <MarkdownField value={record?.description} />
        <Typography variant="body1" fontWeight="bold">
          {translate("CreatedAt")}
        </Typography>
        <DateField value={record?.createdAt} />
        <Typography variant="body1" fontWeight="bold">
          {translate("Price")}
        </Typography>
        <NumberField value={record?.price ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("Category")}
        </Typography>

        {categoryIsLoading ? <>Loading...</> : <>{categoryData?.title}</>}
      </Stack>
    </Show>
  );
};
