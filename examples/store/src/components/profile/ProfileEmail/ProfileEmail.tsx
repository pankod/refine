import React, { useEffect } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useWatch } from "react-hook-form";
import type { Customer } from "@medusajs/medusa";

import { Input } from "@components";
import { AccountInfo } from "@components/account";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

type UpdateCustomerEmailFormData = {
  email: string;
};

export const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    refineCore: { onFinish, mutation: mutationResult },
  } = useForm<UpdateCustomerEmailFormData>({
    defaultValues: {
      email: customer.email,
    },
    refineCoreProps: {
      resource: "customers/me",
      action: "edit",
      redirect: false,
      invalidates: ["all"],
    },
  });

  const { isLoading, isSuccess } = mutationResult;

  useEffect(() => {
    reset({
      email: customer.email,
    });
  }, [customer, reset]);

  const email = useWatch({
    control,
    name: "email",
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onFinish(data);
      })}
      className="w-full"
    >
      <AccountInfo
        label="Email"
        currentInfo={`${customer.email}`}
        isLoading={isLoading}
        isSuccess={isSuccess}
        errorMessage={errorMessage}
        clearState={() => undefined}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Email"
            {...register("email", {
              required: true,
            })}
            defaultValue={email}
            errors={errors}
          />
        </div>
      </AccountInfo>
    </form>
  );
};
