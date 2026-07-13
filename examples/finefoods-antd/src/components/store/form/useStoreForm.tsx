import { useEffect, useState } from "react";
import { type UseFormProps, useForm } from "@refinedev/antd";
import { useDebounceValue } from "usehooks-ts";
import {
  convertLatLng,
  type LatLng,
  getAddressWithLatLng,
  getLatLngWithAddress,
} from "../../../utils";
import type { IStore } from "../../../interfaces";

type Props = {
  action: UseFormProps["action"];
};

export const useStoreForm = (props: Props) => {
  const [isFormDisabled, setIsFormDisabled] = useState(
    () => props.action === "edit",
  );

  const form = useForm<IStore>({
    action: props.action,
    redirect: false,
    onMutationSuccess: () => {
      setIsFormDisabled(true);
    },
  });
  const store = form.query?.data?.data;

  const [latLng, setLatLng] = useState<Partial<LatLng>>({
    lat: props.action === "create" ? 39.66853 : undefined,
    lng: props.action === "create" ? -75.67602 : undefined,
  });

  useEffect(() => {
    if (store?.address?.coordinate) {
      setLatLng({
        lat: store.address.coordinate?.[0],
        lng: store.address.coordinate?.[1],
      });
    }
  }, [store?.address.coordinate?.[0], store?.address.coordinate?.[1]]);

  // we are using these debounced values to get lang and lat from the address text
  // to minimize the number of requests, we are using debounced values
  const [debouncedAdressValue, setDebouncedAdressValue] = useDebounceValue(
    form.formProps.form?.getFieldValue(["address", "text"]),
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

          form.formProps.form?.setFieldValue(
            ["address", "coordinate"],
            [lat, lng],
          );

          setLatLng({
            lat,
            lng,
          });
        }
      });
    }
  }, [debouncedAdressValue, form.formProps.form?.setFieldValue]);

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
      form.formProps.form?.setFieldValue(["address", "text"], data.address);
    }
  };

  const handleSetIsFormDisabled = (value: boolean) => {
    form.formProps.form?.resetFields();
    setIsFormDisabled(value);
  };

  const isLoading = form.query?.isFetching || form.formLoading;

  return {
    ...form,
    store,
    formLoading: isLoading,
    latLng,
    isFormDisabled,
    setIsFormDisabled: handleSetIsFormDisabled,
    handleAddressChange: (address: string) => setDebouncedAdressValue(address),
    handleMapOnDragEnd,
  };
};
