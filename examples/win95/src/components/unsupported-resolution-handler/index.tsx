import { MINIMUM_APP_HEIGHT, MINIMUM_APP_WIDTH } from "@/utils/app-settings";
import { type PropsWithChildren, useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const UnsupportedResolutionHandler = ({
  children,
}: PropsWithChildren) => {
  const [windowDimensions, setWindowDimensions] = useState(() =>
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      const dimensions = getWindowDimensions();
      const body = document.body;

      if (
        dimensions.width < MINIMUM_APP_WIDTH ||
        dimensions.height < MINIMUM_APP_HEIGHT
      ) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "unset";
      }

      setWindowDimensions(dimensions);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSupported =
    windowDimensions.width >= MINIMUM_APP_WIDTH &&
    windowDimensions.height >= MINIMUM_APP_HEIGHT;

  return (
    <>
      <div
        style={{
          display: isSupported ? "none" : "flex",
          pointerEvents: isSupported ? "unset" : "none",
          overflow: isSupported ? "unset" : "hidden",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: "0",
          left: "0",
          zIndex: 9999,
          background: "#080184",
          backgroundColor: "#080184",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            textAlign: "center",
            color: "#0300AB",
            backgroundColor: "#AAA",
            padding: "8px",
            fontWeight: "bold",
          }}
        >
          Windows
        </h1>
        <h2
          style={{
            fontSize: "24px",
            lineHeight: "2",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          Resolution not supported.
          <div
            style={{
              lineHeight: "32px",
            }}
          >
            This website is best browsed at resolutions 1024x768 or higher.
          </div>
        </h2>
      </div>
      {children}
    </>
  );
};
