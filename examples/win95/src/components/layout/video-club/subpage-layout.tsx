import type { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";
import { Hourglass, Window } from "react95";
import { AppLayoutHeader } from "@/components/layout";
import { getImagesUrl } from "@/utils/get-cdn-url";

type Props = {
  title?: ReactNode;
  help?: ReactNode;
  isLoading?: boolean;
  onClose?: () => void;
  containerStyle?: React.CSSProperties;
};

export const VideoClubLayoutSubPage = ({
  title,
  help,
  onClose,
  isLoading,
  children,
  containerStyle,
}: PropsWithChildren<Props>) => {
  return (
    <OverlayContainer>
      <Overlay />
      <Container style={containerStyle}>
        <AppLayoutHeader title={title} help={help} onClose={onClose} />
        <WindowContent>
          <LoaderContainer $isLoading={isLoading}>
            <Hourglass size={64} style={{ zIndex: 2 }} />
          </LoaderContainer>
          {children}
        </WindowContent>
      </Container>
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  box-sizing: border-box;
  padding: 4px;
`;

const Overlay = styled.div`
position: absolute;
inset: 0;
z-index: 0;
width: 100%;
height: 100%;
background-image: url(${getImagesUrl("/tile.png")});
background-repeat: repeat;
background-size: 4px;
`;

const LoaderContainer = styled.div<{ $isLoading?: boolean }>`
  background: ${({ theme }) => theme.material};
  pointer-events: ${(props) => (props.$isLoading ? "auto" : "none")};
  opacity: ${(props) => (props.$isLoading ? 1 : 0)};
  transition: opacity 0.2s linear;
  z-index: 3;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Window)`
  padding: 2px 2px;
  z-index: 3;
  max-width: 960px;
  height: auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

const WindowContent = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
  margin-right: 3px;
  margin-bottom: 2px;
`;
