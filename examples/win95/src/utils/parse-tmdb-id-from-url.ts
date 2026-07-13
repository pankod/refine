export const parseTmdbIdFromUrl = (value: string) => {
  try {
    const url = new URL(value);

    const hostsRegex = /^(www\.)?themoviedb\.org$/;
    if (!hostsRegex.test(url.host)) return null;

    const idRegex = /^\/movie\/(\d+?)(?:$|\/|\?|#|-)/;
    const match = url.pathname.match(idRegex);
    if (!match) return null;

    return Number.parseInt(match[1], 10);
  } catch (error) {
    return null;
  }
};
