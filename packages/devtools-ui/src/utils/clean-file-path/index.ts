export const cleanFilePath = (filePath?: string) => {
  if (!filePath) return filePath;
  let cleaned = filePath;
  // if it starts with http, remove the part before the third slash
  if (cleaned.startsWith("http")) {
    cleaned = cleaned.split("/").slice(3).join("/");
  }
  if (cleaned.includes("?")) {
    cleaned = cleaned.split("?")[0];
  }
  if (cleaned.startsWith("webpack-internal:///")) {
    cleaned = cleaned.replace("webpack-internal:///", "");
  }
  return cleaned;
};
