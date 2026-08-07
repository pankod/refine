import React from "react";
import { type IconButtonProps, IconButton } from "@chakra-ui/react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMenu2,
} from "@tabler/icons-react";

import { useThemedLayoutContext } from "@hooks";

const HamburgerIcon = (props: IconButtonProps) => (
  <IconButton variant="ghost" size="sm" {...props} />
);

export const HamburgerMenu: React.FC = () => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  return (
    <>
      <HamburgerIcon
        display={{ base: "none", md: "flex" }}
        aria-label="drawer-sidebar-toggle"
        icon={
          siderCollapsed ? (
            <IconLayoutSidebarLeftExpand />
          ) : (
            <IconLayoutSidebarLeftCollapse />
          )
        }
        onClick={() => setSiderCollapsed(!siderCollapsed)}
      />
      <HamburgerIcon
        display={{ base: "flex", md: "none" }}
        aria-label="sidebar-toggle"
        icon={<IconMenu2 />}
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
      />
    </>
  );
};
