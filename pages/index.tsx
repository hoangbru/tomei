import { Fragment, useEffect } from "react";

import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Section from "@/components/Section";
import MovieRandom from "@/components/MovieRandom";

import { sections } from "@/constants";
import { useAppContext } from "@/hooks/useAppContext";
import { cn, getRandomElement } from "@/utils/helper";
import { SET_MOVIE } from "@/store/action";
import { maxWidth } from "@/constants/tailwindClasses";
import { useGetMovies } from "@/hooks/useGetMovies";
import Hero from "./home/_components/Hero";

const Home = () => {
  const { state, dispatch } = useAppContext();

  const { data, isLoading, error } = useGetMovies({
    path: "/movie/",
    type: "popular",
  });

  useEffect(() => {
    if (data?.results) {
      dispatch({
        type: SET_MOVIE,
        payload: data?.results,
      });
    }
  }, [data?.results]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error="Unable to fetch the movies! " />;
  }

  const randomMovie = getRandomElement(state.movies);
  const popularMovies = data?.results?.slice(0, 5);

  return (
    <Fragment>
      {/* {randomMovie && <MovieRandom movie={randomMovie} category={"movie"}/>} */}
      {popularMovies && <Hero movies={popularMovies} />}
      <div className={cn(maxWidth, "lg:mt-12 md:mt-8 sm:mt-6 xs:mt-4 mt-2")}>
        {sections.map(({ title, category, type }) => (
          <Section title={title} category={category} type={type} key={title} />
        ))}
      </div>
    </Fragment>
  );
};

export default Home;
