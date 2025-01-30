import LeftSidebar from "@/features/navigation/LeftSidebar";
import TopNavigation from "../features/navigation/TopNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[100vw] h-[100vh] lg:w-[90vw] lg:h-[90vh] relative p-4 lg:p-6 bg-white rounded-xl">
        <TopNavigation />
        <div className="flex">
          <LeftSidebar />
          <main className="px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
