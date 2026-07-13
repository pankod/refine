import { useOne } from "@refinedev/core";
import { useFormContext } from "react-hook-form";
import type { Cart, Country } from "@medusajs/medusa";

import { useCartContext } from "@lib/context";
import { NativeSelect } from "@components";

interface CountrySelectProps {
  registerName: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  registerName,
}) => {
  const { cart } = useCartContext();

  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  const { result: cartData } = useOne<{ cart: Cart }>({
    id: cart?.id || "",
    resource: "carts",
    queryOptions: {
      enabled: !!cart?.id,
    },
  });

  const countries: Country[] = cartData?.cart?.region.countries;

  return (
    <NativeSelect
      label="Country/Region"
      {...register(registerName, {
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
  );
};
