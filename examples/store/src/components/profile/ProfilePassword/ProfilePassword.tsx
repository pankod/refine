import React, { useEffect } from "react";
import type { Customer } from "@medusajs/medusa";
import { useForm } from "@refinedev/react-hook-form";
import { useCreate } from "@refinedev/core";

import { Input } from "@components";
import { AccountInfo } from "@components/account";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

type UpdateCustomerPasswordFormData = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined,
  );

  const [isValid, setIsValid] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    refineCore: { onFinish, mutation: mutationResult },
  } = useForm<UpdateCustomerPasswordFormData>({
    refineCoreProps: {
      action: "edit",
      resource: "customers",
      id: "me",
      redirect: false,
    },
  });

  const { isLoading, isSuccess } = mutationResult;

  useEffect(() => {
    reset();
  }, [customer, reset]);

  const { mutateAsync } = useCreate({
    resource: "auth",
    mutationOptions: {
      onSuccess: () => {
        return setIsValid(true);
      },
    },
  });

  const updatePassword = async (data: UpdateCustomerPasswordFormData) => {
    mutateAsync({
      values: {
        email: customer.email,
        password: data.old_password,
      },
    });

    if (!isValid) {
      setError("old_password", {
        type: "validate",
        message: "Old password is incorrect",
      });
      setErrorMessage("Old password is incorrect");

      return;
    }

    if (data.new_password !== data.confirm_password) {
      setError("confirm_password", {
        type: "validate",
        message: "Passwords do not match",
      });
      setErrorMessage("Passwords do not match");

      return;
    }

    return onFinish({
      password: data.new_password,
    });
  };

  return (
    <form
      // eslint-disable-next-line
      onSubmit={handleSubmit(updatePassword as any)}
      onReset={() => reset()}
      className="w-full"
    >
      <AccountInfo
        label="Password"
        currentInfo={
          <span>The password is not shown for security reasons</span>
        }
        isLoading={isLoading}
        isSuccess={isSuccess}
        errorMessage={errorMessage}
        clearState={reset}
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Old password"
            {...register("old_password", {
              required: true,
            })}
            type="password"
            errors={errors}
          />
          <Input
            label="New password"
            type="password"
            {...register("new_password", { required: true })}
            errors={errors}
          />
          <Input
            label="Confirm password"
            type="password"
            {...register("confirm_password", { required: true })}
            errors={errors}
          />
        </div>
      </AccountInfo>
    </form>
  );
};
