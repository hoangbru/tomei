import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import HeroSlide from "./HeroSlide";

const Hero = ({ movies }: { movies: IMovie[] }) => {
  return (
    <div
      className="mySwiper lg:h-screen sm:h-[640px] xs:h-[520px] h-[460px] w-full"
      // loop={true}
      // slidesPerView={1}
      // autoplay={{
      //   delay: 10000,
      //   disableOnInteraction: false,
      // }}
      // modules={[Autoplay]}
    >
      {movies.map((movie) => (
        <div
          key={movie.id}
          style={{
            backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-full w-full"
        >
          <HeroSlide movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default Hero;