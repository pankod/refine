import { useOne } from "@refinedev/core";
import type { StoreCustomersRes } from "@medusajs/medusa";

import { AddressBook } from "@components";

export const AddressesTemplate: React.FC = () => {
  const { result: customer } = useOne<StoreCustomersRes>({
    resource: "customers",
    id: "me",
  });

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Shipping Addresses</h1>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div>
      <AddressBook customer={customer?.customer} />
    </div>
  );
};
