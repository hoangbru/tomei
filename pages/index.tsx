import { Fragment, useEffect, useState } from "react";

import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Section from "@/components/Section";
import Hero from "./home/_components/Hero";

import { maxWidth } from "@/constants/tailwindClasses";
import { sections } from "@/constants";
import { cn, getRandomElement } from "@/utils/helper";
import { useGetMovies } from "@/hooks/useGetMovies";
import { useAppContext } from "@/hooks/useAppContext";
import MovieRandom from "@/components/MovieRandom";
import { SET_MOVIE } from "@/store/action";

const Home = () => {
  const { state, dispatch } = useAppContext();
  // const [popularMovies, setPopularMovies] = useState<IMovie[]>(state.movies);

  const { data, isLoading, error } = useGetMovies({
    path: "/movie/popular",
    q: `?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  });

  useEffect(() => {
    if (data?.result) {
      dispatch({
        type: SET_MOVIE,
        payload: data?.result,
      });
    }
  }, [data?.result]);

  // useEffect(() => {
  //   setPopularMovies(state.movies?.slice(0, 5));
  // }, [data?.results]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error="Unable to fetch the movies! " />;
  }

  // const popularMovies = state.movies.slice(0, 5);

  console.log(state);
  return;

  const randomMovie = getRandomElement(state.movies);

  return (
    <Fragment>
      {/* <Hero movies={popularMovies} /> */}
      <MovieRandom movie={randomMovie} />
      <div className={cn(maxWidth, "lg:mt-12 md:mt-8 sm:mt-6 xs:mt-4 mt-2")}>
        {sections.map(({ title, category, type }) => (
          <Section title={title} category={category} type={type} key={title} />
        ))}
      </div>
    </Fragment>
  );
};

export default Home;
