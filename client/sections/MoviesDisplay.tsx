import { DoughnutChart } from "@/components";
import { isShow } from "@/features/moviesServices";
import { SMovieT, SShowT } from "@/types";
import Link from "next/link";
import React from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";

const tmdb_image = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

const getMovieWatchLink = (movie: SMovieT | SShowT) => {
  const mediaType = isShow(movie) ? "tv" : "movie";
  const url = `/watch?mediaType=${mediaType}&id=${movie.id}`;
  if (mediaType === "tv") url + "&season=1&episode=1";
  return url;
};

const MoviesDisplay = ({ movie }: { movie: SShowT | SMovieT }) => {
  return (
    <>
      <section
        className="nav-p-x pt-32 w-full bg-center bg-cover min-h-screen"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${tmdb_image}${movie?.backdrop_path})`,
        }}
      >
        <div className="text-white md:grid grid-cols-4 gap-12">
          <div className="col-span-1">
            <img
              src={`${tmdb_image}${movie?.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="col-span-3 py-2">
            <h1 className="text-white text-7xl font-bold">
              {isShow(movie) ? movie.name : movie.title}
            </h1>
            {/* Date Genre | Time */}
            <div className="mt-3">
              <p className="text-textlight font-light tracking-wider text-sm">
                {movie?.genres.map((genre) => genre.name).join(", ")}
                {!isShow(movie) && " | " + movie.runtime + " min"}
              </p>
            </div>
            {isShow(movie) && (
              <div>
                <span className="mt-1 mr-2 text-textlight">
                  Total Seasons :
                </span>
                <span>{movie.number_of_seasons}</span>
              </div>
            )}

            {/* User Ratings */}
            <div className="flex gap-2 items-center">
              <DoughnutChart rating={movie.vote_average} />
              <p className="text-lg font-semibold ">User Ratings</p>
            </div>
            {/* Buttons for watch later | Watch now | Favorites */}
            <div className="flex gap-4 mt-4">
              <Link href={getMovieWatchLink(movie)}>
                <button className="has-tooltip flex items-center justify-center bg-primary text-white px-4 py-2 rounded-full h-12 w-12">
                  <FaPlay />
                  <span className="tooltip rounded shadow-lg p-1">
                    Watch Now
                  </span>
                </button>
              </Link>

              <button className="has-tooltip flex items-center justify-center bg-primary text-white px-4 py-2 rounded-full">
                <FaBookmark />
                <span className="tooltip rounded shadow-lg p-1">
                  Add to Watchlist
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg">
                <FaPlay />
                Play Trailer
              </button>
            </div>

            {/* Tagline */}
            <p className="italic text-textlight mt-4 tracking-wide">
              {movie.tagline}
            </p>
            {/* Overview */}

            <p className="font-semibold text-xl mt-4 mb-2">Overview</p>
            <p className="text-sm tracking-wider leading-relaxed">
              {movie?.overview}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoviesDisplay;
