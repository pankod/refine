import React, { createContext, useContext, useEffect, useMemo } from "react";
import type {
  Address,
  Cart,
  Customer,
  ShippingOption,
  StorePostCartsCartReq,
} from "@medusajs/medusa";
import { isEqual } from "lodash";
import { formatAmount } from "medusa-react";
import { useRouter } from "next/router";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useCreate, useInvalidate, useOne, useUpdate } from "@refinedev/core";

import { useToggleState, type StateType } from "@lib/hooks";
import { useCartContext } from "@lib/context";
import { Wrapper } from "@components/checkout";

type AddressValues = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone: string;
};

export type CheckoutFormValues = {
  shipping_address: AddressValues;
  billing_address: AddressValues;
  email: string;
};

interface CheckoutContext {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total">;
  shippingMethods: { label: string; value: string; price: string }[];
  isLoading: boolean;
  readyToComplete: boolean;
  sameAsBilling: StateType;
  editAddresses: StateType;
  initPayment: () => Promise<void>;
  setAddresses: (addresses: CheckoutFormValues) => void;
  setSavedAddress: (address: Address) => void;
  setShippingOption: (soId: string) => void;
  setPaymentSession: (providerId: string) => void;
  onPaymentCompleted: () => void;
}

const CheckoutContext = createContext<CheckoutContext | null>(null);

interface CheckoutProviderProps {
  children?: React.ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const { push } = useRouter();
  const invalidate = useInvalidate();

  const {
    mutate: createMutate,
    mutateAsync: createMutateAsync,
    mutation: { isLoading: createIsLoading },
  } = useCreate();
  const {
    mutate: updateMutate,
    mutation: { isLoading: updateIsLoading },
  } = useUpdate();

  const { cart, countryCode, cartId, resetCart } = useCartContext();

  //TODO: Is customer data ok?
  const { result: customerData } = useOne<{ customer: Customer }>({
    resource: "customers/me",
    id: "",
  });
  const customer = customerData?.customer;

