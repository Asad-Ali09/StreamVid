import { Hero } from "@/sections";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { MovieSlider } from "@/components";
import { movieSlides } from "@/constants";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Display Movies/TV Section */}
      <section className="nav-p-x mx-auto mt-20">
        {movieSlides.map((slide) => {
          return (
            <div key={slide.type}>
              <h2 className="text-white text-2xl font-semibold my-4">
                {slide.title}
              </h2>
              <hr className="mb-5 h-[1px] bg-slate-600 text-slate-600 border-none" />
              <MovieSlider type={slide.type} />;
            </div>
          );
        })}
      </section>
    </main>
  );
}
