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
      <main className="dark:bg-black bg-mainColor ">
        <ScrollToTop>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ScrollToTop>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
