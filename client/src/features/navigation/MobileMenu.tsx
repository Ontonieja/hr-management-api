import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";
import NavItems from "../../components/NavItems";
import AvatarWithName from "../../components/AvatarWithName";
import avatar from "../../assets/avatar.jpg";

import classNames from "classnames";

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

export default function MobileMenu({
  open,
  setOpen,
  menuRef,
}: MobileMenuProps) {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <div
        ref={menuRef}
        className={classNames(
          "fixed h-full top-0 right-0 w-1/2 bg-white shadow-xl z-50 transition-transform ease-in-out duration-200 px-2 py-4",
          { "translate-x-0": open, "translate-x-full": !open }
        )}
      >
        <div className="flex flex-col h-full">
          <X onClick={() => setOpen(!open)} />
          <div className="mt-4 flex-1">
            <NavItems />
          </div>
          <div className="mt-auto">
            {user && <AvatarWithName {...user} avatar={avatar} />}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Menu onClick={() => setOpen(!open)} />
      </div>
    </>
  );
}
