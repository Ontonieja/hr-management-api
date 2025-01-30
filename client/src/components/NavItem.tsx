interface NavItemProps {
  icon: string;
  text: string;
  href: string;
}

export default function NavItem({ icon, text, href }: NavItemProps) {
  return (
    <a href={href} className="flex items-center gap-1">
      <img src={icon} alt={text} className="size-6" />
      {text}
    </a>
  );
}
