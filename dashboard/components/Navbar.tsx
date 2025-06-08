"use client";

import Link from "next/link";
import Image from "next/image";
import { navigation } from "../constants";
import { useAuth } from "@/contexts";

const Navbar = () => {
  const { user, loading } = useAuth();
  console.log("user", user);

  return (
    <nav className="bg-gray-800">
      <div className="flex justify-between h-20 p-6 items-center">
        <div className="flex space-x-4">
          <Link href={"/"} className="flex justify-center items-center pr-10">
            <Image
              src={"/js.jpg"}
              alt="logo"
              width={60}
              height={50}
              className="rounded-full w-14 h-14"
            />
            <h1 className="pl-4 font-bold">ALMAJLIS</h1>
          </Link>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-2 flex justify-center items-center hover:text-slate-500 transition"
            >
              <i className={`bx ${item.icon} pr-2 text-lg`}></i>
              {item.name}
            </a>
          ))}
        </div>

        <div>
          {loading ? null : user ? (
            <div className="flex justify-center items-center">
              <img
                src={`https://cdn.discordapp.com/avatars/${user.userID}/${user.avatar}.png`}
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
              <h1 className="text-xl pl-4">{user.username}</h1>
            </div>
          ) : (
            <a
              href="http://localhost:8080/auth/signin"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
