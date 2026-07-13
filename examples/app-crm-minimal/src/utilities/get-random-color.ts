/*
 * generates random colors from  https://ant.design/docs/spec/colors. <color-4> used.
 */
export const getRandomColorFromString = (text: string) => {
  const colors = [
    "#ff9c6e",
    "#ff7875",
    "#ffc069",
    "#ffd666",
    "#fadb14",
    "#95de64",
    "#5cdbd3",
    "#69c0ff",
    "#85a5ff",
    "#b37feb",
    "#ff85c0",
  ];

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;

  return colors[hash];
};
