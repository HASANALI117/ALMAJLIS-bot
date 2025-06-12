"use client";

import Link from "next/link";
import Image from "next/image";
import { navigation } from "../utils/constants";
import { useAuth } from "@/contexts";

const Navbar = ({ guild }: { guild: any }) => {
  const { user, loading } = useAuth();
  console.log("guild in Navbar:", guild);

  return (
    <nav className="bg-gray-800 flex justify-between h-18 p-6 items-center">
      <div className="flex space-x-4">
        <Link href={"/"} className="flex justify-center items-center pr-10">
          <Image
            src={"/js.jpg"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-lg border-[2px] border-white"
          />
          <h1 className="pl-2 font-bold">ALMAJLIS-BOT</h1>
        </Link>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-1 flex justify-center items-center hover:text-slate-500 transition"
          >
            <i className={`bx ${item.icon} pr-2 text-lg`}></i>
            {item.name}
          </Link>
        ))}
      </div>

      <div>
        {loading ? null : user ? (
          <div className="flex justify-center items-center">
            {/* Guild */}
            <div className="flex justify-center items-center px-4">
              <Image
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
                width={40}
                height={40}
              ></Image>
              <h1 className="text-xl pl-2">{guild.name}</h1>
            </div>

            {/* User */}
            <div className="flex justify-center items-center px-4">
              <Image
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
                width={40}
                height={40}
              ></Image>
              <h1 className="text-xl pl-2">{user.global_name}</h1>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
