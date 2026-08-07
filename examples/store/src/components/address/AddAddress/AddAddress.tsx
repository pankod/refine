import React from "react";
import { useList } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import type { Country, Region } from "@medusajs/medusa";

import { Modal, Button, LoadingDots, Input, NativeSelect } from "@components";
import { Plus } from "@icons";

interface FormValues {
  first_name: string;
  last_name: string;
  city: string;
  country_code: string;
  postal_code: string;
  province?: string;
  address_1: string;
  address_2?: string;
  phone?: string;
  company?: string;
}

export const AddAddress: React.FC = () => {
  const handleClose = () => {
    reset({
      first_name: "",
      last_name: "",
      city: "",
      country_code: "",
      postal_code: "",
      address_1: "",
      address_2: "",
      company: "",
      phone: "",
      province: "",
    });
    close();
  };

  const {
    modal: { show, visible, close },
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    refineCore: { onFinish, formLoading },
    reset,
  } = useModalForm<FormValues>({
    mode: "onTouched",
    refineCoreProps: {
      action: "create",
      resource: "customers/me/addresses",
      redirect: false,
      onMutationSuccess: () => {
        handleClose();
      },
      invalidates: ["all"],
    },
    warnWhenUnsavedChanges: false,
  });

  const { result: regions } = useList<Region>({
    resource: "regions",
  });

  const countriesByRegion = regions?.data.map((region) => region.countries);

  const countries =
    countriesByRegion && ([] as Country[]).concat(...(countriesByRegion ?? []));

  return (
    <>
      <button
        className="text-primary border-accent-2 flex h-full min-h-[220px] w-full flex-col justify-between border p-5"
        onClick={() => show()}
      >
        <span className="text-base-semi">New address</span>
        <Plus size={24} />
      </button>
      {visible && (
        <Modal onClose={handleClose}>
          <form
            onSubmit={handleSubmit((data) => {
              onFinish({
                address: {
                  ...data,
                },
              });
            })}
            className="grid grid-cols-1 gap-y-2"
          >
            <div className="text-xl-semi mb-2">Add address</div>
            <div className="grid grid-flow-row grid-cols-12 gap-3">
              <Input
                containerClassName="col-span-6"
                label="First name"
                {...register("first_name", {
                  required: {
                    value: true,
                    message: "first name is required",
                  },
                })}
                errors={errors}
                touched={touchedFields}
              />
              <Input
                containerClassName="col-span-6"
                label="Last name"
                {...register("last_name", {
                  required: {
                    value: true,
                    message: "last name is required",
                  },
                })}
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <Input
              label="Company (Optional)"
              {...register("company")}
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Address"
              {...register("address_1", {
                required: {
                  value: true,
                  message: "Address is required",
                },
              })}
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Apartment, Suite, Etc. (Optional)"
              {...register("address_2")}
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-flow-row grid-cols-12 gap-3">
              <Input
                containerClassName="col-span-6"
                label="Postal Code"
                {...register("postal_code", {
                  required: {
                    value: true,
                    message: "postal code is required",
                  },
                })}
                errors={errors}
                touched={touchedFields}
              />
              <Input
                containerClassName="col-span-6"
                label="City"
                {...register("city", {
                  required: {
                    value: true,
                    message: "city is required",
                  },
                })}
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <NativeSelect
              label="Country/Region"
              {...register("country_code", {
                required: {
                  value: true,
                  message: "country is required",
                },
              })}
              errors={errors}
              touched={touchedFields}
            >
              {countries?.map((country, index) => (
                <option key={index} value={country.iso_2}>
                  {country.display_name}
                </option>
              ))}
            </NativeSelect>
            <div className="grid grid-flow-row grid-cols-12 gap-3">
              <Input
                containerClassName="col-span-6"
                label="Province"
                {...register("province", {
                  required: {
                    value: true,
                    message: "province is required",
                  },
                })}
                errors={errors}
                touched={touchedFields}
              />
              <Input
                containerClassName="col-span-6"
                label="Phone"
                {...register("phone")}
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <div className="mt-4">
              <Button
                className="min-h-0 !border-gray-200 !bg-gray-200 !text-gray-900"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" className="min-h-0" disabled={formLoading}>
                Save
                {formLoading && <LoadingDots />}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
