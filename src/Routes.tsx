import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { BASE_NAME } from "./constants/api";
import Layout from "./components/layout/Layout";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import WhyChooseUs from "./pages/why-choose-us";
import Contact from "./pages/contact";
import { store } from "./redux/store";

function AppRoutes() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={BASE_NAME}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default AppRoutes;
