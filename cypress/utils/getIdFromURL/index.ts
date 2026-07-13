export const getIdFromURL = (url: string) => {
  const id = Number(url.split("/")?.pop()?.split("?")?.[0]);
  return id;
};
