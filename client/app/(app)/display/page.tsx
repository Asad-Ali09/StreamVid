import { MoviesDisplay } from "@/sections";
import { getMovieDetails } from "@/features/moviesServices";
import { DisplayProps } from "@/types";

const MovieDisplay = async ({ searchParams }: DisplayProps) => {
  const { mediaType, id } = searchParams;

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
    <>
      <MoviesDisplay movie={data} />

      {/* Recommendations */}
      {/* <div className="nav-p-x mt-6 mb-4">
        <h1 className="text-white text-2xl tracking-tight mb-4">
          Recommendations for you
        </h1>
        <hr className="mb-5 h-[1px] bg-slate-600 text-slate-600 border-none" />

        <div className="grid grid-cols-4 gap-4">
          {result.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      </div> */}
    </>
  );
};

export default MovieDisplay;
