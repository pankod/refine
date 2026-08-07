import React, { useCallback, type CSSProperties } from "react";
import {
  CanAccess,
  useIsExistAuthentication,
  useLink,
  useLogout,
  useMenu,
  useActiveAuthProvider,
  useRefineContext,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";
import {
  Box,
  Drawer,
  Navbar,
  NavLink,
  type NavLinkStylesNames,
  type NavLinkStylesParams,
  ScrollArea,
  MediaQuery,
  Tooltip,
  type TooltipProps,
  type Styles,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { IconList, IconPower, IconDashboard } from "@tabler/icons-react";

import { ThemedTitle as DefaultTitle } from "@components";
import { useThemedLayoutContext } from "@hooks";

import type { RefineThemedLayoutSiderProps } from "../types";

const defaultNavIcon = <IconList size={20} />;

export const ThemedSider: React.FC<RefineThemedLayoutSiderProps> = ({
  render,
  meta,
  Title: TitleFromProps,
  activeItemDisabled = false,
  siderItemsAreCollapsed = true,
}) => {
  const theme = useMantineTheme();
  const { siderCollapsed, mobileSiderOpen, setMobileSiderOpen } =
    useThemedLayoutContext();

  const Link = useLink();

  const { defaultOpenKeys, menuItems, selectedKey } = useMenu({ meta });
  const isExistAuthentication = useIsExistAuthentication();
  const t = useTranslate();
  const authProvider = useActiveAuthProvider();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout();

  const RenderToTitle = TitleFromProps ?? DefaultTitle;

  const drawerWidth = () => {
    if (siderCollapsed) return 80;
    return 200;
  };

  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2];

  const commonNavLinkStyles: Styles<NavLinkStylesNames, NavLinkStylesParams> = {
    root: {
      display: "flex",
      marginTop: "12px",
      justifyContent:
        siderCollapsed && !mobileSiderOpen ? "center" : "flex-start",
    },
    icon: {
      marginRight: siderCollapsed && !mobileSiderOpen ? 0 : 12,
    },
    body: {
      display: siderCollapsed && !mobileSiderOpen ? "none" : "flex",
    },
  };

  const commonTooltipProps: Partial<TooltipProps> = {
    disabled: !siderCollapsed || mobileSiderOpen,
    position: "right",
    withinPortal: true,
    withArrow: true,
    arrowSize: 8,
    arrowOffset: 12,
    offset: 4,
  };

  const getDefaultExpandMenuItemsCB = (key?: string) => {
    const defaultOpened = defaultOpenKeys.includes(key || "");

    if (siderItemsAreCollapsed) return defaultOpened;

    return true;
  };
  const getDefaultExpandMenuItems = useCallback(
    getDefaultExpandMenuItemsCB,
    [],
  );

  const renderTreeView = (tree: any[], selectedKey?: string) => {
    return tree.map((item) => {
      const { icon, label, route, name, children } = item;

      const isSelected = item.key === selectedKey;
      const isParent = children.length > 0;

      const additionalLinkProps = isParent
        ? {}
        : { component: Link as any, to: route };

      const disablePointerStyle: CSSProperties =
        activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};

      const defaultExpandMenuItems = getDefaultExpandMenuItems(item.key);

      return (
        <CanAccess
          key={item.key}
          resource={name}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Tooltip label={label} {...commonTooltipProps}>
            <NavLink
              key={item.key}
              label={siderCollapsed && !mobileSiderOpen ? null : label}
              icon={icon ?? defaultNavIcon}
              active={isSelected}
              childrenOffset={siderCollapsed && !mobileSiderOpen ? 0 : 12}
              defaultOpened={defaultExpandMenuItems}
              pl={siderCollapsed || mobileSiderOpen ? "12px" : "18px"}
              styles={commonNavLinkStyles}
              style={disablePointerStyle}
              {...additionalLinkProps}
            >
              {isParent && renderTreeView(children, selectedKey)}
            </NavLink>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const items = renderTreeView(menuItems, selectedKey);

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes.",
        ),
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <NavLink
        key="logout"
        label={
          siderCollapsed && !mobileSiderOpen
            ? null
            : t("buttons.logout", "Logout")
        }
        icon={<IconPower size={20} />}
        pl={siderCollapsed || mobileSiderOpen ? "12px" : "18px"}
        onClick={handleLogout}
        styles={commonNavLinkStyles}
      />
    </Tooltip>
  );

  const renderSider = () => {
    if (render) {
      return render({
        logout,
        items,
        collapsed: siderCollapsed,
      });
    }
    return (
      <>
        {items}
        {logout}
      </>
    );
  };

  return (
    <>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Drawer
          opened={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          size={200}
          zIndex={1200}
          withCloseButton={false}
          styles={{
            drawer: {
              overflow: "hidden",
            },
          }}
        >
          <Navbar.Section
            pl={8}
            sx={{
              height: "64px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <RenderToTitle collapsed={false} />
          </Navbar.Section>
          <Navbar.Section component={ScrollArea} grow mx="-xs" px="xs">
            {renderSider()}
          </Navbar.Section>
        </Drawer>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Box
          sx={{
            width: drawerWidth(),
            transition: "width 200ms ease, min-width 200ms ease",
            flexShrink: 0,
          }}
        />
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Navbar
          width={{ base: drawerWidth() }}
          sx={{
            overflow: "hidden",
            transition: "width 200ms ease, min-width 200ms ease",
            position: "fixed",
            top: 0,
            height: "100vh",
            borderRight: 0,
            zIndex: 199,
          }}
        >
          <Flex
            h="64px"
            pl={siderCollapsed ? 0 : "16px"}
            align="center"
            justify={siderCollapsed ? "center" : "flex-start"}
            sx={{
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <RenderToTitle collapsed={siderCollapsed} />
          </Flex>
          <Navbar.Section
            grow
            component={ScrollArea}
            mx="-xs"
            px="xs"
            sx={{
              ".mantine-ScrollArea-viewport": {
                borderRight: `1px solid ${borderColor}`,
                borderBottom: `1px solid ${borderColor}`,
              },
            }}
          >
            {renderSider()}
          </Navbar.Section>
        </Navbar>
      </MediaQuery>
    </>
  );
};
