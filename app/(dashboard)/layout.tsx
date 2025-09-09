import Sidebar from "@/components/Sidebar";

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}




// "use client";

// import { usePathname } from "next/navigation";
// import Sidebar from "@/components/Sidebar";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   const noSidebarRoutes = ["/login", "/register"];
//   const hideSidebar = noSidebarRoutes.includes(pathname);

//   return (
//     <html lang="en">
//       <body className="flex min-h-screen bg-gray-900 text-white">
//         {!hideSidebar && <Sidebar />}
//         <main className="flex-1 p-8">{children}</main>
//       </body>
//     </html>
//   );
// }