

"use client";

import { useUIStore } from "@/lib/zustand-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Leads", href: "/leads" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const pathname = usePathname();

  return (
    <aside
      className={`${
        sidebarCollapsed ? "w-16" : "w-64"
      } bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 font-bold text-lg truncate">
        {!sidebarCollapsed && "Linkbird.ai"}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              } flex items-center px-3 py-2 text-sm rounded-md transition`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t dark:border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-between"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <span className={!sidebarCollapsed ? "block" : "hidden"}>Logout</span>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-20 right-[-12px] z-50 bg-gray-200 dark:bg-gray-700 p-1 rounded-r-md text-xs"
      >
        {sidebarCollapsed ? ">" : "<"}
      </button>
    </aside>
  );
}
