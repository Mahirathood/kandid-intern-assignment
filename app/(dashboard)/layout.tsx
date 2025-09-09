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
