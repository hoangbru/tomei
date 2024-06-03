import { ElementRef, Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { m } from "framer-motion";

import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Section from "@/components/Section";
import Poster from "@/components/Poster";
import { Genre, Casts, Stream, Videos } from "../../_components";

import { mainHeading, maxWidth, paragraph } from "@/constants/tailwindClasses";
import { useGetMovieDetail } from "@/hooks/useGetMovieDetail";
import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/utils/helper";

const Detail = () => {
  const { category, id } = useParams();
  const streamRef = useRef<ElementRef<"section">>(null);
  const [show, setShow] = useState<Boolean>(false);
  const { fadeDown, staggerContainer } = useMotion();

  const {
    data: movie,
    isLoading,
    error,
  } = useGetMovieDetail({
    path: "/",
    params: `${category}/${id}`,
    q: "&append_to_response=videos,credits",
  });

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  useEffect(() => {
    document.title = movie?.title && !isLoading ? movie?.title : "Tomei";

    return () => {
      document.title = "Tomei";
    };
  }, [movie?.title, isLoading, movie?.name]);

  const toggleShow = () => setShow((prev) => !prev);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error="Something went wrong!" />;
  }

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${movie?.poster_path}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  };

  return (
    <>
      {movie && (
        <Fragment>
          <section className="w-full" style={backgroundStyle}>
            <div
              className={`${maxWidth} lg:py-36 sm:py-[136px] sm:pb-28 xs:py-28 xs:pb-12 pt-24 pb-8 flex flex-row lg:gap-12 md:gap-10 gap-8 justify-center `}
            >
              <Poster title={movie?.title} posterPath={movie?.poster_path} />
              <m.div
                variants={staggerContainer(0.2, 0.4)}
                initial="hidden"
                animate="show"
                className="text-gray-300 sm:max-w-[80vw] max-w-[90vw] md:max-w-[520px] font-nunito flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1"
              >
                <m.h2
                  variants={fadeDown}
                  className={cn(
                    mainHeading,
                    "text-2xl font-semibold md:max-w-[420px]"
                  )}
                >
                  {movie?.title}
                </m.h2>

                <m.ul
                  variants={fadeDown}
                  className="flex flex-row items-center  sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap"
                >
                  {movie?.genres?.map((genre: { name: string; id: number }) => {
                    return <Genre key={genre.id} name={genre.name} />;
                  })}
                </m.ul>

                <m.p variants={fadeDown} className={paragraph}>
                  <span>
                    {movie?.overview?.length > 280
                      ? `${
                          show
                            ? movie?.overview
                            : `${movie?.overview?.slice(0, 280)}...`
                        }`
                      : movie?.overview}
                  </span>
                  <button
                    type="button"
                    className={cn(
                      `font-bold ml-1 hover:underline transition-all duration-300`,
                      movie?.overview?.length > 280 ? "inline-block" : "hidden"
                    )}
                    onClick={toggleShow}
                  >
                    {!show ? "show more" : "show less"}
                  </button>
                </m.p>

                <Casts casts={movie?.credits?.cast || []} />
              </m.div>
            </div>
          </section>

          <Stream id={movie?.id} ref={streamRef} />
          {/* <Videos videos={movie?.videos?.results} /> */}

          <Section
            title={`Similar ${category === "movie" ? "movies" : "series"}`}
            category={String(category)}
            className={`${maxWidth}`}
            id={Number(id)}
            showSimilarShows
          />
        </Fragment>
      )}
    </>
  );
};

export default Detail;
