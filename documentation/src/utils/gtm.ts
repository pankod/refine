export type GtmEvent = {
  event: string;
  [key: string]: unknown;
};

export const pushGtmEvent = (payload: GtmEvent): void => {
  if (typeof window === "undefined") return;

  const win = window as typeof window & { dataLayer?: GtmEvent[] };

  if (!win?.dataLayer) {
    win.dataLayer = [];
  }

  win.dataLayer.push(payload);
};
