import {
  MixedMedia,
  MixedMediaResponseT,
  MovieT,
  MoviesResponseT,
  SMovieT,
  SShowT,
  searchParams,
} from "@/types";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_TMDB_API;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
};

const getMovies = async ({ type }: { type: string }) => {
  console.log("ready to call api");
  const url = `${base_url}/movie/${type}`;

  const params = {
    language: "en-US",
    page: "1",
  };

  const response = await axios.get<MoviesResponseT>(url, { params, headers });
  return response.data;
};

const getTrendingMedia = async () => {
  const url = `${base_url}/trending/all/week`;
  const params = {
    language: "en-US",
  };
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  };

  const response = await axios.get<MixedMediaResponseT>(url, {
    params,
    headers,
  });

  return response.data;
};

const getMovieById = async ({ id }: { id: string }) => {
  const url = `${base_url}/movie/${id}`;
  const params = { language: "en-US" };
  const response = await axios.get<SMovieT>(url, { params, headers });

  return response.data;
};

const getShowById = async ({ id }: { id: string }) => {
  const url = `${base_url}/tv/${id}`;
  const params = { language: "en-US" };
  const response = await axios.get<SMovieT>(url, { params, headers });

  return response.data;
};

const getMovieRecommendations = async ({ id }: { id: string }) => {
  const url = `${base_url}/movie/${id}/recommendations`;
  const params = { language: "en-US", page: "1" };

  const response = await axios.get<MoviesResponseT>(url, { params, headers });
  return response.data;
};

const getMovieDetails = async ({
  id,
  mediaType,
}: searchParams): Promise<SMovieT | SShowT> => {
  let data: SShowT | SMovieT;
  if (mediaType === "movie") data = await getMovieById({ id });
  else data = await getShowById({ id });

  return data;
};

const isShow = (movie: SMovieT | SShowT): movie is SShowT => {
  return (
    movie !== undefined && (movie as SShowT).episode_run_time !== undefined
  );
};

export {
  getMovies,
  getTrendingMedia,
  getMovieById,
  getMovieRecommendations,
  getShowById,
  getMovieDetails,
  isShow,
};
