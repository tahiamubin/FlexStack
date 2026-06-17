"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FiCalendar, FiUsers } from "react-icons/fi";

import {

  FiAward,
  FiBarChart2,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

/**
 * WhyChooseUs — Key platform features without images
 *
 * Stack: Next.js, Tailwind CSS, HeroUI, react-icons
 * Theme: Matches HeroBanner (black/lime accent)
 */
export default function WhyChooseUs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    // {
    //   icon: FiDumbbell,
    //   title: "Expert-Led Workouts",
    //   description: "Access 500+ on-demand classes from certified trainers across 20+ fitness disciplines.",
    // },
    {
      icon: FiUsers,
      title: "Community Challenges",
      description:
        "Compete with friends and members worldwide in monthly fitness challenges with real rewards.",
    },
    {
      icon: FiCalendar,
      title: "Smart Scheduling",
      description:
        "AI-powered class recommendations that adapt to your fitness level and recovery patterns.",
    },
    {
      icon: FiBarChart2,
      title: "Progress Analytics",
      description:
        "Detailed insights with 30+ metrics, progress photos, and personalized performance dashboards.",
    },
    {
      icon: FiAward,
      title: "Certification Hub",
      description:
        "Earn industry-recognized badges and certificates as you level up your fitness journey.",
    },
    {
      icon: FiHeart,
      title: "Wellness Integration",
      description:
        "Sync with wearables and get holistic health insights combining fitness, sleep, and nutrition.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black py-24">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #84cc16 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient accents */}
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div
            className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <HiSparkles className="h-4 w-4 text-lime-300" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              Why Choose Us
            </span>
          </div>

          <h2
            className={`max-w-3xl mx-auto text-2xl font-bold uppercase  tracking-tight text-white transition-all duration-700 ease-out sm:text-5xl lg:text-6xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Built for the{" "}
            <span className="relative font-bold inline-block text-lime-300 not-italic">
              modern athlete
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
            Everything you need to transform your fitness journey in one
            powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const delay = 150 + index * 100;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:scale-[1.02] hover:border-lime-300/50 hover:bg-white/10 ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-lime-300/0 via-lime-300/5 to-lime-300/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-xl bg-lime-300/10 p-3 text-lime-300 transition-colors duration-300 group-hover:bg-lime-300/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-medium leading-relaxed text-white/60">
                    {feature.description}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-4 h-[2px] w-12 bg-lime-300/30 transition-all duration-300 group-hover:w-20 group-hover:bg-lime-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <Button
            size="lg"
            radius="full"
            className="group h-14 bg-lime-300 px-10 font-bold uppercase tracking-wide text-black transition-all duration-200 hover:scale-[1.04] active:scale-95"
            endContent={
              <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            }
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
