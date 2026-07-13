import { useState, useEffect, memo } from "react";

interface MarkerProps extends google.maps.MarkerOptions {
  onClick?: (event: google.maps.FeatureMouseEvent) => void;
  onDragEnd?: (event: google.maps.FeatureMouseEvent) => void;
}

const Marker: React.FC<MarkerProps> = ({ onClick, onDragEnd, ...options }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions({
        ...options,
        clickable: !!onClick,
        draggable: !!onDragEnd,
      });
      if (onClick) {
        marker.addListener("click", onClick);
      }
      if (onDragEnd) {
        marker.addListener("dragend", onDragEnd);
      }
    }

    return () => {
      if (marker) {
        google.maps.event.clearListeners(marker, "click");
      }
    };
  }, [marker, options, onClick, onDragEnd]);

  return null;
};

export default memo(Marker);
