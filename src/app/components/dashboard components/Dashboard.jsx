"use client";
import { useState } from "react";
import { Button, Drawer } from "@heroui/react";
import { House, Search, Bell, Mail, User, Settings, Menu } from "lucide-react";

const navItems = [
  { icon: House, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

function NavList() {
  return (
    <nav className="flex flex-col gap-1 p-2">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
 const recruiterNavKinks = [
    { icon: Circles4Square, label: "Dashboard", href: "/dashboard/recruiter" },
    {
      icon: Factory,
      label: "My Company",
      href: "/dashboard/recruiter/company",
    },
    {
      icon: Envelope,
      label: "Add Job",
      href: "/dashboard/recruiter/jobs/new",
    },
    {
      icon: Briefcase,
      label: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
    },

    { icon: Gear, label: "Settings", href: "/dashboard/recruiter/company" },
  ];

const navLinksMap ={
  seeker: seekerNavLinks,
  recruiter: recruiterNavKinks,
  admin: adminNavLinks,
}
const navItems = navLinksMap[user?.role || 'seeker']

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* lg+: persistent sidebar, no button */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-default shrink-0">
        <div className="px-4 py-3 text-sm font-medium text-muted-foreground">
          Navigation
        </div>
        <NavList />
      </aside>

      {/* sm/md: topbar with menu button + drawer */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex lg:hidden items-center gap-3 border-b border-default px-4 py-3">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            onPress={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </Button>
          <span className="text-sm font-medium">Dashboard</span>
        </header>

        {/* sm/md drawer */}
        <Drawer
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          placement="left"
          className="lg:hidden"
        >
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="p-0">
              <NavList />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {/* your page content here */}
        </main>
      </div>
    </div>
  );
}
