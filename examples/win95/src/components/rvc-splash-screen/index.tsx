import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ProgressBar } from "react95";
import { AppLayout } from "@/components/layout";
import { getImagesUrl } from "@/utils/get-cdn-url";

export const RVCSplashScreen = () => {
  const navigate = useNavigate();
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (percent === 100) {
    return null;
  }

  return (
    <StyledAppLayout
      title="Refine Video Club"
      iconURL={getImagesUrl("/refine-video-club-app-icon-pixelated.png")}
      onClose={() => navigate("/")}
      onMinimize={() => navigate("/")}
    >
      <Container>
        <SplashContainer>
          <SplashShadow />
          <Splash src={getImagesUrl("/splash-screen.png")} />
        </SplashContainer>
        <Progress variant="tile" value={percent} hideValue />
      </Container>
    </StyledAppLayout>
  );
};

const StyledAppLayout = styled(AppLayout)`
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const SplashContainer = styled.div`
  width: 735px;
  height: 421px;
  position: relative;
`;

const Splash = styled.img`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
`;

const SplashShadow = styled.div`
  z-index: 0;

  position: absolute;
  top: 12px;
  left: 12px;

  width: 100%;
  height: 100%;

  background-image: linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%);
  background-size: 4px 4px;
  background-position: bottom right, bottom 2px right 0, bottom 2px right -2px, bottom 0px right 2px;
`;

const Progress = styled(ProgressBar)`
  max-width: 735px;
  width: 100%;
`;
