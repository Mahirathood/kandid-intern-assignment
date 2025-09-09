
// // app/(protected)/layout.tsx
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth-options";
// import Sidebar from "@/components/Sidebar";

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // Check if logged in
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     redirect("/login"); // 🔒 redirect if not logged in
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       <Sidebar />
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }
