import React from "react";
import { useResourceParams } from "@refinedev/core";
import { ListButton } from "@refinedev/mui";
import { Box, Divider, Typography } from "@mui/material";
import { ChevronLeftRectangleIcon } from "@/icons";

type Props = {
  title?: React.ReactNode;
  showListButton?: boolean;
  showDivider?: boolean;
  rightSlot?: React.ReactNode;
};

export const PageHeader = ({
  title,
  rightSlot,
  showListButton,
  showDivider,
}: Props) => {
  const { resource } = useResourceParams();

  const prefferedTitle = title || resource?.meta?.label || "";

  return (
    <>
      <Box>
        {showListButton && (
          <ListButton
            accessControl={{ hideIfUnauthorized: false }}
            size="large"
            variant="outlined"
            startIcon={<ChevronLeftRectangleIcon />}
            sx={{
              borderColor: (theme) => theme.palette.grey[200],
              color: (theme) => theme.palette.grey[500],
              marginBottom: "40px",
            }}
          >
            {resource?.meta?.label}
          </ListButton>
        )}
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            minHeight: "40px",
            marginBottom: "24px",
            gap: "16px",
            [theme.breakpoints.down("sm")]: {
              columnGap: "64px",
            },
          })}
        >
          <Typography
            variant="h2"
            fontSize="18px"
            lineHeight="32px"
            fontWeight="600"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                flex: 1,
              },
            })}
          >
            {prefferedTitle}
          </Typography>
          {rightSlot}
        </Box>
      </Box>

      {showDivider && <Divider />}
    </>
  );
};
