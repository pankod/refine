export const getLocalStorage = <T>(name: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const value = window.localStorage.getItem(name);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const setLocalStorage = <T>(name: string, newValue: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(name, JSON.stringify(newValue));
  } catch (error) {}
};
