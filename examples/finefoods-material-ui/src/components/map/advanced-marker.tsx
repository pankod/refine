import {
  useState,
  useEffect,
  memo,
  useRef,
  type PropsWithChildren,
} from "react";
import { type Root, createRoot } from "react-dom/client";

type AdvancedMarkerProps = {
  onClick?: (event: google.maps.FeatureMouseEvent) => void;
  map?: google.maps.Map;
} & google.maps.marker.AdvancedMarkerElementOptions;

const AdvancedMarker: React.FC<PropsWithChildren<AdvancedMarkerProps>> = ({
  onClick,
  map,
  children,
  zIndex,
  ...options
}) => {
  const rootRef = useRef<Root | null>(null);
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement>();

  useEffect(() => {
    if (!map) return;

    if (!marker) {
      const container = document.createElement("div");
      rootRef.current = createRoot(container);

      setMarker(
        new google.maps.marker.AdvancedMarkerElement({
          ...options,
          gmpClickable: !!onClick,
          content: container,
          map,
        }),
      );
    }
  }, [marker, map, options, onClick]);

  useEffect(() => {
    if (marker) {
      marker.zIndex = zIndex;
    }
  }, [marker, zIndex]);

  useEffect(() => {
    if (!marker) return;

    rootRef?.current?.render(children);
    if (onClick) {
      google.maps.event.addListener(marker, "gmp-click", onClick);
    }
    return () => {
      if (marker) {
        google.maps.event.clearListeners(marker, "gmp-click");
      }
    };
  }, [marker, children, onClick]);

  return null;
};

export default memo(AdvancedMarker);
