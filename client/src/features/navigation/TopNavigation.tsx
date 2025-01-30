import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";
import { useEffect, useRef, useState, useCallback } from "react";
import avatar from "../../assets/avatar.jpg";
import AvatarWithName from "../../components/AvatarWithName";

import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function TopNavigation() {
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <section className="flex max-md:justify-between items-center text-sm gap-6 border-b pb-4 border-slate-200 mb-4">
      <Logo />
      <MobileMenu open={open} setOpen={setOpen} menuRef={menuRef} />
      <SearchBar />
      <div className="hidden md:flex">
        {user && <AvatarWithName {...user} avatar={avatar} />}
      </div>
    </section>
  );
}
