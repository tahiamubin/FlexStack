import Image from "next/image";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
     <HeroBanner></HeroBanner>
     <Footer></Footer>
    </div>
  );
}
