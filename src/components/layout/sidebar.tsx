import { UsersIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const links = [
  {
    icon: <UsersIcon />,
    text: "Chat",
    href: "/chat",
  },
  {
    icon: <Cog6ToothIcon />,
    text: "Settings",
    href: "/settings",
  },
];

const Sidebar = () => {
  return (
    <div className="w-60 h-full bg-[#4f46e5] p-3">
      <div className="p-2 mb-4"></div>
      <div className="flex gap-2 flex-col">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              to={link.href}
              className="flex flex-row gap-4 p-2 w-full rounded text-white text-opacity-60 hover:bg-[#4338ca] hover:text-opacity-100"
            >
              <span className="w-6 h-6">{link.icon}</span> {link.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
