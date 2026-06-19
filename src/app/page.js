import Image from "next/image";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChoseUs";
import WhatWeOffer from "./components/WhatWeOffer";
import LatestForum from "./components/LatestForum";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>

      <WhyChooseUs></WhyChooseUs>
      <WhatWeOffer></WhatWeOffer>
      <LatestForum></LatestForum>
      <Footer></Footer>
    </div>
  );
}
