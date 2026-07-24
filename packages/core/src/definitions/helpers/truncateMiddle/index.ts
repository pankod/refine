export const truncateMiddle = (text: string, maxLength: number): string => {
  if (text.length <= maxLength || maxLength <= 3) {
    return text;
  }
  const charsToShow = maxLength - 3;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return `${text.slice(0, frontChars)}...${text.slice(text.length - backChars)}`;
};
