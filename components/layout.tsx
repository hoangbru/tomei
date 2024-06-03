import { Fragment, ReactNode, Suspense } from "react";

import VideoModal from "./VideoModal";
import SideBar from "./SideBar";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import Loader from "./Loader";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <VideoModal />
      <SideBar />
      <Header />
      <main
        className={`className="dark:bg-black bg-mainColor lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0"`}
      >
        <ScrollToTop>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ScrollToTop>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
