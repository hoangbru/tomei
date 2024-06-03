import { memo } from 'react';
import { m } from "framer-motion";

import { useGlobalContext } from "@/context/globalContext";
import { mainHeading, maxWidth, paragraph, watchBtn } from "@/constants/tailwindClasses";
import { cn } from "@/utils/helper";
import { useMotion } from "@/hooks/useMotion";
import { useRouter } from 'next/navigation';
import Poster from '@/components/Poster';

const HeroSlide = ({ movie }: { movie: IMovie }) => {
  const { getTrailerId, setIsModalOpen } = useGlobalContext();
  const router = useRouter();
  const { fadeDown, staggerContainer } = useMotion();

  const {
    overview,
    original_title: title,
    poster_path: posterPath,
    id,
  } = movie;

  const showTrailer = () => {
    getTrailerId(id);
    setIsModalOpen(true);
  };

  const handleWatchNow = () => {
    router.push(`/detail/movie/${id}`);
  };

  return (
    <div
      className={cn(
        maxWidth,
        ` mx-8 flex items-center h-full flex-row lg:gap-32 sm:gap-20`
      )}
    >
      <m.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        animate="show"
        className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[420px] font-nunito flex flex-col sm:gap-5 xs:gap-3 gap-[10px] sm:mb-8"
      >
        <m.h2 variants={fadeDown} className={cn(mainHeading, `text-4xl font-semibold`)}>
          {title}
        </m.h2>
        <m.p variants={fadeDown} className={paragraph}>
          {overview.length > 180 ? `${overview.substring(0, 180)}...` : overview}
        </m.p>
        <m.div
          variants={fadeDown}
          className="flex flex-row items-center  gap-4 sm:mt-6 xs:mt-5 mt-[18px] "
        >
          <button
            type="button"
            name="watch-trailer"
            className={cn(watchBtn, `px-4 py-2 text-shadow watch-trailer`)}
            onClick={showTrailer}
          >
            Watch trailer
          </button>
          <button
            type="button"
            name="watch-now"
            className={cn(
              watchBtn,
              `px-4 py-2 bg-[#ff0000] shadow-glow
             text-shadow text-secColor `
            )}
            onClick={handleWatchNow}
          >
            Watch now
          </button>
        </m.div>
      </m.div>

      <Poster title={title} posterPath={posterPath} className="mr-auto" />
    </div>
  );
};

export default memo(HeroSlide);
