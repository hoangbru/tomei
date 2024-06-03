import React from "react";
import Link from "next/link";

import { cn } from "@/utils/helper";
import Image from "next/image";

interface LogoProps {
  className?: string;
  logoColor?: string;
}

const Logo = ({
  className = "",
  logoColor = "text-black dark:text-primary",
}: LogoProps) => (
  <Link
    href="/"
    className={cn(`flex flex-row items-center xs:gap-2 gap-[6px])`, className)}
  >
    <Image
      src={"./assets/svg/tmovie.svg"}
      alt="logo"
      width={50}
      height={50}
      className="sm:h-[28px] h-[24px] sm:w-[28px] w-[24px]"
    />
    <span
      className={cn(logoColor, `font-semibold sm:text-[18px] text-[16.75px]`)}
    >
      Tomei
    </span>
  </Link>
);

export default Logo;
