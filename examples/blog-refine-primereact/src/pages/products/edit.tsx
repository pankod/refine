import { type HttpError, useBack, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

import type { IProduct } from "../../interfaces";

export const ProductEdit = () => {
  const goBack = useBack();

  const {
    refineCore: { onFinish, formLoading, query: queryResult },
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProduct, HttpError, IProduct>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { options: categoryOptions } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  const getFormErrorMessage = (name: keyof IProduct) => {
    return errors[name] ? (
      <small className="p-error">{errors[name]?.message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <Card
      className="shadow-1"
      title={
        <div className="flex justify-content-between align-items-center">
          <div className="flex align-items-center">
            <Button
              onClick={goBack}
              icon="pi pi-arrow-left"
              className="mr-1"
              text
              severity="secondary"
            />
            <span>Edit Product</span>
          </div>
          <Button
            label="Refresh"
            icon="pi pi-refresh"
            outlined
            onClick={() => queryResult?.refetch()}
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit(onFinish)}>
        <div className="p-fluid">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required." }}
            render={({ field, fieldState }) => (
              <div className="mb-1">
                <label htmlFor={field.name}>Name</label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames("mb-1 mt-1", {
                    "p-invalid": fieldState.error,
                  })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                {getFormErrorMessage(field.name)}
              </div>
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required.",
            }}
            render={({ field, fieldState }) => (
              <div className="mb-1">
                <label htmlFor={field.name}>Price</label>
                <InputNumber
                  id={field.name}
                  inputRef={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => field.onChange(e.value ?? 0)}
                  useGrouping={false}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  inputClassName={classNames({
                    "p-invalid": fieldState.error,
                  })}
                  className="mb-1 mt-1"
                />
                {getFormErrorMessage(field.name)}
              </div>
            )}
          />
          <Controller
            name="category.id"
            control={control}
            rules={{ required: "Category is required." }}
            render={({ field, fieldState }) => (
              <div className="mb-1">
                <label htmlFor={field.name}>Category</label>
                <Dropdown
                  id={field.name}
                  value={field.value}
                  placeholder="Select a Category"
                  options={categoryOptions}
                  focusInputRef={field.ref}
                  onChange={(e) => field.onChange(e.value)}
                  className={classNames("mb-1 mt-1", {
                    "p-invalid": fieldState.error,
                  })}
                />
                <small className="p-error">&nbsp;</small>
                <small className="p-error">
                  {errors.category?.id?.message}
                </small>
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required." }}
            render={({ field, fieldState }) => (
              <div className="mb-1">
                <label htmlFor={field.name}>Description</label>
                <InputTextarea
                  id={field.name}
                  {...field}
                  rows={4}
                  cols={30}
                  className={classNames("mb-1 mt-1", {
                    "p-invalid": fieldState.error,
                  })}
                />
                {getFormErrorMessage(field.name)}
              </div>
            )}
          />
        </div>
        <div className="flex justify-content-end">
          <Button label="Save" type="submit" loading={formLoading} />
        </div>
      </form>
    </Card>
  );
};
