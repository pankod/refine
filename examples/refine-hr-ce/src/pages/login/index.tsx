import { useState } from "react";
import { useLogin } from "@refinedev/core";
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { HrLogo } from "@/icons";

export const PageLogin = () => {
  const [selectedEmail, setSelectedEmail] = useState<string>(
    mockUsers.managers[0].email,
  );

  const { mutate: login } = useLogin();

  return (
    <Box
      sx={{
        position: "relative",
        background:
          "linear-gradient(180deg, #7DE8CD 0%, #C6ECD9 24.5%, #5CD6D6 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <Box
        sx={{
          zIndex: 2,
          background: "white",
          width: "328px",
          padding: "24px",
          borderRadius: "36px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <HrLogo />
          <Typography variant="body1" fontWeight={600}>
            Welcome to RefineHR
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography variant="caption" color="text.secondary">
            Select user
          </Typography>
          <Select
            size="small"
            value={selectedEmail}
            sx={{
              height: "40px",
              borderRadius: "12px",

              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px !important",
                borderColor: (theme) => `${theme.palette.divider} !important`,
              },
            }}
            MenuProps={{
              sx: {
                "& .MuiList-root": {
                  paddingBottom: "0px",
                },

                "& .MuiPaper-root": {
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: "12px",
                  boxShadow: "none",
                },
              },
            }}
          >
            <Typography
              variant="caption"
              textTransform="uppercase"
              color="text.secondary"
              sx={{
                paddingLeft: "12px",
                paddingBottom: "8px",
                display: "block",
              }}
            >
              Managers
            </Typography>
            {mockUsers.managers.map((user) => (
              <MenuItem
                key={user.email}
                value={user.email}
                onClick={() => setSelectedEmail(user.email)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Avatar
                    src={user.avatarUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{ width: "24px", height: "24px" }}
                  />
                  <Typography
                    noWrap
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </Typography>
                </Box>
              </MenuItem>
            ))}

            <Divider />

            <Typography
              variant="caption"
              textTransform="uppercase"
              color="text.secondary"
              sx={{
                paddingLeft: "12px",
                paddingBottom: "8px",
                display: "block",
              }}
            >
              Employees
            </Typography>
            {mockUsers.employees.map((user) => (
              <MenuItem
                key={user.email}
                value={user.email}
                onClick={() => setSelectedEmail(user.email)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Avatar
                    src={user.avatarUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{ width: "24px", height: "24px" }}
                  />
                  <Typography
                    noWrap
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Button
          variant="contained"
          sx={{
            borderRadius: "12px",
            height: "40px",
            width: "100%",
            color: "white",
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
          onClick={() => {
            login({ email: selectedEmail });
          }}
        >
          Sign in
        </Button>
      </Box>

      <Box
        sx={{
          zIndex: 1,
          width: {
            xs: "240px",
            sm: "370px",
            md: "556px",
          },
          height: {
            xs: "352px",
            sm: "554px",
            md: "816px",
          },
          position: "absolute",
          left: "0px",
          bottom: "0px",
        }}
      >
        <img
          src="/images/login-left.png"
          alt="flowers"
          width="100%"
          height="100%"
        />
      </Box>
      <Box
        sx={{
          zIndex: 1,
          width: {
            xs: "320px",
            sm: "480px",
            md: "596px",
          },
          height: {
            xs: "312px",
            sm: "472px",
            md: "584px",
          },
          position: "absolute",
          right: "0px",
          top: "0px",
        }}
      >
        <img
          src="/images/login-right.png"
          alt="flowers"
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};

const mockUsers = {
  managers: [
    {
      email: "michael.scott@dundermifflin.com",
      firstName: "Michael",
      lastName: "Scott",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Michael-Scott.png",
    },
    {
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Jim-Halpert.png",
      firstName: "Jim",
      lastName: "Halpert",
      email: "jim.halpert@dundermifflin.com",
    },
    {
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Toby-Flenderson.png",
      firstName: "Toby",
      lastName: "Flenderson",
      email: "toby.flenderson@dundermifflin.com",
    },
  ],
  employees: [
    {
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Pam-Beesly.png",
      firstName: "Pam",
      lastName: "Beesly",
      email: "pam.beesly@dundermifflin.com",
    },
    {
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Andy-Bernard.png",
      firstName: "Andy",
      lastName: "Bernard",
      email: "andy.bernard@dundermifflin.com",
    },
    {
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Ryan-Howard.png",
      firstName: "Ryan",
      lastName: "Howard",
      email: "ryan.howard@dundermifflin.com",
    },
  ],
};
