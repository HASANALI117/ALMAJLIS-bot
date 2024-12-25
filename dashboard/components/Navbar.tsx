"use client";

import Link from "next/link";
import Image from "next/image";
import { navigation } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  userID: string;
  username: string;
  avatar: string;
};
const Navbar = () => {
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/dashboard", {
          withCredentials: true,
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="flex justify-between h-24 p-6 items-center">
        <div className="flex space-x-4">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" width={60} height={50} />
          </Link>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="p-4 flex justify-center items-center hover:text-slate-500 transition"
            >
              <i className={`bx ${item.icon} pr-2 text-lg`}></i>
              {item.name}
            </a>
          ))}
        </div>

        <div>
          {userData ? (
            <div className="flex justify-center items-center">
              <img
                src={`https://cdn.discordapp.com/avatars/${userData.userID}/${userData.avatar}.png`}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <h1 className="text-xl pl-4">{userData.username}</h1>
            </div>
          ) : (
            <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
