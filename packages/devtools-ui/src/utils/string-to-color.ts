const stringToHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const stringToColor = (str: string) => {
  return `hsl(${stringToHash(str) % 360}, 100%, 80%)`;
};
