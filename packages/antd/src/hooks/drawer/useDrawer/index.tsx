import type { DrawerProps } from "antd";
import { useModal, type useModalReturnType } from "@refinedev/core";

export type useDrawerReturnType = {
  drawerProps: DrawerProps;
} & Omit<useModalReturnType, "visible">;

export type useDrawerProps = {
  /**
   * Default props for Ant Design {@link https://ant.design/components/drawer/ `<Drawer>`} component.
   */
  drawerProps?: DrawerProps;
};

/**
 * By using `useDrawer` you get props for your records from API in accordance with Ant Design {@link https://ant.design/components/drawer/ `<Drawer>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-integrations/ant-design/hooks/use-drawer} for more details.
 */
export const useDrawer = ({
  drawerProps = {},
}: useDrawerProps = {}): useDrawerReturnType => {
  const { show, close, visible } = useModal({
    defaultVisible: drawerProps.open,
  });

  return {
    drawerProps: {
      ...drawerProps,
      onClose: (e: React.MouseEvent | React.KeyboardEvent) => {
        drawerProps.onClose?.(e);
        close();
      },
      open: visible,
    },
    show,
    close,
  };
};
