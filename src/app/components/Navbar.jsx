"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { FiMenu, FiX, FiHome, FiLayers, FiUsers } from "react-icons/fi";
import { SiOpenaigym } from "react-icons/si";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-300/20 transition-all duration-300 group-hover:bg-lime-300/30">
            <SiOpenaigym className="h-5 w-5 text-lime-300" />
          </div>
          <p className="text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-lime-300">
            FlexStack
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-white/60 transition-all duration-300 hover:text-white hover:scale-[1.05]"
            >
              <FiHome className="h-4 w-4" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/allclasses"
              className="flex items-center gap-2 text-sm font-medium text-white/60 transition-all duration-300 hover:text-white hover:scale-[1.05]"
            >
              <FiLayers className="h-4 w-4" />
              All Classes
            </Link>
          </li>
          <li>
            <Link
              href="/community"
              className="flex items-center gap-2 text-sm font-medium text-white/60 transition-all duration-300 hover:text-white hover:scale-[1.05]"
            >
              <FiUsers className="h-4 w-4" />
              Community
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        {!user && (
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/signin"
              className="text-sm font-medium text-white/60 transition-all duration-300 hover:text-white hover:scale-[1.05]"
            >
              Sign In
            </Link>
            <Link href="/signup">
              <Button className="h-10 bg-lime-300 px-6 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(132,204,22,0.3)] active:scale-95">
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        {user && (
          <div className="hidden items-center gap-4 md:flex">
            <Dropdown>
              <Dropdown.Trigger className="rounded-full">
                <Avatar
                  size="sm"
                  className="cursor-pointer ring-2 ring-lime-300/30 transition-all duration-300 hover:ring-lime-300/60"
                >
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt={user?.name}
                    src={user?.image}
                  />
                  <Avatar.Fallback className="bg-lime-300/20 text-lime-300">
                    {user?.name?.charAt(0) || "U"}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover className="bg-black border border-white/10 rounded-2xl shadow-2xl">
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar size="md" className="ring-2 ring-lime-300/30">
                      <Avatar.Image alt={user?.name} src={user?.image} />
                      <Avatar.Fallback className="bg-lime-300/20 text-lime-300">
                        {user?.name?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-white/40">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                  className="p-2"
                >
                  <Dropdown.Item
                    id="dashboard"
                    textValue="Dashboard"
                    className="rounded-xl text-white/60 transition-all duration-300 hover:bg-lime-300/10 hover:text-lime-300"
                  >
                    <Link
                      className="flex items-center gap-3"
                      href={`/dashboard/${user?.role}`}
                    >
                      <MdDashboard className="h-5 w-5" />
                      <Label className="font-medium">Dashboard</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="profile"
                    textValue="Profile"
                    className="rounded-xl text-white/60 transition-all duration-300 hover:bg-lime-300/10 hover:text-lime-300"
                  >
                    <div className="flex items-center gap-3">
                      <CgProfile className="h-5 w-5" />
                      <Label className="font-medium">Profile</Label>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    className="rounded-xl text-red-400 transition-all duration-300 hover:bg-red-500/10"
                    onClick={handleSignOut}
                  >
                    <div className="flex items-center gap-3">
                      <BiLogOut className="h-5 w-5" />
                      <Label className="font-medium">Logout</Label>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 p-4">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiHome className="h-5 w-5" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/allclasses"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiLayers className="h-5 w-5" />
                All Classes
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUsers className="h-5 w-5" />
                Community
              </Link>
            </li>

            <div className="mt-4 border-t border-white/10 pt-4">
              {!user ? (
                <>
                  <Link
                    href="/signin"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="mt-2 w-full bg-lime-300 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02]">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10"
                  >
                    <BiLogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;