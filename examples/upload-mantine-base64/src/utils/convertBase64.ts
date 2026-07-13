export const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        resolve(fileReader.result);
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
