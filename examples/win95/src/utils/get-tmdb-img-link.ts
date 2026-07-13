export const getTMDBImgLink = (props: {
  path: string;
  width?: number;
}) => {
  const { path, width = 200 } = props;

  return `https://image.tmdb.org/t/p/w${width}${path}`;
};
