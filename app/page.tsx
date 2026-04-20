import Image from "next/image";
import BarberLandingPage from "./components/barberlandingpage";
import AboutSection from "./components/aboutsection";
import StatsTeamReviews from "./components/statsteamreview";
import GallerySection from "./components/gallerysection";
import ContactSection from "./components/contactsection";
import FooterSection from "./components/footersection";
import Services from "./components/services";
import MenuSection from "./components/menusections";
// import Header from "./components/header";
// import HeroSection from "./components/herosection";

export default function Home() {
  return (
    <div className="">
     {/* <Header/>
     <HeroSection/> */}
     <BarberLandingPage/>
     <AboutSection/>
     <GallerySection/>
     <Services/>
     <MenuSection/>
     <StatsTeamReviews/>
     <ContactSection/>
     <FooterSection/>
     
    </div>
  );
}
