import { type HttpError, useBack } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

import type { ICategory } from "../../interfaces";

export const CategoryCreate = () => {
  const goBack = useBack();

  const {
    refineCore: { onFinish, formLoading },
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICategory, HttpError, ICategory>({
    defaultValues: {
      title: "",
    },
  });

  const getFormErrorMessage = (name: keyof ICategory) => {
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
        <div className="flex align-items-center">
          <Button
            onClick={goBack}
            icon="pi pi-arrow-left"
            className="mr-1"
            text
            severity="secondary"
          />
          <span>Create Category</span>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onFinish)}>
        <div className="p-fluid">
          <Controller
            name="title"
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
        </div>
        <div className="flex justify-content-end">
          <Button label="Save" type="submit" loading={formLoading} />
        </div>
      </form>
    </Card>
  );
};
