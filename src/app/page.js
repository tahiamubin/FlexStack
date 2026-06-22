import Image from "next/image";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChoseUs";
import WhatWeOffer from "./components/WhatWeOffer";
import LatestForum from "./components/LatestForum";
import LatestClasses from "./components/LatestClasses";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <LatestForum></LatestForum>
      <LatestClasses></LatestClasses>
      <WhyChooseUs></WhyChooseUs>
      <WhatWeOffer></WhatWeOffer>

      <Footer></Footer>
    </div>
  );
}
