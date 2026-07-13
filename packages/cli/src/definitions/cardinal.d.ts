declare module "cardinal" {
  export function highlight(
    code: string,
    options?: { jsx?: boolean; theme?: string; linenos?: boolean },
  ): string;
}
