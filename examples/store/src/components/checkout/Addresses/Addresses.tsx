import cn, { clsx } from "clsx";

import {
  Button,
  Checkbox,
  BillingAddress,
  ShippingAddress,
  LoadingDots,
} from "@components";
import { useCheckout } from "@lib/context";

import { StepTitle } from "../StepTitle";
import { IconPen } from "@components/icons/icon-pen";

export const Addresses: React.FC = () => {
  const {
    editAddresses: { state: isEdit },
  } = useCheckout();

  return (
    <div className={clsx()}>
      <StepTitle title="Shipping Address" step={1} />
      <div className="bg-gray-normal h-px w-full" />
      {isEdit ? <AddressEdit /> : <AddressView />}
    </div>
  );
};

const AddressEdit = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    setAddresses,
    handleSubmit,
  } = useCheckout();

  return (
    <div className={clsx("py-4", "flex", "flex-col", "w-full", "gap-4")}>
      <ShippingAddress />
      <div className="py-6">
        <Checkbox
          label="Same as billing address"
          checked={checked}
          onChange={onChange}
        />
      </div>
      {!checked && (
        <div className="mb-6">
          <StepTitle title="Billing Address" step={2} />
          <BillingAddress />
        </div>
      )}
      <Button
        // variant="slim"
        className={clsx(
          "px-5 py-5",
          "w-full",
          "text-base",
          "uppercase",
          "rounded-lg",
          "text-gray-lightest",
          "font-normal",
          "leading-6",
        )}
        onClick={handleSubmit(setAddresses)}
      >
        Continue to delivery
      </Button>
    </div>
  );
};

const AddressView = () => {
  const {
    sameAsBilling: { state: checked },
    editAddresses: { toggle: setEdit },
    cart,
  } = useCheckout();

  return (
    <div
      className={clsx(
        "py-4",
        "flex",
        "flex-col",
        "w-full",
        "gap-4",
        "text-base",
        "text-gray-darkest",
        "relative",
      )}
    >
      {cart?.shipping_address ? (
        <div
          className={clsx(
            "flex",
            "flex-col",
            "w-full",
            "gap-2",
            "text-base",
            "text-gray-darkest",
            "leading-6",
            "font-normal",
          )}
        >
          <span>
            {cart.shipping_address.first_name} {cart.shipping_address.last_name}
          </span>
          <span>
            {cart.shipping_address.address_1} {cart.shipping_address.address_2}
          </span>
          <span>
            {cart.shipping_address.postal_code}, {cart.shipping_address.city}
          </span>
          <span>{cart.shipping_address.country_code?.toUpperCase()}</span>
          <span>{cart.shipping_address.phone}</span>
          <span>{cart.email}</span>
          {checked && (
            <div
              className={clsx(
                "pt-4",
                "flex",
                "items-center",
                "justify-start",
                "gap-2",
              )}
            >
              <div
                className={clsx(
                  "bg-gray-light",
                  "rounded-lg",
                  "w-6",
                  "h-6",
                  "flex-shrink-0",
                  "text-gray-darkest",
                  "text-base",
                  "justify-center",
                  "items-center",
                  "flex",
                )}
              >
                ✓
              </div>
              <span
                className={clsx(
                  "text-base",
                  "text-gray-darkest",
                  "font-semibold",
                )}
              >
                Same as billing address
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto py-20">
          <LoadingDots />
        </div>
      )}
      {!checked && cart?.billing_address && (
        <div
          className={clsx(
            "flex",
            "flex-col",
            "w-full",
            "gap-2",
            "text-base",
            "text-gray-darkest",
            "leading-6",
            "font-normal",
          )}
        >
          <span
            className={clsx(
              "font-semibold",
              "mb-2",
              "text-base",
              "text-gray-darkest",
            )}
          >
            Billing Address
          </span>
          <span>
            {cart.billing_address.first_name} {cart.billing_address.last_name}
          </span>
          <span>
            {cart.billing_address.address_1} {cart.billing_address.address_2}
          </span>
          <span>
            {cart.billing_address.postal_code}, {cart.billing_address.city}
          </span>
          <span>{cart.billing_address.country_code?.toUpperCase()}</span>
          <span>{cart.billing_address.phone}</span>
        </div>
      )}
      <div className={clsx("absolute", "right-0", "top-4")}>
        <button
          className={clsx(
            "py-1",
            "pr-3",
            "pl-2",
            "border-gray-dark border",
            "rounded-2xl",
            "text-xs",
            "flex",
            "items-center",
            "justify-center",
            "gap-2",
            "hover:bg-gray-lighter",
            "active:bg-transparent",
          )}
          onClick={setEdit}
        >
          <IconPen />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};
