export const file2Base64 = (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    const resultHandler = () => {
      if (reader.result) {
        reader.removeEventListener("load", resultHandler, false);

        resolve(reader.result as string);
      }
    };

    reader.addEventListener("load", resultHandler, false);

    reader.readAsDataURL(file.originFileObj as Blob);
    reader.onerror = (error) => {
      reader.removeEventListener("load", resultHandler, false);
      return reject(error);
    };
  });
};
