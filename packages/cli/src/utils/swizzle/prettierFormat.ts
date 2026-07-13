import { format, resolveConfig } from "prettier";

export const prettierFormat = async (code: string) => {
  try {
    const prettierConfig = await resolveConfig(process.cwd());

    return format(code, {
      ...(prettierConfig ?? {}),
      parser: "typescript",
    });
  } catch (err) {
    return code;
  }
};
