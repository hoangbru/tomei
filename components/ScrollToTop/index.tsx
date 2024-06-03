import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
