/**
 * traverse an object and check if it has a given key
 * @param obj the object to traverse
 * @param key the key to check for in the object. can be an array of keys. e.g. ['foo', 'bar']). It will check for 'foo' or 'bar' in the object
 */
export const deepHasKey = (obj: Record<string, any>, keys: string[]) => {
  // traverse all keys in the object
  for (const k in obj) {
    // if the key is in the object, return true
    if (keys.includes(k)) {
      return true;
    }

    // if the value is an object, recurse into it
    if (typeof obj[k] === "object" && obj[k] !== null) {
      if (deepHasKey(obj[k], keys)) {
        return true;
      }
    }
  }

  return false;
};
