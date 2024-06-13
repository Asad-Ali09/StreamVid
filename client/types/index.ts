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
