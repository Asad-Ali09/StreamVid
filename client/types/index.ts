interface Theater {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieT extends Theater {
  original_title: string;
  release_date: string;
}

export interface ShowT extends Theater {
  original_name: string;
  name: string;
  first_air_date: string;
}

export interface MixedMedia extends ShowT, MovieT {
  media_type: string;
}

export type MoviesResponseT = {
  page: number;
  results: MovieT[];
};
export type ShowResponseT = {
  page: number;
  results: ShowT[];
};
export type MixedMediaResponseT = {
  page: number;
  results: MixedMedia[];
};

export interface SMovieT extends MovieT {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  imdb_id: string;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  runtime: number;
  status: string;
  tagline: string;
}

export interface SShowT extends ShowT {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  tagline: string;
  type: string;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  origin_country: ["US"];
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
    }
  ];
}

export type searchParams = {
  mediaType: string;
  id: string;
  episode?: number;
  season?: number;
};

export type DisplayProps = {
  searchParams: Omit<searchParams, "episode | season">;
};

export type WatchProps = {
  searchParams: searchParams;
};

// Auth ------------

export type User = {
  name: string;
  email: string;
  profilePicture: string;
};

export type loginDataType = {
  email: string;
  password: string;
};
export type SignUpDataType = loginDataType & {
  name: string;
};

export type loginReturnType = {
  message: string;
  data: User;
};
