export const humanizeString = (text: string): string => {
  text = text.replace(/([a-z]{1})([A-Z]{1})/g, "$1-$2");
  text = text.replace(/([A-Z]{1})([A-Z]{1})([a-z]{1})/g, "$1-$2$3");

  text = text
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  text = text.charAt(0).toUpperCase() + text.slice(1);

  return text;
};
// https://www.npmjs.com/package/humanize-string
