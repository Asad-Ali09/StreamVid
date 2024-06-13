import { MixedMedia, MixedMediaResponseT, MoviesResponseT } from "@/types";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_TMDB_API;

const getMovies = async ({ type }: { type: string }) => {
  const url = `${base_url}/movie/${type}`;

  const params = {
    language: "en-US",
    page: "1",
  };
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
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

export { getMovies, getTrendingMedia };
