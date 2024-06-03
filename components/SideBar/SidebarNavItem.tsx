import Link from "next/link";

import { listItem, activeListItem } from "@/constants/tailwindClasses";
import { cn } from "@/utils/helper";
import { useRouter } from "next/router";

interface SidebarNavItemProps {
  link: INavLink;
  closeSideBar: () => void;
}

const SidebarNavItem = ({ link, closeSideBar }: SidebarNavItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === link.path;
  
  return (
    <li>
      <Link
        href={link.path}
        className={cn(listItem, isActive && activeListItem)}
        onClick={closeSideBar}
      >
        {<link.icon className="text-[18px]" />}
        <span>{link.title}</span>
      </Link>
    </li>
  );
};

export default SidebarNavItem;
