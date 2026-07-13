import got from "got";
import tar from "tar";
import { Stream } from "stream";
import { promisify } from "util";
import { join } from "path";
import { createWriteStream, promises as fs } from "fs";

const pipeline = promisify(Stream.pipeline);

const TEMP_PREFIX = ".refine-example.temp";

async function downloadTar(url: string) {
  const tempFile = join(process.cwd(), `${TEMP_PREFIX}-${Date.now()}`);
  try {
    await pipeline(got.stream(url), createWriteStream(tempFile));
    return tempFile;
  } catch (err) {
    try {
      await fs.unlink(tempFile);
    } catch (err) {
      // ignore
    }
    return undefined;
  }
}

export async function downloadAndExtract({
  root,
  name,
  branch,
  repo,
  org,
}: {
  root: string;
  name: string;
  branch: string;
  repo: string;
  org: string;
}) {
  const tempFile = await downloadTar(
    `https://codeload.github.com/${org}/${repo}/tar.gz/${branch}`,
  );

  if (!tempFile) {
    return "download-failed";
  }

  try {
    await tar.x({
      file: tempFile,
      cwd: root,
      strip: 3,
      filter: (p) => {
        if (p.includes(`${repo}-${branch}/examples/${name}/`)) {
          return true;
        }
        return false;
      },
    });
  } catch (err) {
    try {
      await fs.unlink(tempFile);
    } catch (err) {
      // ignore
    }
    return "extract-failed";
  }

  try {
    await fs.unlink(tempFile);
  } catch (err) {
    // ignore
  }

  return "success";
}
