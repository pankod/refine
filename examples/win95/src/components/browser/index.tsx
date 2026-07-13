import type { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";
import { Select, Separator, Window } from "react95";
import { AppLayoutHeader, AppLayoutMenu } from "@/components/layout";
import { getImagesUrl } from "@/utils/get-cdn-url";

type Props = {
  title?: ReactNode;
  isLoading?: boolean;
  containerStyle?: React.CSSProperties;
  address?: string;
  onClose?: () => void;
};

export const Browser = ({
  title,
  containerStyle,
  address,
  onClose,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Container style={containerStyle}>
      <AppLayoutHeader title={title} onClose={onClose} />
      <AppLayoutMenu
        menu={[
          { label: "File", children: [] },
          { label: "Edit", children: [] },
          { label: "View", children: [] },
          { label: "Favorites", children: [] },
          { label: "Help", children: [] },
        ]}
      />
      <AppBar>
        <AppBarContainer>
          <Separator />
          <ImageBrowserIcons
            src={getImagesUrl("/browser-icons.png")}
            alt="browser icons"
          />
          <Separator />
          <AddressBarContainer>
            <AddressText>Address:</AddressText>
            <Select
              width="92%"
              value={address}
              options={[
                {
                  label: address,
                  value: address,
                },
              ]}
            />
          </AddressBarContainer>
        </AppBarContainer>
        <Win95LogoContainer>
          <Win95Logo src={getImagesUrl("/win95-logo.png")} alt="win95 logo" />
        </Win95LogoContainer>
      </AppBar>
      <WindowContent>{children}</WindowContent>
    </Container>
  );
};

const Container = styled(Window)`
  width: 100%;
`;

const WindowContent = styled.div`
  height: calc(100dvh - 250px);
  overflow: auto;
`;

const AppBar = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  justify-content: space-between;
`;

const AppBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddressBarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 8px 4px;
`;

const AddressText = styled.div`
  width: 80px;
  padding-left: 8px;
`;

const ImageBrowserIcons = styled.img`
  width: 678px;
  height: 44px;
  padding: 8px 16px;
`;

const Win95LogoContainer = styled.div`
  width: 110px;
  height: 110px;
  border: 2px solid ;
  border-top-color: #707070;
  border-left-color: #707070;
  border-right-color: #D9D9D9;
  border-bottom-color: #D9D9D9;
`;

const Win95Logo = styled.img`
   width: 106px;
  height: 106px;
  border: 2px solid ;
  border-top-color: black;
  border-left-color: black;
  border-right-color: white;
  border-bottom-color: white;
`;
