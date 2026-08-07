import React, { useEffect, useMemo } from "react";
import { useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useWatch } from "react-hook-form";
import type {
  Country,
  Customer,
  Region,
  StorePostCustomersCustomerReq,
} from "@medusajs/medusa";

import { Input } from "@components/ui";
import { NativeSelect } from "@components/common";
import { AccountInfo } from "@components/account";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

type UpdateCustomerNameFormData = Pick<
  StorePostCustomersCustomerReq,
  "billing_address"
>;

export const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, touchedFields },
    refineCore: { onFinish, mutation: mutationResult },
  } = useForm<UpdateCustomerNameFormData>({
    refineCoreProps: {
      action: "edit",
      resource: "customers",
      id: "me",
      redirect: false,
      invalidates: ["all"],
    },
    defaultValues: {
      ...mapBillingAddressToFormData({ customer }),
    },
  });

  const { isLoading, isSuccess } = mutationResult;

  useEffect(() => {
    reset({
      ...mapBillingAddressToFormData({ customer }),
    });
  }, [customer, reset]);

  const [
    firstName,
    lastName,
    company,
    address1,
    address2,
    city,
    province,
    postalCode,
  ] = useWatch({
    control,
    name: [
      "billing_address.first_name",
      "billing_address.last_name",
      "billing_address.company",
      "billing_address.address_1",
      "billing_address.address_2",
      "billing_address.city",
      "billing_address.province",
      "billing_address.postal_code",
      "billing_address.country_code",
    ],
  });

  const { result: regions } = useList<Region>({
    resource: "regions",
  });

  const countriesByRegion = regions?.data.map((region) => region.countries);

  const countries =
    countriesByRegion && ([] as Country[]).concat(...(countriesByRegion ?? []));

  const currentInfo = useMemo(() => {
    if (!customer.billing_address) {
      return "No billing address";
    }

    return (
      <div className="flex flex-col font-semibold">
        <span>
          {customer.billing_address.first_name}{" "}
          {customer.billing_address.last_name}
        </span>
        <span>{customer.billing_address.company}</span>
        <span>
          {customer.billing_address.address_1}
          {customer.billing_address.address_2
            ? `, ${customer.billing_address.address_2}`
            : ""}
        </span>
        <span>
          {customer.billing_address.postal_code},{" "}
          {customer.billing_address.city}
        </span>
        <span>{customer.billing_address.country as React.ReactNode}</span>
      </div>
    );
  }, [customer]);

  return (
    <form
      onSubmit={handleSubmit(onFinish)}
      onReset={() => reset(mapBillingAddressToFormData({ customer }))}
      className="w-full"
    >
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isLoading={isLoading}
        isSuccess={isSuccess}
        clearState={reset}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              {...register("billing_address.first_name", {
                required: true,
              })}
              defaultValue={firstName}
              errors={errors}
            />
            <Input
              label="Last name"
              {...register("billing_address.last_name", {
                required: true,
              })}
              defaultValue={lastName}
              errors={errors}
            />
          </div>
          <Input
            label="Company"
            {...register("billing_address.company")}
            defaultValue={company}
            errors={errors}
          />
          <Input
            label="Address"
            {...register("billing_address.address_1", {
              required: true,
            })}
            defaultValue={address1}
            errors={errors}
          />
          <Input
            label="Apartment, suite, etc."
            {...register("billing_address.address_2")}
            defaultValue={address2}
            errors={errors}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postal code"
              {...register("billing_address.postal_code", {
                required: true,
              })}
              defaultValue={postalCode}
              errors={errors}
            />
            <Input
              label="City"
              {...register("billing_address.city", {
                required: true,
              })}
              defaultValue={city}
              errors={errors}
            />
          </div>
          <Input
            label="Province"
            {...register("billing_address.province")}
            defaultValue={province}
            errors={errors}
          />
          <NativeSelect
            label="Country/Region"
            {...register("billing_address.country_code", {
              required: "country is required",
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
        </div>
      </AccountInfo>
    </form>
  );
};

const mapBillingAddressToFormData = ({ customer }: MyInformationProps) => {
  return {
    billing_address: {
      first_name: customer.billing_address?.first_name || undefined,
      last_name: customer.billing_address?.last_name || undefined,
      company: customer.billing_address?.company || undefined,
      address_1: customer.billing_address?.address_1 || undefined,
      address_2: customer.billing_address?.address_2 || undefined,
      city: customer.billing_address?.city || undefined,
      province: customer.billing_address?.province || undefined,
      postal_code: customer.billing_address?.postal_code || undefined,
      country_code: customer.billing_address?.country_code || undefined,
    },
  };
};
