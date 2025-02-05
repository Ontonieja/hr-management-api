import { Bell, Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center relative justify-between gap-4 flex-1 border-r border-slate-200 text-sm min-h-full px-8 ">
      <input
        type="text"
        placeholder="Search something..."
        className="w-full focus:outline-none text-sm"
      />
      <Search className="text-light_gray w-5 h-5 absolute left-0" />
      <Bell className="w-5 h-5 cursor-pointer hover:text-primary_purple hover:scale-105 transition ease-in-out duration-200 text-dark_gray" />
    </div>
  );
}
