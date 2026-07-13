import React, { useEffect } from "react";
import type { Customer } from "@medusajs/medusa";
import { useForm } from "@refinedev/react-hook-form";

import { useWatch } from "react-hook-form";

import { AccountInfo } from "@components/account";
import { Input } from "@components";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

type UpdateCustomerNameFormData = {
  first_name: string;
  last_name: string;
};

export const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
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
      first_name: customer.first_name,
      last_name: customer.last_name,
    },
  });

  const { isLoading, isSuccess } = mutationResult;

  useEffect(() => {
    reset({
      first_name: customer.first_name,
      last_name: customer.last_name,
    });
  }, [customer, reset]);

  const firstName = useWatch({
    control,
    name: "first_name",
  });
  const lastName = useWatch({
    control,
    name: "last_name",
  });

  return (
    <form onSubmit={handleSubmit(onFinish)} className="w-full">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isLoading={isLoading}
        isSuccess={isSuccess}
        clearState={reset}
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="First name"
            {...register("first_name", {
              required: true,
            })}
            defaultValue={firstName}
            errors={errors}
          />
          <Input
            label="Last name"
            {...register("last_name", { required: true })}
            defaultValue={lastName}
            errors={errors}
          />
        </div>
      </AccountInfo>
    </form>
  );
};
