"use client";
import { truncateText } from "@/utils/truncateText";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import noise from "../public/icons/bg-noise.gif";

const Hero = () => {
  const tmdbPath = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  // TODO: Either fetch from API or Add trailer videos
  const movies = [
    {
      adult: false,
      backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      genre_ids: [878, 12, 28],
      id: 653346,
      original_language: "en",
      original_title: "Kingdom of the Planet of the Apes",
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      popularity: 6245.898,
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      release_date: "2024-05-08",
      title: "Kingdom of the Planet of the Apes",
      video: false,
      vote_average: 6.889,
      vote_count: 849,
    },
    {
      adult: false,
      backdrop_path: "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
      genre_ids: [10752, 28, 18],
      id: 929590,
      original_language: "en",
      original_title: "Civil War",
      overview:
        "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
      popularity: 2730.901,
      poster_path: "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
      release_date: "2024-04-10",
      title: "Civil War",
      video: false,
      vote_average: 7.062,
      vote_count: 1384,
    },
    {
      adult: false,
      backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
      genre_ids: [878, 28, 12],
      id: 823464,
      original_language: "en",
      original_title: "Godzilla x Kong: The New Empire",
      overview:
        "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
      popularity: 2726.153,
      poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      release_date: "2024-03-27",
      title: "Godzilla x Kong: The New Empire",
      video: false,
      vote_average: 7.228,
      vote_count: 2599,
    },
  ];

  const [index, setIndex] = useState(0);

  const setImageIndex = (index: number) => {
    if (index < 0) setIndex(movies.length - 1);
    else if (index === movies.length) setIndex(0);
    else setIndex(index);
  };

  return (
    <>
      <div className="relative w-[100%] h-screen">
        <div className="h-full w-full overflow-hidden flex">
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className={`relative flex items-center w-[100%] h-full flex-grow-0 flex-shrink-0 transition-translate duration-300 ease-in-out`}
                style={{
                  translate: `${-100 * index}%`,
                }}
              >
                <div className={`absolute top-0 w-full h-full -z-10 `}>
                  <div className="absolute top-0 left-0 z-10 hero-gradient w-full h-full"></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${noise.src})`,
                    }}
                  ></div>
                  <img
                    src={`${tmdbPath}${movie.backdrop_path}`}
                    alt="Movie backdrop image"
                    className="opacity-80 w-full h-full object-cover block"
                  />
                </div>

                <div className=" text-white nav-p-x w-[100%] md:max-w-[80%] lg:max-w-[60%] mt-8">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl -tracking-wide lg:leading-snug md:leading-snug leading-snug font-semibold">
                    {movie.title}
                  </h1>
                  <p className="text-textlight lg:text-lg tracking-wide leading-7">
                    {truncateText(movie.overview, 110)}
                  </p>
                  <div className="flex flex-col items-stretch sm:items-center sm:flex-row gap-2 mt-8">
                    <button className="btn btn-primary rounded-xl hover:-translate-y-2 hover:shadow-[0_15px_40px_-8px_#9e61ff80] transition-all duration-300">
                      Play Now
                      <IoPlayCircleOutline size={24} />
                    </button>
                    <button className="btn border sm:border-none border-white rounded-xl hover:border-btnBgColor3 hover:text-btnBgColor3 transition-all duration-300">
                      Watch Later
                      <FaRegBookmark size={24} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="left-0 btn-carousel"
          onClick={() => setImageIndex(index - 1)}
        >
          <MdOutlineNavigateBefore size={24} color="white" />
        </button>
        <button
          className="right-0 btn-carousel"
          onClick={() => setImageIndex(index + 1)}
        >
          <MdOutlineNavigateNext size={24} color="white" />
        </button>
      </div>
    </>
  );
};

export default Hero;
