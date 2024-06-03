import { FC, forwardRef } from "react";
import { maxWidth } from "@/constants/tailwindClasses";
import { cn } from "@/utils/helper";

interface StreamProps {
  id: string;
}

const Stream = forwardRef<HTMLElement, StreamProps>(({ id }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        maxWidth,
        ` flex flex-col lg:gap-16 md:gap-14 sm:gap-12 xs:gap-10 gap-8 lg:py-24 md:py-16 sm:py-12 xs:py-10 py-8`
      )}
    >
      <div className="sm:w-[80%] w-[90%] mx-auto flex flex-col md:gap-2 sm:gap-[6px] xs:gap-1 gap-[2px]">
        <div className="w-[100%] lg:h-[480px] md:h-[420px] sm:h-[320px] h-[210px] rounded-md mx-auto shadow-lg">
          <iframe
            src={`https://www.2embed.org/embed/movie/${id}`}
            title="trailer"
            width="100%"
            height="100%"
            className="rounded-md"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
});

export default Stream;
