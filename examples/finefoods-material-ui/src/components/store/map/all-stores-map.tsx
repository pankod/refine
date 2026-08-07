import { useList, useNavigation, useTranslate } from "@refinedev/core";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { GoogleMap, AdvancedMarker } from "../../map";
import { StoreStatus } from "../status";
import type { IStore } from "../../../interfaces";

export const AllStoresMap = () => {
  const t = useTranslate();
  const parentRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [selectedStore, setSelectedStore] = useState<IStore | null>(null);
  const { edit } = useNavigation();

  const { result: storeData } = useList<IStore>({
    resource: "stores",
    pagination: {
      mode: "off",
    },
  });
  const stores = storeData?.data || [];

  const handleMarkerClick = (store: IStore) => {
    setSelectedStore(store);
  };

  return (
    <Box
      ref={parentRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <GoogleMap
        mapProps={{
          setMap,
          mapId: "all-stores-map",
          disableDefaultUI: true,
          center: {
            lat: 40.73061,
            lng: -73.935242,
          },
          zoom: 10,
        }}
      >
        {stores?.map((store) => {
          const lat = Number(store.address?.coordinate?.[0]);
          const lng = Number(store.address?.coordinate?.[1]);

          if (!lat || !lng) return null;

          return (
            <AdvancedMarker
              key={store.id}
              map={map}
              zIndex={selectedStore?.id === store.id ? 1 : 0}
              position={{
                lat,
                lng,
              }}
              onClick={() => {
                handleMarkerClick(store);
              }}
            >
              {(selectedStore?.id !== store.id || !selectedStore) && (
                <img src="/images/marker-store.svg" alt={store.title} />
              )}
              {selectedStore?.id === store.id && (
                <Card
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStore(null);
                  }}
                  sx={{
                    padding: "16px",
                    position: "relative",
                    marginBottom: "16px",
                  }}
                >
                  <Box
                    onClick={() => {
                      edit("stores", selectedStore.id);
                    }}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">{store.title}</Typography>
                    <StoreStatus
                      value={store.isActive}
                      label={
                        store.isActive
                          ? t("stores.fields.isActive.true")
                          : t("stores.fields.isActive.false")
                      }
                    />
                  </Box>
                  <Box mt="16px" color="text.secondary">
                    <Divider />
                    <Stack direction="row" alignItems="center" gap="8px">
                      <PlaceOutlinedIcon />
                      <Typography py="8px">{store.address?.text}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" gap="8px">
                      <AccountCircleOutlinedIcon />
                      <Typography py="8px">{store.email}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" gap="8px">
                      <LocalPhoneOutlinedIcon />
                      <Typography py="8px">{store.gsm}</Typography>
                    </Stack>
                  </Box>
                </Card>
              )}
            </AdvancedMarker>
          );
        })}
      </GoogleMap>
    </Box>
  );
};
