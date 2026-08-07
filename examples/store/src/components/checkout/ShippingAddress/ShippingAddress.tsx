import { useOne } from "@refinedev/core";
import { useFormContext } from "react-hook-form";
import type { Customer } from "@medusajs/medusa";

import { emailRegex } from "@lib/regex";
import type { CheckoutFormValues } from "@lib/context";
import { Input, CountrySelect, AddressSelect } from "@components";
import clsx from "clsx";

export const ShippingAddress: React.FC = () => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<CheckoutFormValues>();

  const { result: customerData } = useOne<{ customer: Customer }>({
    resource: "customers/me",
    id: "",
  });
  const customer = customerData?.customer;

  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="flex flex-col gap-4 pb-5">
          <p className={clsx("text-base", "font-normal", "text-gray-darkest")}>
            {`Hi ${customer?.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect addresses={customer?.shipping_addresses ?? []} />
          <div className="bg-gray-normal mt-4 h-px w-full" />
        </div>
      )}
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-2 gap-x-8">
          <Input
            label="First name"
            {...register("shipping_address.first_name", {
              required: "First name is required",
            })}
            autoComplete="given-name"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Last name"
            {...register("shipping_address.last_name", {
              required: "Last name is required",
            })}
            autoComplete="family-name"
            errors={errors}
            touched={touchedFields}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          <Input
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Email is invalid",
              },
            })}
            autoComplete="email"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Company"
            {...register("shipping_address.company")}
            autoComplete="organization"
            errors={errors}
            touched={touchedFields}
          />
        </div>
        <div className="grid grid-cols-1 gap-5">
          <Input
            label="Address"
            {...register("shipping_address.address_1", {
              required: "Address is required",
            })}
            autoComplete="address-line1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Apartments, suite, etc."
            {...register("shipping_address.address_2")}
            autoComplete="address-line2"
            errors={errors}
            touched={touchedFields}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          <Input
            label="City"
            {...register("shipping_address.city", {
              required: "City is required",
            })}
            autoComplete="address-level2"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Postal code"
            {...register("shipping_address.postal_code", {
              required: "Postal code is required",
            })}
            containerClassName="max-w-[160px]"
            autoComplete="postal-code"
            errors={errors}
            touched={touchedFields}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          <CountrySelect registerName="shipping_address.country_code" />
          <Input
            label="State / Province"
            {...register("shipping_address.province")}
            autoComplete="address-level1"
            errors={errors}
            touched={touchedFields}
          />
        </div>
        <Input
          label="Phone"
          {...register("shipping_address.phone")}
          autoComplete="tel"
          errors={errors}
          touched={touchedFields}
        />
      </div>
    </div>
  );
};
