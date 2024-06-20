import React from "react";
import { mapGenreIdToName } from "@/utils/mapToGenre";
import { IoMdAdd } from "react-icons/io";
import { MovieT, ShowT } from "@/types";
import Link from "next/link";

const tmdb_image = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

const getMovieDisplayLink = (mediaType: string, id: number) => {
  return `/display?mediaType=${mediaType}&id=${id}`;
};
const isShow = (movie: MovieT | ShowT): movie is ShowT => {
  return (movie as ShowT).original_name !== undefined;
};

const MovieCard = ({ movie }: { movie: MovieT | ShowT }) => {
  return (
    <div className="rounded-xl md:max-w-[320px] h-[550px] text-white">
      <div className="rounded-xl h-[80%] w-full relative moviecard ">
        <img
          src={`${tmdb_image}${movie.poster_path}`}
          alt="Movie Image"
          className="block object-cover rounded-xl w-full h-full transition-transform duration-500 ease-in-out"
        />
        <button
          aria-label="watch later"
          className="absolute z-10 right-4 top-4 text-3xl bg-btnBgColor3 rounded-full p-2 hover:bg-white transition-all duration-300 ease-in-out hover:text-btnBgColor3 cursor-pointer"
        >
          <IoMdAdd />
        </button>
        <div className="absolute bottom-0 pb-4 w-full h-full flex flex-col px-2 gap-2 items-center justify-end text-center bg-gradient-to-t from-navBgColor to-transparent">
          <p className="font-semibold text-2xl text-center cursor-pointer hover:text-btnBgColor3 ">
            {isShow(movie) ? (
              <Link href={getMovieDisplayLink("tv", movie.id)}>
                {movie.name || movie.original_name}
              </Link>
            ) : (
              <Link href={getMovieDisplayLink("movie", movie.id)}>
                {movie.title || movie.original_title}
              </Link>
            )}
          </p>
          <p className=" font-light">
            {isShow(movie)
              ? movie.first_air_date?.slice(0, 4)
              : movie.release_date?.slice(0, 4)}
          </p>
          <button className="lg:py-2 sm:py-3 btn rounded-sm bg-btnBgColor3 hover:bg-white transition-all duration-300 ease-in-out hover:text-btnBgColor3">
            Watch Now
          </button>
        </div>
      </div>
      <p className="mt-4 font-semibold tracking-wide cursor-pointer hover:text-btnBgColor3">
        {isShow(movie) ? (
          <Link href={getMovieDisplayLink("tv", movie.id)}>
            {movie.name || movie.original_name}
          </Link>
        ) : (
          <Link href={getMovieDisplayLink("movie", movie.id)}>
            {movie.title || movie.original_title}
          </Link>
        )}
      </p>
      <p className="mt-2 font-light text-textlight">
        {isShow(movie)
          ? movie.first_air_date?.slice(0, 4)
          : movie.release_date?.slice(0, 4)}
      </p>
      <div className="flex flex-row gap-2 mt-2 text-textlight">
        {movie.genre_ids.map((genreId, index) => {
          return index < 2 ? (
            <p key={index}>
              {mapGenreIdToName(isShow(movie) ? "tv" : "movie", genreId)}{" "}
              {index == 0 && "|"}{" "}
            </p>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MovieCard;
