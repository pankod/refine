import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/local-storage";

type Props<T> = {
  name: string;
  defaultValue: T;
};

export const useLocalStorage = <T>({ name, defaultValue }: Props<T>) => {
  const [value, setValue] = useState<T>(() => {
    return getLocalStorage(name, defaultValue);
  });

  useEffect(() => {
    setLocalStorage(name, value);
  }, [value]);

  return [value, setValue] as const;
};
