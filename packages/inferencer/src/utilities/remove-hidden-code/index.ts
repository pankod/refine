export const removeHiddenCode = (code?: string) => {
  // hidden blocks are wrapped in `/* hidden-start */` and `/* hidden-end */`
  // these blocks can present multiple times in the code

  return code?.replace(
    /(\/\* hidden-start \*\/)(.|\n)*?(\/\* hidden-end \*\/)/g,
    "",
  );
};
