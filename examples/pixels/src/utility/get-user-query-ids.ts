import type { Pixel } from "../types/pixel";

export const getUserQueryIds = (pixels: Pixel[] | undefined): string[] => {
  const ids: string[] | undefined = pixels?.map((pixel: any) => pixel.user_id);
  const idSet = new Set(ids);

  return [...idSet];
};
