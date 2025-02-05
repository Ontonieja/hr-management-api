import LeftSidebar from "@/features/navigation/LeftSidebar";
import TopNavigation from "../features/navigation/TopNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[100vw] h-[100vh] lg:w-[90vw] lg:h-[95vh] relative p-4 lg:p-6 bg-white rounded-xl flex flex-col">
        <TopNavigation />
        <section className="flex flex-1 sm:mt-4 overflow-y-auto">
          <LeftSidebar />

          <main className="md:px-8 py-2 flex-1">{children}</main>
        </section>
      </div>
    </div>
  );
}
