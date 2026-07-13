export const getLastLocation = (): string => {
  const lastLocation = localStorage.getItem("devtools:last-location");
  return lastLocation || "/overview";
};

export const setLastLocation = (location: string): void => {
  localStorage.setItem("devtools:last-location", location);
};
