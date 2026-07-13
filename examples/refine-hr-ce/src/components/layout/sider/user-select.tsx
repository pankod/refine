import { useGetIdentity, useList, useLogin, useLogout } from "@refinedev/core";
import { useLocation } from "react-router";
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { queryClient } from "@/providers/query-client";
import { Role, type Employee } from "@/types";
import { LogoutIcon } from "@/icons";
import { red } from "@/providers/theme-provider/colors";

export const UserSelect = () => {
  const { pathname } = useLocation();

  const { mutate: logout } = useLogout();
  const { mutateAsync: login } = useLogin();

  const { data: currentEmployee, isLoading: currentEmployeeIsLoading } =
    useGetIdentity<Employee>();

  const {
    result: dataManager,
    query: { isLoading: managerIsLoading },
  } = useList<Employee>({
    resource: "employees",
    filters: [
      {
        field: "role",
        operator: "eq",
        value: Role.MANAGER,
      },
    ],
    pagination: {
      pageSize: 3,
    },
    queryOptions: {
      enabled: !!currentEmployee?.id,
      select: (data) => {
        if (currentEmployee?.role !== Role.MANAGER) {
          return data;
        }

        // data with current employee added to the list
        const alreadyAdded = data.data.find(
          (employee) => employee.id === currentEmployee?.id,
        );
        if (!alreadyAdded) {
          data.data.unshift(currentEmployee);
        }

        return data;
      },
    },
  });
  const managers = dataManager?.data || [];

  const {
    result: dataEmployee,
    query: { isLoading: employeesIsLoading },
  } = useList<Employee>({
    resource: "employees",
    filters: [
      {
        field: "role",
        operator: "eq",
        value: Role.EMPLOYEE,
      },
    ],
    pagination: {
      pageSize: 3,
    },
    queryOptions: {
      enabled: !!currentEmployee?.id,
      select: (data) => {
        if (currentEmployee?.role !== Role.EMPLOYEE) {
          return data;
        }

        // data with current employee added to the list
        const alreadyAdded = data.data.find(
          (employee) => employee.id === currentEmployee?.id,
        );
        if (!alreadyAdded) {
          data.data.unshift(currentEmployee);
        }

        return data;
      },
    },
  });
  const employees = dataEmployee?.data || [];

  const handleChange = async (props: Employee) => {
    await login({
      email: props.email,
      redirectTo: pathname,
    });
    queryClient.resetQueries();
  };

  const selected = currentEmployee?.id || null;
  const loading =
    currentEmployeeIsLoading ||
    managerIsLoading ||
    employeesIsLoading ||
    !selected;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        paddingY: "24px",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            height: "32px",
          }}
        >
          <Skeleton
            variant="circular"
            width="32px"
            height="32px"
            sx={{
              flexShrink: 0,
            }}
          />
          <Skeleton variant="rectangular" width="100%" height="20px" />
        </Box>
      ) : (
        <Select
          fullWidth
          type="text"
          sx={{
            height: "32px",

            "& > fieldset": {
              display: "none",
            },

            "& .MuiSelect-select": {
              height: "32px",
              padding: 0,
            },
          }}
          MenuProps={{
            sx: {
              "& .MuiList-root": {
                paddingBottom: "0px",
              },

              "& .MuiPaper-root": {
                top: "162px !important",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "12px",
                boxShadow: "none",
              },
            },
          }}
          renderValue={() => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Avatar
                  src={currentEmployee?.avatarUrl}
                  alt={`${currentEmployee?.firstName} ${currentEmployee?.lastName}`}
                  sx={{ width: 32, height: 32 }}
                />
                <Typography noWrap variant="body2">
                  {`${currentEmployee?.firstName} ${currentEmployee?.lastName}`}
                </Typography>
              </Box>
            );
          }}
          value={selected}
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
          {managers.map((manager) => (
            <MenuItem
              key={manager.id}
              value={manager.id}
              sx={{
                "&.MuiMenuItem-root": {
                  padding: "8px 12px",
                },
              }}
              onClick={() => {
                handleChange(manager);
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar
                  src={manager.avatarUrl}
                  alt={`${manager.firstName} ${manager.lastName}`}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography
                  noWrap
                  variant="caption"
                  lineHeight="16px"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {`${manager.firstName} ${manager.lastName}`}
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
          {employees.map((employee) => (
            <MenuItem
              key={employee.id}
              value={employee.id}
              onClick={() => {
                handleChange(employee);
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar
                  src={employee.avatarUrl}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography
                  noWrap
                  variant="caption"
                  lineHeight="16px"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {`${employee.firstName} ${employee.lastName}`}
                </Typography>
              </Box>
            </MenuItem>
          ))}

          <Divider
            sx={{
              marginBottom: "0px !important",
            }}
          />

          <Button
            color="inherit"
            variant="text"
            onClick={() => {
              logout();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "16px",
              height: "48px",
              gap: "12px",
              cursor: "pointer",
              width: "100%",
              borderRadius: "0px",
              color: red[700],
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.grey[50],
              },
            }}
          >
            <Box
              sx={{
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: red[50],
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: red[50],
                },
              }}
            >
              <LogoutIcon />
            </Box>
            <Typography variant="caption" lineHeight="16px">
              Log out
            </Typography>
          </Button>
        </Select>
      )}
    </Box>
  );
};
