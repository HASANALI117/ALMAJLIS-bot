import Image from "next/image";
import { navigation } from "../constants";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="flex justify-between h-32 p-6 items-center">
        <div className="flex space-x-4">
          <Image src={"/logo.png"} alt="logo" width={60} height={50} />
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="p-4">
              {item.name}
            </a>
          ))}
        </div>

        <div className="">
          <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
