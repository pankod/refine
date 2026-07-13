import {
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from "react";
import {
  Button,
  Frame,
  WindowHeader,
  MenuList,
  MenuListItem,
  Separator,
} from "react95";
import styled from "styled-components";
import { IconMinimize, IconClose, IconQuestionMark } from "@/components/icons";
import { Popover } from "@/components/tooltip";

type MenuItems = {
  label: string;
  onClick?: () => void;
};

type Menu = {
  label: string;
  children: MenuItems[];
  onClick?: () => void;
};

type Props = {
  title?: ReactNode;
  menu?: Menu[];
  iconURL?: string;
  className?: string;
  help?: ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
};

export const AppLayout = ({
  title,
  menu,
  iconURL,
  className,
  help,
  onClose,
  onMinimize,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Window className={className}>
      <AppLayoutHeader
        iconURL={iconURL}
        title={title}
        help={help}
        onMinimize={onMinimize}
        onClose={onClose}
      />
      <AppLayoutMenu menu={menu} />
      <Content variant="field">{children}</Content>
    </Window>
  );
};

export const AppLayoutHeader = ({
  iconURL,
  title,
  help,
  onMinimize,
  onClose,
}: Omit<Props, "menu" | "className">) => {
  return (
    <Header>
      <TitleWrapper>
        {iconURL && <Icon src={iconURL} alt={"app icon"} />}
        <h2>{title}</h2>
      </TitleWrapper>
      <HeaderActions>
        {help && (
          <Popover id="help" enterDelay={100} content={help}>
            <Button>
              <IconQuestionMark />
            </Button>
          </Popover>
        )}
        {onMinimize && (
          <Button onClick={onMinimize}>
            <IconMinimize />
          </Button>
        )}
        {onClose && (
          <Button onClick={onClose}>
            <IconClose />
          </Button>
        )}
      </HeaderActions>
    </Header>
  );
};

export const AppLayoutMenu = (props: Pick<Props, "menu">) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu["label"] | null>(null);

  const handleMenuClick = (label: Menu["label"]) => {
    setSelectedMenu((prev) => (prev === label ? null : label));
  };

  return (
    <MenuBar>
      {props.menu?.map((item) => {
        const isSelected = selectedMenu === item.label;

        return (
          <MenuBarItem
            variant="menu"
            key={item.label}
            selected={isSelected}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
                return;
              }
              handleMenuClick(item.label);
            }}
          >
            {item.label}
            {isSelected && !!item?.children?.length && (
              <MenuBarItemChildList>
                {item.children.map((child, i) => (
                  <Fragment key={child.label}>
                    <MenuBarItemChildListItem onClick={child.onClick} size="sm">
                      {child.label}
                    </MenuBarItemChildListItem>
                    {i < item.children.length - 1 && <Separator />}
                  </Fragment>
                ))}
              </MenuBarItemChildList>
            )}
          </MenuBarItem>
        );
      })}
    </MenuBar>
  );
};

const Window = styled(Frame)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled(Frame)`
  width: 100%;
  height: 100%;
  background: unset;
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: -2px;
`;

const MenuBar = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2px;
`;

const MenuBarItem = styled(Button)<{ selected: boolean }>`
  position: relative;
  color: ${(props) => {
    if (props.selected) {
      return "white";
    }
    return "unset";
  }};
  background-color: ${(props) => {
    if (props.selected) {
      return props.theme.headerBackground;
    }
    return "unset";
  }};
  &:active, &:focus {
   border-color:transparent;
  } 
`;

const MenuBarItemChildList = styled(MenuList)`
  position: absolute;
  top: 34px;
  left: -2px;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const MenuBarItemChildListItem = styled(MenuListItem)`
  cursor: pointer !important;
`;
