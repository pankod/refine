export type VideoTitle = {
  id: number;
  created_at: string;
  tmdb_id: number;
  poster_path: string;
  trailer_key: string;
  title: string;
  genres: string[];
  year: number;
  duration_minutes: number;
  director: string;
  cast: string[];
  overview: string;
};

export type ExtendedVideoTitle = VideoTitle & {
  tapes: Tape[];
  rentals: Rental[];
};

export type Tape = {
  id: number;
  created_at: string;
  title_id: number;
  available: boolean;
};

export type Rental = {
  id: number;
  member_id: number;
  period: number;
  created_at: string;
  start_at: string;
  expected_return_at: string;
  returned_at: string | null;
  title_id: number;
  tape_id: number;
};

export type ExtendedRental = Rental & {
  titles?: VideoTitle;
};

export type CreateRental = {
  member_id: number;
  period: number;
  title_id: number;
  expected_return_at: string;
};

export type Member = {
  id: number;
  deposit: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  photo_url?: string;
};

export type ExtendedMember = Member & {
  rentals: ExtendedRental[];
};

export type TMDBMovieResponse = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      job: string;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      job: string;
    }[];
  };
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
      type: string;
      id: string;
    }[];
  };
};
