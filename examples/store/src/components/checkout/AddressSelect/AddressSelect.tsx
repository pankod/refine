import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import type { Address } from "@medusajs/medusa";
import { isEqual, omit } from "lodash";
import { useWatch } from "react-hook-form";
import cn from "clsx";

import { Radio } from "@components";
import { ChevronDown } from "@components/icons";
import { useCheckout } from "@lib/context/checkout";

import s from "./AddressSelect.module.css";

interface AddressSelectProps {
  addresses: Address[];
}

export const AddressSelect: React.FC<AddressSelectProps> = ({ addresses }) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const { control, setSavedAddress } = useCheckout();

  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id);

    if (savedAddress) {
      setSavedAddress(savedAddress);
    }

    setSelected(id);
  };

  const currentShippingAddress = useWatch({
    control,
    name: "shipping_address",
  });

  const selectedAddress = useMemo(() => {
    for (const address of addresses) {
      const checkEquality = isEqual(
        omit(address, [
          "id",
          "created_at",
          "updated_at",
          "country",
          "deleted_at",
          "metadata",
          "customer_id",
        ]),
        currentShippingAddress,
      );

      if (checkEquality) {
        return address;
      }
    }
  }, [currentShippingAddress, addresses]);

  return (
    <Listbox onChange={handleSelect} value={selected}>
      <div className="relative">
        <Listbox.Button
          className={cn(s.button, "rounded-lg", "text-gray-darkest")}
        >
          {({ open }) => (
            <>
              <span className="block truncate text-gray-darkest">
                {selectedAddress
                  ? selectedAddress.address_1
                  : "Choose an address"}
              </span>
              <ChevronDown
                size={16}
                className={cn("text-gray-dark", {
                  "rotate-180 transform": open,
                })}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={s.options}>
            {addresses.map((address) => {
              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  className={s.option}
                >
                  <div className="flex items-start gap-x-4">
                    <Radio checked={selected === address.id} />
                    <div className="flex flex-col">
                      <span className="text-base-semi text-left">
                        {address.first_name} {address.last_name}
                      </span>
                      {address.company && (
                        <span className="text-small-regular text-accent-7">
                          {address.company}
                        </span>
                      )}
                      <div className="text-base-regular mt-2 flex flex-col text-left">
                        <span>
                          {address.address_1}
                          {address.address_2 && (
                            <span>, {address.address_2}</span>
                          )}
                        </span>
                        <span>
                          {address.postal_code}, {address.city}
                        </span>
                        <span>
                          {address.province && `${address.province}, `}
                          {address.country_code?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
