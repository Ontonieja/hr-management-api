import LeftSidebar from "@/features/navigation/LeftSidebar";
import TopNavigation from "../features/navigation/TopNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[100vw] h-[100vh] lg:w-[90vw] lg:h-[95vh] relative p-4 lg:p-8 bg-white rounded-xl flex flex-col">
        <TopNavigation />
        <div className="flex flex-1 sm:mt-4 md:mt-6 xl:mt-8 overflow-y-auto">
          <LeftSidebar />

          <main className="md:pl-4 lg:pl-8  y-2 flex-1 relative w-full h-full max-w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
