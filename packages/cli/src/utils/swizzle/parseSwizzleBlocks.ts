export const parseSwizzleBlocks = (content: string) => {
  const regex =
    /(\/\/|\/\*)(\s?)swizzle-remove-start([\s\S]*?)(\/\/|\/\*)(\s?)swizzle-remove-end(\s*)(\*\/)?/g;

  return content.replace(regex, "");
};
