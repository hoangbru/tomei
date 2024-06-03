import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import MovieCard from "../MovieCard";

interface MoviesSlidesProps {
  movies: IMovie[];
  category: string;
}

const MoviesSlides: FC<MoviesSlidesProps> = ({ movies, category }) => (
  <Swiper
    slidesPerView="auto"
    loop={true}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    modules={[Autoplay]}
    spaceBetween={15}
    className="mySwiper"
  >
    {movies?.map((movie) => {
      return (
        <SwiperSlide
          key={movie?.id}
          className="flex mt-1 flex-col xs:gap-[14px] gap-2 max-w-[170px] rounded-lg"
        >
          <MovieCard movie={movie} category={category} />
        </SwiperSlide>
      );
    })}
  </Swiper>
);

export default MoviesSlides;
