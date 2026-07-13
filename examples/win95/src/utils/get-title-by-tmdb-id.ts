import { dataProvider, supabaseClient } from "@/supabase-client";
import type { TMDBMovieResponse, VideoTitle } from "@/types";
import { tmdbToTitle } from "@/utils/tmdb-to-title";

export type TitleByTmdbIdResponse = {
  existing: boolean;
  data: Omit<VideoTitle, "created_at" | "id"> & { id?: number };
};

export const getTitleByTmdbId = async (
  tmdbId: number,
): Promise<TitleByTmdbIdResponse | null> => {
  let title: TitleByTmdbIdResponse["data"] | null = null;

  try {
    const existingResponse = await dataProvider.getOne<VideoTitle>({
      resource: "titles",
      id: tmdbId,
      meta: {
        select: "*",
        idColumnName: "tmdb_id",
      },
    });
    if (existingResponse?.data) {
      title = existingResponse.data;
    }
  } catch (error) {
    title = null;
  }

  if (title) {
    return { existing: true, data: title };
  }

  try {
    const response = await supabaseClient.functions.invoke<TMDBMovieResponse>(
      "movie",
      {
        body: { movieId: tmdbId },
      },
    );

    if (!response.data) {
      return null;
    }

    const newTitle = tmdbToTitle(response.data);

    return { existing: false, data: newTitle };
  } catch (error) {
    return null;
  }
};
