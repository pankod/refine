import { createFormContext } from "@mantine/form";

const [FormProvider, useFormContext, useForm] = createFormContext<unknown>();

export const FormContext = { FormProvider, useFormContext, useForm };
