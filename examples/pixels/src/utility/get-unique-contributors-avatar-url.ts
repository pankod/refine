import type { Pixel } from "../types/pixel";

export const getUniqueContributorsAvatarURL = (pixels: Pixel[] | undefined) => {
  const contributorsAvatar = pixels?.map(
    (pixel: Pixel) => pixel.users?.avatar_url,
  );
  const contributorsAvatarSet = new Set(contributorsAvatar);

  return [...contributorsAvatarSet];
};
