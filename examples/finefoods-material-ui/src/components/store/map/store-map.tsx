import { useCallback } from "react";
import _debounce from "lodash/debounce";
import Box from "@mui/material/Box";
import { GoogleMap, MapMarker } from "../../map";
import type { IStore } from "../../../interfaces";
import { convertLatLng } from "../../../utils";

type Props = {
  store?: IStore;
  lat?: number;
  lng?: number;
  zoom?: number;
  isDisabled?: boolean;
  onDragEnd?: ({ lat, lng }: { lat: number; lng: number }) => void;
};

export const StoreMap = (props: Props) => {
  const onDragEndDebounced = useCallback(
    _debounce((lat, lng) => {
      if (props.onDragEnd) {
        props.onDragEnd({ lat, lng });
      }
    }, 1000),
    [],
  );

  const handleDragEnd = (e: google.maps.FeatureMouseEvent) => {
    if (!props.onDragEnd) return;

    const googleLat = e.latLng?.lat();
    const googleLng = e.latLng?.lng();
    if (!googleLat || !googleLng) return;

    const { lat, lng } = convertLatLng({
      lat: googleLat,
      lng: googleLng,
    });

    onDragEndDebounced.cancel();
    onDragEndDebounced(lat, lng);
  };

  const lat = Number(props.lat);
  const lng = Number(props.lng);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <GoogleMap
        mapProps={{
          mapId: "store-map",
          center: {
            lat: lat || 39.6685458,
            lng: lng || -75.6760264,
          },
        }}
      >
        {lat && lng && (
          <MapMarker
            key={props?.store?.id}
            icon={{
              url: props.isDisabled
                ? "/images/marker-store.svg"
                : "/images/marker-store-pick.svg",
            }}
            position={{
              lat,
              lng,
            }}
            onDragEnd={props.isDisabled ? undefined : handleDragEnd}
          />
        )}
      </GoogleMap>
    </Box>
  );
};
