const identifierRegexp = /^id$/i;

export const isIDKey = (key: string): boolean => identifierRegexp.test(key);
