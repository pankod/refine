import type { Address, ShippingMethod } from "@medusajs/medusa";
import clsx from "clsx";

interface ShippingDetailsProps {
  address: Address;
  shippingMethods: ShippingMethod[];
}

export const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  address,
  shippingMethods,
}) => {
  return (
    <div className={clsx("text-base", "text-gray-darkest")}>
      <h2 className={clsx("font-medium", "text-base", "text-gray-darkest")}>
        Delivery
      </h2>
      <div className="py-2">
        <div className="flex flex-col">
          <span>{`${address.first_name} ${address.last_name}`}</span>
          <span>{`${address.address_1}${
            address.address_2 && `, ${address.address_2}`
          }`}</span>
          <span>{`${address.city}, ${address.province} ${address.postal_code}`}</span>
          <span>{address.country_code?.toUpperCase()}</span>
        </div>
      </div>
      <div className="py-2">
        <h3 className={clsx("font-medium", "text-base", "text-gray-darkest")}>
          Delivery method
        </h3>
        <div className="py-2">
          {shippingMethods.map((sm) => {
            return <div key={sm.id}>{sm.shipping_option.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
