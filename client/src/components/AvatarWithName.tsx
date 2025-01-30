import { ChevronsUpDown } from "lucide-react";

interface AvatarWithNameProps {
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
};

export default function AvatarWithName({
  firstName,
  lastName,
  avatar,
  role,
}: AvatarWithNameProps) {
  return (
    <div className="flex gap-3 items-center">
      <img src={avatar} className="size-8 rounded-full"></img>
      <div className="flex-col">
        <h2 className="font-extrabold">{`${firstName} ${lastName}`}</h2>
        <span className="text-light_gray">
          {role ? capitalizeFirstLetter(role) : ""}
        </span>
      </div>
      <ChevronsUpDown className="size-5 text-dark_gray cursor-pointer" />
    </div>
  );
}
