"use client";
import { getMovies, getTrendingMedia } from "@/features/moviesServices";
import { MixedMedia, MovieT, ShowT } from "@/types";
import Slider from "react-slick";
import MovieCard from "./MovieCard";
import { useEffect, useMemo, useState } from "react";
import Loading from "./Loading";

const MovieSlider = ({ type }: { type: string }) => {
  const [movies, setMovies] = useState<MovieT[] | ShowT[] | MixedMedia[]>([]);
  useEffect(() => {
    const getData = async () => {
      // get Trending Media
      if (type === "trending") {
        const data = await getTrendingMedia();
        setMovies(data.results);
      }
      // get Movies
      else {
        const data = await getMovies({ type });
        setMovies(data.results);
      }
    };
    getData();
  }, [type]);

  return (
    <div className="slider-container">
      {movies.length === 0 ? (
        <Loading />
      ) : (
        <Slider {...settings}>
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export default MovieSlider;

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  // centerMode: true,
  centerPadding: "10px",
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0px",
      },
    },
  ],
};
