import React from "react";
import { useGetIdentity } from "@refinedev/core";

import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import type { RefineThemedLayoutHeaderProps } from "../types";

import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky,
}) => {
  const { data: user } = useGetIdentity();

  const prefferedSticky = sticky ?? true;

  return (
    <AppBar position={prefferedSticky ? "sticky" : "relative"}>
      <Toolbar>
        <HamburgerMenu />
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            {user?.name && (
              <Typography variant="subtitle2" data-testid="header-user-name">
                {user?.name}
              </Typography>
            )}
            {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
