"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiArrowUpRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

/**
 * Footer — Fitness & Gym Management Platform
 *
 * Stack: Next.js (Link), Tailwind CSS, HeroUI (Button), react-icons
 * Theme: bg-black / text-white with lime accent — matches HeroBanner
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const exploreLinks = [
    { label: "Classes", href: "/classes" },
    { label: "Trainers", href: "/trainers" },
    { label: "Schedule", href: "/schedule" },
    { label: "Membership", href: "/membership" },
  ];

  const companyLinks = [
    { label: "About us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Community", href: "/community" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
  ];

  const socials = [
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      {/* Subtle grid texture to match hero */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* CTA strip */}
      <div className="relative z-10 border-b border-white/10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <HiSparkles className="h-4 w-4 text-lime-300" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                Ready when you are
              </span>
            </div>
            <h2 className="max-w-xl text-4xl font-black uppercase italic leading-[0.95] tracking-tight sm:text-5xl">
              Your tribe is{" "}
              <span className="text-lime-300 not-italic">waiting</span>.
            </h2>
          </div>

          <Button
            size="lg"
            radius="full"
            className="group relative h-14 shrink-0 overflow-hidden bg-lime-300 px-8 font-bold uppercase tracking-wide text-black transition-transform duration-200 hover:scale-[1.04] active:scale-95"
            endContent={
              <FiArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            }
          >
            Join Free
          </Button>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative z-10 px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <span className="text-xl font-black uppercase italic tracking-tight">
              Fit<span className="text-lime-300">Tribe</span>
            </span>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-white/60">
              Classes, trainers, and a community that keeps you moving.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-white/80 transition-colors duration-200 hover:text-lime-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime-300 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-white/80 transition-colors duration-200 hover:text-lime-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime-300 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-white/80 transition-colors duration-200 hover:text-lime-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime-300 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-xs text-white/40 sm:flex-row sm:px-10 lg:px-16">
        <p>© {year} FitTribe. All rights reserved.</p>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-200 hover:scale-110 hover:border-lime-300 hover:text-lime-300 active:scale-95"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}