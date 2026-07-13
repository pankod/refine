export const downloadInBrowser = (
  filename: string,
  content: string,
  type?: string,
) => {
  if (typeof window === "undefined") {
    return;
  }

  const blob = new Blob([content], { type });

  const link = document.createElement("a");
  link.setAttribute("visibility", "hidden");
  link.download = filename;
  const blobUrl = URL.createObjectURL(blob);
  link.href = blobUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // As per documentation, call URL.revokeObjectURL to remove the blob from memory.
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  });
};
