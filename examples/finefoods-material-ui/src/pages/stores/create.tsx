import { useNavigation } from "@refinedev/core";
import { ListButton } from "@refinedev/mui";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import { StoreForm, StoreMap, useStoreForm } from "../../components";

export const StoreCreate = () => {
  const { list } = useNavigation();
  const form = useStoreForm({ action: "create" });

  return (
    <>
      <ListButton
        variant="outlined"
        sx={{
          borderColor: "GrayText",
          color: "GrayText",
          backgroundColor: "transparent",
        }}
        startIcon={<ArrowBack />}
      />
      <Divider
        sx={{
          marginBottom: "24px",
          marginTop: "24px",
        }}
      />
      <Grid container spacing="24px">
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 5,
          }}
        >
          <StoreForm
            action="create"
            form={form}
            onCancel={() => {
              list("stores");
            }}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 7,
          }}
        >
          <StoreMap
            lat={form.latLng.lat}
            lng={form.latLng.lng}
            store={form.store}
            onDragEnd={form.handleMapOnDragEnd}
          />
        </Grid>
      </Grid>
    </>
  );
};
