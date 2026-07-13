const flatten = (data: any) => {
  if (!data.attributes) return data;

  return {
    id: data.id,
    ...data.attributes,
  };
};

const isObject = (data: any) =>
  Object.prototype.toString.call(data) === "[object Object]";

export const normalizeData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeData(item));
  }

  if (isObject(data)) {
    if (Array.isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key in data) {
      data[key] = normalizeData(data[key]);
    }

    return data;
  }

  return data;
};
