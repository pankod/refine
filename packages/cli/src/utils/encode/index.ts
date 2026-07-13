export const stringToBase64 = (str: string) => {
  if (typeof btoa !== "undefined") {
    return btoa(str);
  }

  return Buffer.from(str).toString("base64");
};

export const base64ToString = (base64: string) => {
  if (typeof atob !== "undefined") {
    return atob(base64);
  }
  return Buffer.from(base64, "base64").toString();
};
