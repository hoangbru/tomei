import { useState, useEffect } from "react";

import { smallMaxWidth } from "@/constants/tailwindClasses";
import MovieCard from "@/components/MovieCard";
import { useGetMovies } from "@/hooks/useGetMovies";
import { useParams, useSearchParams } from "next/navigation";
import Search from "./_components/Search";
import { SkeletonLoader } from "@/components/Loader";

const Catalog = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<IMovie[]>([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState<boolean>(false);
  const query = useSearchParams();
  const { category } = useParams();

  const type = query.get("type") || "popular";
  const searchQuery = query.get("search") || "";

  const { data, isLoading } = useGetMovies({
    path: `/search/${category}`,
    type,
    q: `&query=${searchQuery}&page=${page}`,
  });

  useEffect(() => {
    setPage(1);
    setIsCategoryChanged(true);
  }, [category, searchQuery]);

  useEffect(() => {
    if (isLoading) return;

    if (data?.results) {
      if (page > 1) {
        setShows((prev) => [...prev, ...data.results]);
      } else {
        setShows([...data.results]);
        setIsCategoryChanged(false);
      }
    }
  }, [data, isLoading, page]);

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.075), rgba(0,0,0,0.075)), url('./assets/images/footer-bg.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="lg:h-[140px] md:h-[132px] sm:h-[114px] h-[96px] relative"
      >
        <h2 className="text-white font-nunito capitalize font-semibold md:text-xl sm:text-lg absolute md:top-[70%] sm:top-[65%] xs:top-[60%] top-[57.75%]  left-1/2 -translate-x-1/2  ">
          {category === "movie" ? "movies" : "TV series"}
        </h2>
      </div>
      <section className={`${smallMaxWidth} `}>
        <Search setQuery={setQuery} />

        {isLoading || isCategoryChanged ? (
          <SkeletonLoader isMoviesSliderLoader={false} />
        ) : (
          <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center">
            {shows?.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
              >
                <MovieCard movie={movie} category={String(category)} />
              </div>
            ))}
          </div>
        )}

        {isLoading && !isCategoryChanged ? (
          <SkeletonLoader
            isMoviesSliderLoader={false}
            className="md:pt-8 sm:pt-7 pt-6"
          />
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={isLoading}
              className="sm:py-2 xs:py-[6px] py-1 sm:px-4 xs:px-3 px-[10.75px] bg-[#ff0000] text-gray-50 rounded-full md:text-[15.25px] sm:text-[14.75px] xs:text-[14px] text-[12.75px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito lg:my-8 my-7"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Catalog;
