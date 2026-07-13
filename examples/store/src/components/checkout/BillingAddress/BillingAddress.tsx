import { useFormContext } from "react-hook-form";

import { Input, CountrySelect } from "@components";
import type { CheckoutFormValues } from "@lib/context/checkout";

export const BillingAddress: React.FC = () => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="bg-primary grid grid-cols-1 gap-y-2">
      <div className="grid grid-cols-2 gap-x-2">
        <Input
          label="First name"
          {...register("billing_address.first_name", {
            required: "First name is required",
          })}
          autoComplete="given-name"
          errors={errors}
          touched={touchedFields}
        />
        <Input
          label="Last name"
          {...register("billing_address.last_name", {
            required: "Last name is required",
          })}
          autoComplete="family-name"
          errors={errors}
          touched={touchedFields}
        />
      </div>
      <Input
        label="Company"
        {...register("billing_address.company")}
        autoComplete="organization"
        errors={errors}
        touched={touchedFields}
      />
      <Input
        label="Address"
        {...register("billing_address.address_1", {
          required: "Address is required",
        })}
        autoComplete="address-line1"
        errors={errors}
        touched={touchedFields}
      />
      <Input
        label="Apartments, suite, etc."
        {...register("billing_address.address_2")}
        autoComplete="address-line2"
        errors={errors}
        touched={touchedFields}
      />
      <div className="grid grid-cols-[144px_1fr] gap-x-2">
        <Input
          label="Postal code"
          {...register("billing_address.postal_code", {
            required: "Postal code is required",
          })}
          autoComplete="postal-code"
          errors={errors}
          touched={touchedFields}
        />
        <Input
          label="City"
          {...register("billing_address.city", {
            required: "City is required",
          })}
          autoComplete="address-level2"
          errors={errors}
          touched={touchedFields}
        />
      </div>
      <CountrySelect registerName="billing_address.country_code" />
      <Input
        label="State / Province"
        {...register("billing_address.province")}
        autoComplete="address-level1"
        errors={errors}
        touched={touchedFields}
      />
      <Input
        label="Phone"
        {...register("billing_address.phone")}
        autoComplete="tel"
        errors={errors}
        touched={touchedFields}
      />
    </div>
  );
};
