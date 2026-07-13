export const openFigma = () => {
  return window
    .open(
      "https://www.figma.com/file/hckUGhFpATery5eFvnkksN/Refine-Brand-Assets?type=design&node-id=0%3A1&mode=design&t=uUQMfBfpr6Lxq8b0-1",
      "_blank",
    )
    ?.focus();
};
