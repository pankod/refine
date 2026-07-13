import React, { useEffect, useState, type PropsWithChildren } from "react";
import type { Region, StoreCartsRes, Cart } from "@medusajs/medusa";
import {
  useCreate,
  useDelete,
  useUpdate,
  useInvalidate,
  useOne,
} from "@refinedev/core";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import { CART_COOKIE_KEY, REGION_COOKIE_KEY } from "src/contants";

interface VariantInfoProps {
  variantId: string;
  quantity: number;
}

interface LineInfoProps {
  lineId: string;
  quantity: number;
}

interface CartContext {
  countryCode: string | undefined;
  setRegion: (regionId: string, countryCode: string) => void;
  addItem: (item: VariantInfoProps) => Promise<void>;
  updateItem: (item: LineInfoProps) => void;
  deleteItem: (lineId: string) => void;
  resetCart: () => void;
  cartId: string | undefined;
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined;
  cartIsFetching: boolean;
}

const CartContext = React.createContext<CartContext | null>(null);

export const useCartContext = (): CartContext => {
  const context = React.useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const IS_SERVER = typeof window === "undefined";

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { mutateAsync: createMutateAsync, mutate: createMutate } =
    useCreate<StoreCartsRes>();
  const { mutateAsync: updateMutateAsync, mutate: updateMutate } =
    useUpdate<StoreCartsRes>();
  const { mutate: deleteMutate } = useDelete<StoreCartsRes>();

  const [countryCode, setCountryCode] = useState<string | undefined>(undefined);

  const getCart = () => {
    if (!IS_SERVER) {
      const cookies = parseCookies();
      return cookies[CART_COOKIE_KEY];
    }
    return null;
  };

  const [cartId, setCartId] = useState<string | undefined>(
    getCart() || undefined,
  );

  const {
    result: {
      data: { cart = undefined } = {},
    } = {},
    isFetching: cartIsFetching,
  } = useOne<StoreCartsRes>({
    resource: "carts",
    // eslint-disable-next-line
    id: cartId!,
    queryOptions: {
      enabled: !!cartId,
    },
  });

  const invalidate = useInvalidate();

  const storeRegion = (regionId: string, countryCode: string) => {
    if (!IS_SERVER) {
      setCookie(
        null,
        REGION_COOKIE_KEY,
        JSON.stringify({ regionId, countryCode }),
      );

      setCountryCode(countryCode);
    }
  };

  useEffect(() => {
    if (!IS_SERVER) {
      const cookies = parseCookies();
      const storedRegion = cookies[REGION_COOKIE_KEY];

      if (storedRegion) {
        const { countryCode } = JSON.parse(storedRegion);
        setCountryCode(countryCode);
      }
    }
  }, []);

  const getRegion = () => {
    if (!IS_SERVER) {
      const cookies = parseCookies();
      const region = cookies[REGION_COOKIE_KEY];

      if (region) {
        return JSON.parse(region) as {
          regionId: string;
          countryCode: string;
        };
      }
    }
    return null;
  };

  const setRegion = async (regionId: string, countryCode: string) => {
    await updateMutateAsync(
      {
        resource: "carts",
        id: cartId || "",
        values: {
          region_id: regionId,
        },
      },
      {
        onSuccess: ({ data: { cart } }) => {
          //TODO: make sure to update the cart in the store with the new region
          storeCart(cart.id);
          storeRegion(regionId, countryCode);
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error);
          }
        },
      },
    );
  };

  const ensureRegion = (region: Region) => {
    if (!IS_SERVER) {
      const { regionId, countryCode } = getRegion() || {
        regionId: region.id,
        countryCode: region.countries[0].iso_2,
      };

      if (regionId !== region.id) {
        setRegion(region.id, countryCode);
      }

      storeRegion(region.id, countryCode);
      setCountryCode(countryCode);
    }
  };

  const storeCart = (id: string) => {
    if (!IS_SERVER) {
      setCookie(null, CART_COOKIE_KEY, id, {
        path: "/",
      });
    }
  };

  const deleteCart = () => {
    if (!IS_SERVER) {
      destroyCookie(null, CART_COOKIE_KEY, {
        path: "/",
      });
    }
  };

  const createNewCart = async (regionId?: string) => {
    await createMutateAsync(
      {
        resource: "carts",
        values: {
          region_id: regionId,
        },
      },
      {
        onSuccess: ({ data: { cart } }) => {
          setCartId(cart.id);
          storeCart(cart.id);
          ensureRegion(cart.region);
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error);
          }
        },
      },
    );
  };

  const resetCart = () => {
    deleteCart();

    const savedRegion = getRegion();

    createMutate(
      {
        resource: "carts",
        values: {
          region_id: savedRegion?.regionId,
        },
      },
      {
        onSuccess: ({ data: { cart } }) => {
          setCartId(cart.id);
          storeCart(cart.id);
          ensureRegion(cart.region);
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error);
          }
        },
      },
    );
  };

  useEffect(() => {
    const ensureCart = async () => {
      const retrievedCartId = getCart();
      const region = getRegion();

      if (retrievedCartId) {
        if (!cart || cart.completed_at) {
          deleteCart();
          await createNewCart(region?.regionId);
          return;
        }
        // must be sure that cart resource would validated
        ensureRegion(cart.region);
      } else {
        await createNewCart(region?.regionId);
      }
    };

    if (!IS_SERVER && !cartId) {
      ensureCart();
    }
  }, []);

  const addItem = async ({
    variantId,
    quantity,
  }: {
    variantId: string;
    quantity: number;
  }) => {
    await createMutateAsync(
      {
        resource: `carts/${cartId}/line-items`,
        values: {
          variant_id: variantId,
          quantity: quantity,
        },
      },
      {
        onSuccess: ({ data: { cart } }) => {
          invalidate({
            resource: "carts",
            id: cartId,
            invalidates: ["all"],
          });
          // TODO: make sure to update the cart in the store with the new line item
          storeCart(cart.id);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const deleteItem = (lineId: string) => {
    deleteMutate(
      {
        resource: `carts/${cartId}/line-items`,
        id: lineId,
        invalidates: ["detail"],
      },
      {
        onSuccess: ({ data: { cart } }) => {
          storeCart(cart.id);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string;
    quantity: number;
  }) => {
    updateMutate(
      {
        resource: `carts/${cartId}/line-items`,
        id: lineId,
        values: {
          quantity: quantity,
        },
        invalidates: ["detail"],
      },
      {
        onSuccess: ({ data: { cart } }) => {
          // make sure that cart resource would validated when updated with new quantity
          storeCart(cart.id);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <CartContext.Provider
      value={{
        countryCode,
        setRegion,
        addItem,
        deleteItem,
        updateItem,
        resetCart,
        cartId,
        cart,
        cartIsFetching,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
