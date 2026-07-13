import type { ReactNode } from "react";
import { useMenu, CanAccess, useList } from "@refinedev/core";
import { Link } from "react-router";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { TimeOffStatus } from "@/types";

export const Menu = () => {
  const { menuItems, selectedKey } = useMenu();

  return (
    <nav aria-label="resource list">
      <List
        sx={{
          paddingY: "24px",
        }}
      >
        {menuItems.map((item, i) => {
          return (
            <CanAccess
              key={item.key}
              action="list"
              resource={item.identifier || item.name.toLowerCase()}
            >
              {item.children.map((child) => {
                if (child.meta?.hide) return null;

                if (!child?.route) return null;
                const isSelected =
                  selectedKey === child.key || selectedKey.includes(child.key);

                const Component = {
                  requests: RequestMenuItem,
                } as Record<string, React.FC<MenuItemProps>>;
                const Item =
                  Component[child.identifier ?? child.name] ?? MenuItem;

                return (
                  <Item
                    key={child.key}
                    isSelected={isSelected}
                    icon={child.meta?.icon}
                    route={child.route}
                    label={child.label}
                  />
                );
              })}
            </CanAccess>
          );
        })}
      </List>
    </nav>
  );
};

type MenuItemProps = {
  isSelected: boolean;
  icon: ReactNode;
  route: string;
  label: string | undefined;
  rightSlot?: ReactNode;
};

const MenuItem = ({
  isSelected,
  icon,
  route,
  label,
  rightSlot,
}: MenuItemProps) => {
  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "12px",
        bgcolor: isSelected ? "primary.50" : "transparent",

        "& .MuiListItemButton-root": {
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingLeft: "12px",
          paddingRight: "8px",
          height: "40px",
          borderRadius: "12px",
        },

        "& .Mui-selected": {
          bgcolor: "unset",
        },

        "&:not(:last-child)": {
          marginBottom: "8px",
        },
      }}
    >
      <ListItemButton component={Link} to={route} selected={isSelected}>
        <ListItemIcon
          sx={{
            minWidth: "24px",
            color: isSelected ? "primary.main" : "text.secondary",
            strokeWidth: isSelected ? "1.5px" : "1px",
            "& svg > g": { strokeWidth: isSelected ? "1.5px" : "1px" },
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            noWrap: true,
            color: isSelected ? "primary.700" : "text.primary",
            fontWeight: isSelected ? 600 : 400,
            fontSize: "14px",
            lineHeight: "24px",
          }}
        />
        {rightSlot}
      </ListItemButton>
    </ListItem>
  );
};

const RequestMenuItem = (props: MenuItemProps) => {
  const { result: timeOffsData } = useList({
    resource: "time-offs",
    pagination: {
      // we need only the count of pending time-offs to show in the badge
      // so we can set the pageSize to 1 to reduce the data payload
      pageSize: 1,
    },
    filters: [
      { field: "status", operator: "eq", value: TimeOffStatus.PENDING },
    ],
  });

  const totalCount = timeOffsData?.total ?? 0;
  const hasCount = totalCount > 0;

  return (
    <MenuItem
      {...props}
      rightSlot={
        hasCount && (
          <Box
            sx={{
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: (theme) => theme.palette.grey[100],
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "12px",
                lineHeight: "16px",
              }}
            >
              {totalCount}
            </Typography>
          </Box>
        )
      }
    />
  );
};
