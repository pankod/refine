import fs from "fs";

export async function makeDir(
  root: string,
  options = { recursive: true },
): Promise<"already" | "success" | "failed"> {
  try {
    if (fs.existsSync(root)) {
      return "already";
    }
    await fs.promises.mkdir(root, options);
    return "success";
  } catch (err) {
    return "failed";
  }
}
