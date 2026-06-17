import Image from "next/image";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChoseUs";
import WhatWeOffer from "./components/WhatWeOffer";

export default function Home() {
  return (
    <div>
     <HeroBanner></HeroBanner>
     <WhyChooseUs></WhyChooseUs>
     <WhatWeOffer></WhatWeOffer>
     <Footer></Footer>
    </div>
  );
}
