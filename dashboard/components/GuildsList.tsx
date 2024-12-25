"use client";

import Link from "next/link";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { useSetAtom, useAtom } from "jotai";
import { userAtom, fetchGuildsAtom, guildsAtom } from "@/atoms/userAtoms";

const GuildsList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchGuildsList = useSetAtom(fetchGuildsAtom);

  useEffect(() => {
    const fetchData = async () => {
      await fetchGuildsList();
      setIsLoading(false);
    };

    fetchData();
  }, [fetchGuildsList]);

  const [userData] = useAtom(userAtom);
  const [guilds] = useAtom(guildsAtom);

  if (isLoading) {
    return (
      <div className="mt-12 text-center">
        <i className="bx bx-loader-alt bx-spin text-5xl text-white"></i>
      </div>
    );
  }

  if (!guilds.length) {
    return (
      <div className="mt-12 text-center">
        <p className="text-white text-4xl">No guilds found.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 text-center">
      <h1 className="font-bold text-4xl">
        Hello, {userData?.username}! Please select a server to get started
      </h1>

      <div className="flex justify-center items-center flex-wrap">
        {guilds.map((guild) => (
          <Link
            href={`/guilds/${guild.id}`}
            className="cursor-pointer w-80 m-8 bg-gray-600 rounded-lg  p-8 hover:bg-gray-500 transition"
            key={guild.id}
          >
            <h1 className="font-bold text-2xl truncate">{guild.name}</h1>

            {/* <Image
              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256`}
              alt={guild.name}
              width={100}
              height={100}
              className="rounded-full mx-auto my-4 border-green-500 border-[3px]"
            ></Image> */}

            <img
              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256`}
              alt={guild.name}
              className="rounded-full mx-auto my-4 border-green-500 border-[3px] h-28 w-28"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GuildsList;
