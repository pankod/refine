export const uppercaseFirstChar = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeANSIColors = (str: string): string => {
  return str.replace(
    // biome-ignore lint/suspicious/noControlCharactersInRegex: we want to remove invisible characters here.
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
};
