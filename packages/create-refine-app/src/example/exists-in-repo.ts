import got from "got";

async function isUrlOk(url: string): Promise<boolean> {
  const res = await got.head(url).catch((e) => e);
  return res.statusCode === 200;
}

export async function existsInRepo({
  organization,
  repository,
  example,
  branch,
}: {
  organization: string;
  repository: string;
  example: string;
  branch: string;
}): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${organization}/${repository}/contents/examples/${encodeURIComponent(
      example,
    )}?ref=${branch}`,
  );
}
