import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import ServicesSection from "../../components/sections/ServicesSection";
import CredentialsBanner from "../../components/sections/CredentialsBanner";
import KvFreightHero from "../../components/sections/KvFreightHero";
import AboutSection from "../../components/sections/AboutSection";
import ContactSection from "../../components/sections/ContactSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <CredentialsBanner />
      <KvFreightHero />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default Home;
