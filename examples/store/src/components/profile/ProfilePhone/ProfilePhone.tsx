import React, { useEffect } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useWatch } from "react-hook-form";
import type { Customer } from "@medusajs/medusa";

import { Input } from "@components";
import { AccountInfo } from "@components/account";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

type UpdateCustomerPhoneFormData = {
  phone: string;
};

export const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    refineCore: { onFinish, mutation: mutationResult },
  } = useForm<UpdateCustomerPhoneFormData>({
    refineCoreProps: {
      action: "edit",
      resource: "customers",
      id: "me",
      redirect: false,
      invalidates: ["all"],
    },
    defaultValues: {
      phone: customer.phone || "",
    },
  });

  const { isLoading, isSuccess } = mutationResult;

  useEffect(() => {
    reset({
      phone: customer.phone,
    });
  }, [customer, reset]);

  const phone = useWatch({
    control,
    name: "phone",
  });

  return (
    <form onSubmit={handleSubmit(onFinish)} className="w-full">
      <AccountInfo
        label="Phone"
        currentInfo={customer.phone ? `${customer.phone}` : ""}
        isLoading={isLoading}
        isSuccess={isSuccess}
        clearState={reset}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Phone"
            {...register("phone", {
              required: true,
            })}
            defaultValue={phone}
            errors={errors}
          />
        </div>
      </AccountInfo>
    </form>
  );
};
