import { BellIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="w-full h-12 border-b-2 flex justify-end items-center px-8">
      <span className="w-6 h-6">
        <BellIcon />
      </span>
      <div className="w-[1px] bg-gray-300 h-6 mx-4"></div>
    </div>
  );
};

export default Header;
