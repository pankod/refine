import { useShow, useTranslate } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  BooleanField,
} from "@refinedev/mui";

import Typography from "@mui/material/Box";
import Stack from "@mui/material/Box";

export const CategoryShow = () => {
  const translate = useTranslate();
  const { query: queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography component="div" fontWeight="bold">
          {translate("categories.fields.id")}
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography component="div" fontWeight="bold">
          {translate("categories.fields.title")}
        </Typography>
        <TextField value={record?.title} />
        <Typography component="div" fontWeight="bold">
          {translate("isActive")}
        </Typography>
        <BooleanField value={record?.isActive} />
      </Stack>
    </Show>
  );
};
