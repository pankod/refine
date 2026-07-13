import type { TMDBMovieResponse, VideoTitle } from "@/types";

export const tmdbToTitle = (
  tmdbBody: TMDBMovieResponse,
): Omit<VideoTitle, "created_at" | "id"> => {
  return {
    tmdb_id: tmdbBody.id,
    poster_path: tmdbBody.poster_path ?? "",
    trailer_key:
      tmdbBody.videos.results.find((r) => r.site === "YouTube")?.key ?? "",
    title: tmdbBody.title,
    genres: tmdbBody.genres.map((g) => g.name),
    year: +tmdbBody.release_date.slice(0, 4),
    duration_minutes: tmdbBody.runtime,
    director:
      tmdbBody.credits.crew.find((c) => c.job === "Director")?.name ?? "",
    cast: tmdbBody.credits.cast.slice(0, 3).map((c) => c.name),
    overview: tmdbBody.overview,
  };
};
