import chalk from "chalk";
import cardinal from "cardinal";
import boxen from "boxen";

const getCodeData = (content: string): { title?: string; code: string } => {
  const titleRegexp = /^(?:\/\/\s?title:\s?)(.*?)\n/g;

  const [commentLine, titleMatch] = titleRegexp.exec(content) ?? [];

  if (titleMatch) {
    const title = titleMatch.trim();
    const code = content.replace(commentLine || "", "");

    return { title, code };
  }

  return { code: content };
};

export const renderCodeMarkdown = (content: string) => {
  const { title, code: rawCode } = getCodeData(content);

  let highlighted = "";

  // run cardinal on codeContent
  try {
    const code = cardinal.highlight(rawCode, {
      jsx: true,
    });
    highlighted = code;
  } catch (err) {
    highlighted = rawCode;
  }

  // wrap to boxen
  const boxed = boxen(highlighted, {
    padding: 1,
    margin: 0,
    borderStyle: "round",
    borderColor: "gray",
    titleAlignment: "left",
    title: title ? chalk.bold(title) : undefined,
  });

  return boxed;
};
