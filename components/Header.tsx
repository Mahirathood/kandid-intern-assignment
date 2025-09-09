"use client";

import { usePathname } from "next/navigation";

const breadcrumbs = {
  "/dashboard": "Dashboard",
  "/leads": "Leads",
  "/campaigns": "Campaigns",
  "/settings": "Settings",
};

export default function Header() {
  const pathname = usePathname();
  const label = (breadcrumbs as any)[pathname] || "Dashboard";

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 border-b dark:border-gray-700">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{label}</h1>
    </header>
  );
}
