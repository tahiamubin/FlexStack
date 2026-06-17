"use client";

import { useEffect, useState, useRef } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Mouse movement handler for parallax
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    // Scroll handler for parallax
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = 1 - rect.top / window.innerHeight;
      setScrollY(Math.max(0, Math.min(1, scrollProgress)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax values
  const parallaxX = mousePosition.x * 20;
  const parallaxY = mousePosition.y * 20;
  const imageScale = 1 + scrollY * 0.05;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] overflow-hidden bg-black"
    >
      {/* Background image with enhanced parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translate(${parallaxX * 0.1}px, ${parallaxY * 0.1}px) scale(${imageScale})`,
        }}
      >
        <Image
          src="/image/banner.png"
          alt="Gym members training together"
          fill
          priority
          className={`object-cover object-center transition-all duration-[2000ms] ease-out ${
            mounted ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          style={{
            transitionProperty: "transform, opacity",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        
        {/* Animated gradient overlays */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 transition-all duration-1000 ease-out"
          style={{
            background: `linear-gradient(to top, 
              rgba(0,0,0,${0.8 + scrollY * 0.2}) 0%, 
              rgba(0,0,0,${0.5 + scrollY * 0.1}) 50%, 
              rgba(0,0,0,${0.2 - scrollY * 0.1}) 100%)`,
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"
          style={{
            opacity: 0.8 + scrollY * 0.2,
          }}
        />
      </div>

      {/* Animated noise/grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none animate-pulse-slow"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = 2 + Math.random() * 4;
          const duration = 15 + Math.random() * 20;
          const delay = Math.random() * 10;
          const x = Math.random() * 100;
          
          return (
            <div
              key={i}
              className="absolute rounded-full bg-lime-300/20 animate-float"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                bottom: '-10%',
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity: 0.1 + Math.random() * 0.2,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100vh] flex-col justify-end px-6 pb-20 pt-32 sm:px-10 sm:pb-24 lg:px-16">
        {/* Eyebrow with enhanced animation */}
        <div
          className={`mb-5 flex items-center gap-2 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <HiSparkles className="h-4 w-4 text-lime-300 animate-sparkle" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
            Fitness &amp; Gym Management
          </span>
        </div>

        {/* Headline with stagger animation */}
        <h1
          className={`max-w-4xl text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-white transition-all duration-700 ease-out sm:text-6xl lg:text-7xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "100ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          Unleash your fitness{" "}
          <span className="relative font-bold inline-block text-lime-300 not-italic">
            tribe
            <span
              className={`absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime-300 transition-transform duration-500 ease-out ${
                mounted ? "scale-x-100" : "scale-x-0"
              }`}
              style={{ 
                transitionDelay: "550ms",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </span>
          .
        </h1>

        {/* Description with parallax */}
        <p
          className={`mt-6 max-w-xl text-base font-medium leading-relaxed text-white/80 transition-all duration-700 ease-out sm:text-lg ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "200ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: mounted 
              ? `translate(${parallaxX * 0.05}px, ${parallaxY * 0.05}px)` 
              : "translateY(40px)",
          }}
        >
          Find the right classes, learn from expert trainers, and stay motivated
          with a community that&apos;s got your back every step of the way.
        </p>

        {/* CTAs with hover animations */}
        <div
          className={`mt-9 flex flex-wrap items-center gap-4 transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "320ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <Button
            size="lg"
            radius="full"
            className="group relative h-14 overflow-hidden bg-lime-300 px-8 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.05] active:scale-95 hover:shadow-[0_0_40px_rgba(132,204,22,0.3)]"
            endContent={
              <FiArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            }
          >
            <span className="relative z-10">Explore Classes</span>
            <span className="absolute inset-0 bg-gradient-to-r from-lime-200 to-lime-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-0 bg-lime-300/20 blur-xl transition-all duration-300 group-hover:scale-150" />
          </Button>

          <Button
            size="lg"
            radius="full"
            variant="bordered"
            className="group h-14 border-2 border-white/40 px-8 font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.05] hover:border-white hover:bg-white/10 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            startContent={
              <FiPlay className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-lime-300" />
            }
          >
            Join Free
          </Button>
        </div>
      </div>

      {/* Enhanced bottom marquee */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-black/60 py-3 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Expert Trainers</span>
              <span className="text-lime-300 animate-pulse">•</span>
              <span className="transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Live Classes</span>
              <span className="text-lime-300 animate-pulse">•</span>
              <span className="transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Community Driven</span>
              <span className="text-lime-300 animate-pulse">•</span>
              <span className="transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Track Your Progress</span>
              <span className="text-lime-300 animate-pulse">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}