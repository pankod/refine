import { useState } from "react";
import { useNavigation, useTranslate } from "@refinedev/core";
import { DeleteButton, ListButton } from "@refinedev/mui";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  StoreCourierTable,
  StoreForm,
  StoreMap,
  useStoreForm,
  StoreInfoCard,
} from "../../components";
import { Button, Stack } from "@mui/material";

export const StoreEdit = () => {
  const { list } = useNavigation();
  const [isFormIsDisabled, setIsFormIsDisabled] = useState(true);

  const t = useTranslate();
  const form = useStoreForm({
    action: "edit",
    onMutationSuccess: () => {
      setIsFormIsDisabled(true);
    },
  });

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
      {isFormIsDisabled && (
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          {form.store?.title ?? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "24px", width: "120px" }}
            />
          )}
        </Typography>
      )}
      <Grid container spacing="24px">
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 5,
          }}
        >
          {isFormIsDisabled ? (
            <Box>
              <StoreInfoCard store={form?.store} />
              <Stack
                mt="24px"
                px="16px"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <DeleteButton
                  variant="text"
                  onSuccess={() => {
                    list("stores");
                  }}
                  sx={{
                    opacity: 0.5,
                  }}
                />
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<EditOutlinedIcon />}
                  sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderColor: (theme) => theme.palette.grey[500],
                  }}
                  onClick={() => {
                    setIsFormIsDisabled(false);
                  }}
                >
                  {t("buttons.edit")}
                </Button>
              </Stack>
            </Box>
          ) : (
            <StoreForm
              action="edit"
              form={form}
              onCancel={() => {
                setIsFormIsDisabled(true);
              }}
            />
          )}
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 7,
          }}
        >
          <Box height="432px">
            <StoreMap
              lat={form.latLng.lat}
              lng={form.latLng.lng}
              store={form.store}
              onDragEnd={form.handleMapOnDragEnd}
              isDisabled={isFormIsDisabled}
            />
          </Box>
          <Box mt="24px">
            <Paper>
              <StoreCourierTable store={form.store} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