  const methods = useForm<CheckoutFormValues>({
    defaultValues: mapFormValues(customer, cart, countryCode),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const { result: shippingOptionsData } = useOne<{
    shipping_options: ShippingOption[];
  }>({
    resource: "shipping-options",
    // eslint-disable-next-line
    id: cartId!,
    queryOptions: {
      enabled: !!cartId,
    },
    meta: {
      cart,
    },
  });
  const shipping_options = shippingOptionsData?.shipping_options;

  const editAddresses = useToggleState();
  const sameAsBilling = useToggleState(
    cart?.billing_address && cart?.shipping_address
      ? isEqual(cart.billing_address, cart.shipping_address)
      : true,
  );

  /**
   * Boolean that indicates if a part of the checkout is loading.
   */
  const isLoading = useMemo(() => {
    return createIsLoading || updateIsLoading;
  }, [createIsLoading, updateIsLoading]);

  /**
   * Boolean that indicates if the checkout is ready to be completed. A checkout is ready to be completed if
   * the user has supplied a email, shipping address, billing address, shipping method, and a method of payment.
   */
  const readyToComplete = useMemo(() => {
    return (
      !!cart &&
      !!cart.email &&
      !!cart.shipping_address &&
      !!cart.billing_address &&
      !!cart.payment_session &&
      cart.shipping_methods?.length > 0
    );
  }, [cart]);

  const shippingMethods = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }));
    }

    return [];
  }, [shipping_options, cart]);

  /**
   * Resets the form when the cart changed.
   */
  useEffect(() => {
    if (cart?.id) {
      methods.reset(mapFormValues(customer, cart, countryCode));
    }
  }, [customer, cart, methods, countryCode]);

  useEffect(() => {
    if (!cart) {
      editAddresses.open();
      return;
    }

    if (cart?.shipping_address && cart?.billing_address) {
      editAddresses.close();
      return;
    }

    editAddresses.open();
  }, [cart]);

  /**
   * Method to set the selected shipping method for the cart. This is called when the user selects a shipping method, such as UPS, FedEx, etc.
   */
  const setShippingOption = (soId: string) => {
    if (cart) {
      createMutate(
        {
          resource: `carts/${cartId}/shipping-methods`,
          values: { option_id: soId },
        },
        {
          onSuccess: () => {
            invalidate({
              resource: "carts",
              id: cartId,
              invalidates: ["detail"],
            });
          },
        },
      );
    }
  };

  /**
   * Method to create the payment sessions available for the cart. Uses a idempotency key to prevent duplicate requests.
   */
  const createPaymentSession = async (cartId: string) => {
    return createMutateAsync(
      {
        resource: `carts/${cartId}/payment-sessions`,
        values: {},
      },
      {
        onSuccess: () => {
          invalidate({
            resource: "carts",
            id: cartId,
            invalidates: ["detail"],
          });
        },
      },
    );
  };

  /**
   * Method that calls the createPaymentSession method and updates the cart with the payment session.
   */
  const initPayment = async () => {
    if (cart?.id && !cart.payment_sessions?.length && cart?.items?.length) {
      const paymentSession = await createPaymentSession(cart.id);

      if (!paymentSession) {
        setTimeout(initPayment, 500);
      } else {
        invalidate({
          resource: "carts",
          id: cartId,
          invalidates: ["detail"],
        });
      }
    }
  };

  /**
   * Method to set the selected payment session for the cart. This is called when the user selects a payment provider, such as Stripe, PayPal, etc.
   */
  const setPaymentSession = (providerId: string) => {
    if (cart) {
      createMutate(
        {
          resource: `carts/${cart.id}/payment-session`,
          values: { provider_id: providerId },
        },
        {
          onSuccess: () => {
            invalidate({
              resource: "carts",
              id: cartId,
              invalidates: ["detail"],
            });
          },
        },
      );
    }
  };

  const prepareFinalSteps = () => {
    initPayment();

    if (shippingMethods) {
      setShippingOption(shippingMethods[0].value);
    }
  };

  const setSavedAddress = (address: Address) => {
    const setValue = methods.setValue;

    setValue("shipping_address", {
      address_1: address.address_1 || "",
      address_2: address.address_2 || "",
      city: address.city || "",
      country_code: address.country_code || "",
      first_name: address.first_name || "",
      last_name: address.last_name || "",
      phone: address.phone || "",
      postal_code: address.postal_code || "",
      province: address.province || "",
      company: address.company || "",
    });
  };

  /**
   * Method that sets the addresses and email on the cart.
   */
  const setAddresses = (data: CheckoutFormValues) => {
    const { shipping_address, billing_address, email } = data;

    const payload: StorePostCartsCartReq = {
      shipping_address,
      email,
      country_code: shipping_address.country_code,
    };

    if (isEqual(shipping_address, billing_address)) {
      sameAsBilling.open();
    }

    if (sameAsBilling.state) {
      payload.billing_address = shipping_address;
    } else {
      payload.billing_address = billing_address;
    }

    updateMutate(
      {
        resource: "carts",
        values: payload,
        id: cartId || "",
      },
      {
        onSuccess: () => {
          invalidate({
            resource: "carts",
            id: cartId,
            invalidates: ["detail"],
          });
          prepareFinalSteps();
        },
        onError: (error) => {
          if (error?.message?.includes("email")) {
            methods.setError("email", {
              type: "manual",
              message: "Email is invalid",
            });
          }
        },
      },
    );
  };

  /**
   * Method to complete the checkout process. This is called when the user clicks the "Complete Checkout" button.
   */
  const onPaymentCompleted = () => {
    createMutate(
      {
        resource: `carts/${cart?.id}/complete`,
        values: {},
      },
      {
        onSuccess: ({ data }) => {
          resetCart();
          push(`/order/confirmed/${data.data.id}`);
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <CheckoutContext.Provider
        value={{
          cart,
          shippingMethods,
          isLoading,
          readyToComplete,
          sameAsBilling,
          editAddresses,
          initPayment,
          setAddresses,
          setSavedAddress,
          setShippingOption,
          setPaymentSession,
          onPaymentCompleted,
        }}
      >
        <Wrapper paymentSession={cart?.payment_session}>{children}</Wrapper>
      </CheckoutContext.Provider>
    </FormProvider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  const form = useFormContext<CheckoutFormValues>();
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider",
    );
  }
  return { ...context, ...form };
};

/**
 * Method to map the fields of a potential customer and the cart to the checkout form values. Information is assigned with the following priority:
 * 1. Cart information
 * 2. Customer information
 * 3. Default values - null
 */
const mapFormValues = (
  customer?: Omit<Customer, "password_hash">,
  cart?: Omit<Cart, "refundable_amount" | "refunded_total">,
  currentCountry?: string,
): CheckoutFormValues => {
  const customerShippingAddress = customer?.shipping_addresses?.[0];
  const customerBillingAddress = customer?.billing_address;

  return {
    shipping_address: {
      first_name:
        cart?.shipping_address?.first_name ||
        customerShippingAddress?.first_name ||
        "",
      last_name:
        cart?.shipping_address?.last_name ||
        customerShippingAddress?.last_name ||
        "",
      address_1:
        cart?.shipping_address?.address_1 ||
        customerShippingAddress?.address_1 ||
        "",
      address_2:
        cart?.shipping_address?.address_2 ||
        customerShippingAddress?.address_2 ||
        "",
      city: cart?.shipping_address?.city || customerShippingAddress?.city || "",
      country_code:
        currentCountry ||
        cart?.shipping_address?.country_code ||
        customerShippingAddress?.country_code ||
        "",
      province:
        cart?.shipping_address?.province ||
        customerShippingAddress?.province ||
        "",
      company:
        cart?.shipping_address?.company ||
        customerShippingAddress?.company ||
        "",
      postal_code:
        cart?.shipping_address?.postal_code ||
        customerShippingAddress?.postal_code ||
        "",
      phone:
        cart?.shipping_address?.phone || customerShippingAddress?.phone || "",
    },
    billing_address: {
      first_name:
        cart?.billing_address?.first_name ||
        customerBillingAddress?.first_name ||
        "",
      last_name:
        cart?.billing_address?.last_name ||
        customerBillingAddress?.last_name ||
        "",
      address_1:
        cart?.billing_address?.address_1 ||
        customerBillingAddress?.address_1 ||
        "",
      address_2:
        cart?.billing_address?.address_2 ||
        customerBillingAddress?.address_2 ||
        "",
      city: cart?.billing_address?.city || customerBillingAddress?.city || "",
      country_code:
        cart?.shipping_address?.country_code ||
        customerBillingAddress?.country_code ||
        "",
      province:
        cart?.shipping_address?.province ||
        customerBillingAddress?.province ||
        "",
      company:
        cart?.billing_address?.company || customerBillingAddress?.company || "",
      postal_code:
        cart?.billing_address?.postal_code ||
        customerBillingAddress?.postal_code ||
        "",
      phone:
        cart?.billing_address?.phone || customerBillingAddress?.phone || "",
    },
    email: cart?.email || customer?.email || "",
  };
};
