import Link from "next/link";
import { useRouter } from "next/router";

import { textColor } from "@/constants/tailwindClasses";
import { cn } from "@/utils/helper";

interface HeaderProps {
  link: { title: string; path: string };
  isNotFoundPage: boolean;
  showBg: boolean;
}

const HeaderNavItem = ({ link, showBg, isNotFoundPage }: HeaderProps) => {
  const router = useRouter();
  const isActive = router.pathname === link.path;

  return (
    <li>
      <Link
        href={link.path}
        className={cn(
          "nav-link",
          isActive
            ? ` active ${showBg ? textColor : `text-secColor`}`
            : ` ${
                isNotFoundPage || showBg
                  ? "text-[#444] dark:text-gray-300 dark:hover:text-secColor hover:text-black"
                  : "text-gray-300 hover:text-secColor"
              }`
        )}
      >
        {link.title}
      </Link>
    </li>
  );
};

export default HeaderNavItem;
