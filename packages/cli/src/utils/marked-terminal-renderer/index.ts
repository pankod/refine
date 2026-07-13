import { renderCodeMarkdown } from "@utils/swizzle/renderCodeMarkdown";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

export const markedTerminalRenderer = (markdown: string) => {
  return marked(markdown, {
    renderer: new TerminalRenderer({ code: renderCodeMarkdown }) as any,
  });
};
