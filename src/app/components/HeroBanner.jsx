"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

/**
 * HeroBanner — Fitness & Gym Management Platform
 *
 * Stack: Next.js (next/image), Tailwind CSS, HeroUI (Button), react-icons
 * Background: public/image/banner.png
 * Theme: bg-black / text-white with a single lime accent for energy
 */
export default function HeroBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/image/banner.png"
          alt="Gym members training together"
          fill
          priority
          className={`object-cover object-center transition-transform duration-[1500ms] ease-out ${
            mounted ? "scale-100" : "scale-110"
          }`}
        />
        {/* Gradient overlays for legibility + mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Noise / grid texture accent (subtle, energetic) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100vh] flex-col justify-end px-6 pb-20 pt-32 sm:px-10 sm:pb-24 lg:px-16">
        {/* Eyebrow */}
        <div
          className={`mb-5 flex items-center gap-2 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <HiSparkles className="h-4 w-4 text-lime-300" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
            Fitness &amp; Gym Management
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`max-w-4xl text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-white transition-all duration-700 ease-out sm:text-6xl lg:text-7xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          Unleash your fitness{" "}
          <span className="relative font-bold inline-block text-lime-300 not-italic">
            tribe
            <span
              className={`absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime-300 transition-transform duration-500 ease-out ${
                mounted ? "scale-x-100" : "scale-x-0"
              }`}
              style={{ transitionDelay: "550ms" }}
            />
          </span>
          .
        </h1>

        {/* Description */}
        <p
          className={`mt-6 max-w-xl text-base font-medium leading-relaxed text-white/80 transition-all duration-700 ease-out sm:text-lg ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Find the right classes, learn from expert trainers, and stay motivated
          with a community that&apos;s got your back every step of the way.
        </p>

        {/* CTAs */}
        <div
          className={`mt-9 flex flex-wrap items-center gap-4 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "320ms" }}
        >
          <Button
            size="lg"
            radius="full"
            className="group relative h-14 overflow-hidden bg-lime-300 px-8 font-bold uppercase tracking-wide text-black transition-transform duration-200 hover:scale-[1.04] active:scale-95"
            endContent={
              <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            }
          >
            Explore Classes
          </Button>

          <Button
            size="lg"
            radius="full"
            variant="bordered"
            className="group h-14 border-2 border-white/40 px-8 font-bold uppercase tracking-wide text-white transition-all duration-200 hover:scale-[1.04] hover:border-white hover:bg-white/10 active:scale-95"
            startContent={
              <FiPlay className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            }
          >
            Join Free
          </Button>
        </div>
      </div>

      {/* Bottom marquee strip — energetic motion accent */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-black/60 py-3 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span>Expert Trainers</span>
              <span className="text-lime-300">•</span>
              <span>Live Classes</span>
              <span className="text-lime-300">•</span>
              <span>Community Driven</span>
              <span className="text-lime-300">•</span>
              <span>Track Your Progress</span>
              <span className="text-lime-300">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
