import { useForm } from "@refinedev/react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import {
  convertLatLng,
  type LatLng,
  getAddressWithLatLng,
  getLatLngWithAddress,
} from "../../../utils";
import type { IStore } from "../../../interfaces";
import { useEffect, useState } from "react";
import type { HttpError } from "@refinedev/core";

type Props = {
  action: "create" | "edit";
  onMutationSuccess?: () => void;
};

export const useStoreForm = (props: Props) => {
  const form = useForm<IStore, HttpError, IStore>({
    defaultValues: {
      title: "",
      isActive: true,
      address: {
        text: "",
        coordinate: [],
      },
      products: [],
      email: "",
      createdAt: "",
      gsm: "",
    },
    refineCoreProps: {
      action: props.action,
      redirect: props.action === "create" ? "list" : false,
      onMutationSuccess: () => {
        props.onMutationSuccess?.();
      },
    },
  });
  const store = form.refineCore.query?.data?.data;

  const [latLng, setLatLng] = useState<Partial<LatLng>>({
    lat: props.action === "create" ? 39.66853 : undefined,
    lng: props.action === "create" ? -75.67602 : undefined,
  });

  useEffect(() => {
    if (store?.address?.coordinate) {
      setLatLng({
        lat: Number(store.address.coordinate?.[0]),
        lng: Number(store.address.coordinate?.[1]),
      });
    }
  }, [store?.address.coordinate?.[0], store?.address.coordinate?.[1]]);

  // we are using these debounced values to get lang and lat from the address text
  // to minimize the number of requests, we are using debounced values
  const [debouncedAdressValue, setDebouncedAdressValue] = useDebounceValue(
    form?.getValues("address.text"),
    500,
  );
  // get lat and lng with address
  useEffect(() => {
    if (debouncedAdressValue) {
      getLatLngWithAddress(debouncedAdressValue).then((data) => {
        // set form field with lat and lng values
        if (data) {
          const { lat, lng } = convertLatLng({
            lat: data.lat,
            lng: data.lng,
          });

          form.setValue("address.coordinate", [lat, lng]);

          setLatLng({
            lat,
            lng,
          });
        }
      });
    }
  }, [debouncedAdressValue, form.setValue]);

  const handleMapOnDragEnd = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    // get address with lat lng and set form field
    const data = await getAddressWithLatLng({ lat, lng });
    if (data) {
      // set form field with address value
      form.setValue("address.text", data.address);
    }
  };

  const isLoading =
    form.refineCore?.query?.isFetching || form.refineCore.formLoading;

  return {
    ...form,
    store,
    formLoading: isLoading,
    latLng,
    handleAddressChange: (address: string) => setDebouncedAdressValue(address),
    handleMapOnDragEnd,
  };
};
