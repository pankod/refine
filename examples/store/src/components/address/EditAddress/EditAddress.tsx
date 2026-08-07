import React from "react";
import cn from "clsx";
import { useModalForm } from "@refinedev/react-hook-form";
import type { Address, Country, Region } from "@medusajs/medusa";
import { useDelete, useList } from "@refinedev/core";

import { Trash, Edit } from "@icons";
import { LoadingDots, Modal, Button, Input } from "@components";
import { NativeSelect } from "@components/common";

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

interface EditAddressProps {
  address: Address;
  isActive?: boolean;
}

export const EditAddress: React.FC<EditAddressProps> = ({
  address,
  isActive = false,
}) => {
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
    modal: { show, close, visible },
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
    refineCore: { onFinish, formLoading },
  } = useModalForm<FormValues>({
    defaultValues: {
      first_name: address.first_name || undefined,
      last_name: address.last_name || undefined,
      city: address.city || undefined,
      address_1: address.address_1 || undefined,
      address_2: address.address_2 || undefined,
      country_code: address.country_code || undefined,
      postal_code: address.postal_code || undefined,
      phone: address.phone || undefined,
      company: address.company || undefined,
      province: address.province || undefined,
    },
    refineCoreProps: {
      action: "create",
      resource: `customers/me/addresses/${address.id}`,
      redirect: false,
      onMutationSuccess: () => {
        handleClose();
      },
      invalidates: ["all"],
    },
    warnWhenUnsavedChanges: false,
  });

  const { mutate } = useDelete();

  const { result: regions } = useList<Region>({
    resource: "regions",
  });

  const removeAddress = () => {
    mutate({
      resource: "customers/me/addresses",
      id: address.id,
      invalidates: ["all"],
    });
  };

  const countriesByRegion = regions?.data.map((region) => region.countries);

  const countries =
    countriesByRegion && ([] as Country[]).concat(...(countriesByRegion ?? []));

  return (
    <>
      <div
        className={cn(
          "border-accent-2 flex h-full min-h-[220px] w-full flex-col justify-between border p-5 transition-colors",
          {
            "border-primary": isActive,
          },
        )}
      >
        <div className="flex flex-col">
          <span className="text-base-semi text-left">
            {address.first_name} {address.last_name}
          </span>
          {address.company && (
            <span className="text-small-regular text-primary">
              {address.company}
            </span>
          )}
          <div className="text-base-regular mt-2 flex flex-col text-left">
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span>
              {address.postal_code}, {address.city}
            </span>
            <span>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="text-small-regular text-primary flex items-center gap-x-2"
            onClick={() => show()}
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            className="text-small-regular text-primary flex items-center gap-x-2"
            onClick={() => removeAddress()} // TODO: removed function here
          >
            <Trash />
            Remove
          </button>
        </div>
      </div>

      {visible && (
        <Modal onClose={handleClose}>
          <form
            onSubmit={handleSubmit((data) => {
              onFinish({
                ...data,
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
                required: "Address is required",
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
