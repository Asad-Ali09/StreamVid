import {
  getMovieDetails,
  isShow,
} from "@/store/features/movies/moviesServices";
import { WatchProps, searchParams } from "@/types";
import React from "react";

const episodes = 19;

const getMovieWatchLink = (params: searchParams) => {
  const { mediaType, id, episode, season } = params;
  const baseUrl = process.env.MOVIE_API;

  if (mediaType == "movie") {
    return `${baseUrl}/movie/${id}`;
  }

  let url = `${baseUrl}/tv/${id}-`;
  url + season ? `${season}-` : "1-";
  url + episode ? `${episode}` : "1";

  return url;
};

const Watch = async ({ searchParams }: WatchProps) => {
  const { mediaType, id, episode, season } = searchParams;

  // TODO: Create Error Component
  if (id === undefined || mediaType === undefined) {
    console.log({ id, mediaType });
    return <div className="text-white">Error 404</div>;
  }

  let data = await getMovieDetails({ id, mediaType });

  if (!data) {
    console.log("No data found");
    return <div>Error 404</div>;
  }

  return (
    <div className="px-20">
      <section className="w-full py-40">
        <div className="p-1">{isShow(data) ? data.name : data.title}</div>
        <div className="max-h-[650px]">
          <div className="grid grid-cols-8">
            {/* Left Bar */}
            <div className="col-span-2 max-h-[650px] bg-[#161934] h-full overflow-auto">
              <h3 className="py-2 px-4 text-sm font-semibold tracking-tight leading-tight">
                List of Episodes
              </h3>
              {isShow(data) && (
                <ol>
                  {Array.from(
                    Array(data.seasons[season || 1].episode_count),
                    (_, i) => (
                      <li
                        className="text-textlight px-4 py-2 cursor-pointer even:bg-[#161934] odd:bg-slate-800"
                        key={i}
                      >
                        Episode {i + 1}
                      </li>
                    )
                  )}
                </ol>
              )}
            </div>

            {/* Video Container */}
            {/* Player */}
            <div className="max-h-[650px] col-span-6 bg-[#161934] overflow-auto">
              <div className="w-full relative h-0 overflow-hidden pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full bg-black"
                  src={getMovieWatchLink({ mediaType, id, episode, season })}
                ></iframe>
              </div>

              {isShow(data) && (
                <div className="grid grid-cols-4 justify-items-stretch row-span-1 gap-2 p-2">
                  {data.seasons.map((season, index) => {
                    return index == 0 ? null : (
                      <div
                        key={season.season_number}
                        className="h-20 text-center text-sm flex justify-center items-center p-2 bg-primary rounded-lg "
                      >
                        {season.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TODO: ADD comment section */}
    </div>
  );
};
export default Watch;
