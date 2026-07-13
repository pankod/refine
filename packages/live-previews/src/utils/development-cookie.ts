const DEVELOPMENT_MODE_COOKIE = "refine-live-preview-development-mode";

export const isDevelopmentModeByCookie = (): boolean => {
  if (typeof document === "undefined") return false;

  const cookie = document.cookie;
  const parts = cookie.split(";");
  const dev = parts.find((part) => part.includes(DEVELOPMENT_MODE_COOKIE));
  if (!dev) return false;
  const [, value] = dev.split("=");
  return value === "true";
};
