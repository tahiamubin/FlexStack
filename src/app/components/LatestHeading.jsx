'use client'

import { useEffect, useState } from "react";
import { HiSparkles } from "react-icons/hi2";

const LatestHeading = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-black to-zinc-950 py-24">
      {/* heading */}
    <div className="mb-16 text-center">
  <div
    className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`}
  >
    <HiSparkles className="h-4 w-4 text-lime-300" />
    <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
      Latest from the Community
    </span>
  </div>

  <h2
    className={`max-w-3xl mx-auto text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out sm:text-5xl lg:text-6xl ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
    style={{ transitionDelay: "100ms" }}
  >
    Built for the{" "}
    <span className="relative font-bold inline-block text-lime-300 not-italic">
      community
      <span
        className={`absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime-300 transition-transform duration-500 ease-out ${
          mounted ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transitionDelay: "400ms" }}
      />
    </span>
    .
  </h2>

  <p
    className={`mt-4 max-w-2xl mx-auto text-base font-medium text-white/60 transition-all duration-700 ease-out ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
    style={{ transitionDelay: "200ms" }}
  >
    Fresh voices, real stories, and the latest conversations from athletes like you.
  </p>
</div>
    </div>
  );
};

export default LatestHeading;
