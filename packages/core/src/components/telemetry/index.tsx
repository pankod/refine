import React from "react";

import { useTelemetryData } from "@hooks/useTelemetryData";

import type { ITelemetryData } from "./types";

const encode = (payload: ITelemetryData): string | undefined => {
  try {
    const stringifiedPayload = JSON.stringify(payload || {});

    if (typeof btoa !== "undefined") {
      return btoa(stringifiedPayload);
    }

    return Buffer.from(stringifiedPayload).toString("base64");
  } catch (err) {
    return undefined;
  }
};

const throughImage = (src: string) => {
  const img = new Image();

  img.src = src;
};

const throughFetch = (src: string) => {
  fetch(src);
};

const transport = (src: string) => {
  if (typeof Image !== "undefined") {
    throughImage(src);
  } else if (typeof fetch !== "undefined") {
    throughFetch(src);
  }
};

export const Telemetry: React.FC<{}> = () => {
  const payload = useTelemetryData();
  const sent = React.useRef(false);

  React.useEffect(() => {
    if (sent.current) {
      return;
    }
    const encoded = encode(payload);

    if (!encoded) {
      return;
    }

    transport(`https://telemetry.refine.dev/telemetry?payload=${encoded}`);
    sent.current = true;
  }, []);

  return null;
};
