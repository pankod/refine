import type { ComponentDoc, PropItem } from "react-docgen-typescript";

export interface StringIndexedObject<T> {
  [key: string]: T;
}

export type DeclarationType = Omit<ComponentDoc, "methods"> &
  Partial<Pick<ComponentDoc, "methods">> & {
    props?: StringIndexedObject<
      Omit<PropItem, "tags"> & {
        tags?: {
          description?: string | null;
          deprecated?: string | null;
          default?: string | null;
        };
      }
    >;
  };

export const requireDocgen = (
  name: string,
  prefix = "@refinedev/",
): DeclarationType | null => {
  try {
    const data = require(
      `@docgen/${name.startsWith(prefix) ? name : `${prefix}${name}`}.json`,
    );

    return data as DeclarationType;
  } catch (err) {
    return null;
  }
};
