import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Header from "./Header";
import Footer from "./Footer";
import { springSoft } from "../motion/Reveal";

const Layout = () => {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AnimatePresence>
        {!isHome && (
          <motion.div
            key="site-header"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={springSoft}
            className="sticky top-0 z-50"
          >
            <Header />
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
