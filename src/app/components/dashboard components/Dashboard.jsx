"use client";

import { useState, useEffect } from "react";
import { Button, Drawer } from "@heroui/react";
import { 
  FiMenu, 
  FiGrid, 
  FiCalendar, 
  FiHeart, 
  FiUserPlus, 
  FiSettings,
  FiPlusCircle,
  FiFileText,
  FiBookOpen,
  FiUsers,
  FiCheckCircle,
  FiBriefcase,
  FiClipboard,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

// Member navigation links
const memberNavLinks = [
  { icon: FiGrid, label: "Overview", href: "/dashboard/member" },
  { icon: FiCalendar, label: "Booked Classes", href: "/dashboard/member/bookings" },
  { icon: FiHeart, label: "Favorites", href: "/dashboard/member/favorites" },
  { icon: FiUserPlus, label: "Apply as Trainer", href: "/dashboard/member/apply-trainer" },
  { icon: FiSettings, label: "Settings", href: "/dashboard/member/settings" },
];

// Trainer navigation links
const trainerNavLinks = [
  { icon: FiGrid, label: "Overview", href: "/dashboard/trainer" },
  { icon: FiPlusCircle, label: "Add Classes", href: "/dashboard/trainer/add-class" },
  { icon: FiFileText, label: "Add Forum Post", href: "/dashboard/trainer/forum-post" },
  { icon: FiBookOpen, label: "My Posts", href: "/dashboard/trainer/my-posts" },
  { icon: FiSettings, label: "Settings", href: "/dashboard/trainer/settings" },
];

// Admin navigation links
const adminNavLinks = [
  { icon: FiGrid, label: "Overview", href: "/dashboard/admin" },
  { icon: FiUsers, label: "Manage Users", href: "/dashboard/admin/users" },
  { icon: FiCheckCircle, label: "Trainer Applications", href: "/dashboard/admin/applications" },
  { icon: FiBriefcase, label: "Manage Classes", href: "/dashboard/admin/classes" },
  { icon: FiFileText, label: "Add Forum Post", href: "/dashboard/admin/add-forum" },
  { icon: FiClipboard, label: "Forum Posts", href: "/dashboard/admin/forum-posts" },
  { icon: FiSettings, label: "Settings", href: "/dashboard/admin/settings" },
];

// Map roles to their respective nav links
const navLinksMap = {
  member: memberNavLinks,
  trainer: trainerNavLinks,
  admin: adminNavLinks,
};

// NavList Component
function NavList() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "member";
  const [activeIndex, setActiveIndex] = useState(0);

  // Get nav items based on role
  const navItems = navLinksMap[role] || memberNavLinks;

  return (
    <nav className="flex flex-col gap-1 p-2">
      {/* Role Badge */}
      <div className="mb-3 flex items-center gap-2 rounded-xl bg-lime-300/10 px-3 py-2 border border-lime-300/20">
        <HiSparkles className="h-3 w-3 text-lime-300" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-300">
          {role} Dashboard
        </span>
      </div>

      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;

        return (
          <button
            key={item.label}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ease-out ${
              isActive
                ? "bg-lime-300/20 text-lime-300 border border-lime-300/30"
                : "text-white/60 hover:bg-white/5 hover:text-white hover:scale-[1.02]"
            }`}
            type="button"
          >
            <Icon 
              className={`size-5 transition-all duration-300 ${
                isActive 
                  ? "text-lime-300 scale-110" 
                  : "text-white/40 group-hover:text-white"
              }`} 
            />
            <span className="font-medium">{item.label}</span>
            {isActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-lime-300 animate-pulse" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// Main Dashboard Component - ADDED children prop
export function Dashboard({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black">
      {/* lg+: persistent sidebar, no button */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-black/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/20">
            <HiSparkles className="h-5 w-5 text-lime-300" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-tight text-white">
              FlexStack
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-lime-300">
              Dashboard
            </p>
          </div>
        </div>
        <NavList />
      </aside>

      {/* sm/md: topbar with menu button + drawer */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex lg:hidden items-center justify-between border-b border-white/10 bg-black/50 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <FiMenu className="size-5" />
            </Button>
            <span className="text-sm font-bold uppercase tracking-tight text-white">
              FitHub
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <FiBell className="size-4" />
            </Button>
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <FiUser className="size-4" />
            </Button>
          </div>
        </header>

        {/* sm/md drawer */}
        <Drawer
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          placement="left"
          className="lg:hidden"
          classNames={{
            backdrop: "bg-black/80 backdrop-blur-sm",
            base: "bg-black border-r border-white/10",
          }}
        >
          <Drawer.Content className="bg-black">
            <Drawer.Header className="border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/20">
                  <HiSparkles className="h-5 w-5 text-lime-300" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-white">
                    FitHub
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-lime-300">
                    Navigation
                  </p>
                </div>
              </div>
            </Drawer.Header>
            <Drawer.Body className="p-0">
              <NavList />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>

        {/* Main content - ADDED children here */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-b from-black to-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;