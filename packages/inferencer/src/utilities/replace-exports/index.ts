/**
 * `react-live` does not support `export` statements in the code.
 * This function will remove the `export` statements from the code.
 */
export const replaceExports = (code: string) => {
  // remove export statements from the code but keep the variables
  const newCode = code.replace(
    /export\s+(const|let|var|type|interface|function|class)\s+(\w+)\s*(=|:)\s*/g,
    "$1 $2 = ",
  );

  // remove default exports, check line by line, lines can be indented so ignore the tabs and spaces at the beginning
  const lines = newCode.split("\n");
  const newLines = lines.filter(
    (line) => !line.trim().startsWith("export default"),
  );

  return newLines.join("\n");
};
