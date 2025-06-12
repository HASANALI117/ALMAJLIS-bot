"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useGuilds } from "@/contexts/index";

const GuildsList = () => {
  const { guilds, loading } = useGuilds();

  const handleInvite = async (guildId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/dashboard/invite-bot/${guildId}`,
        { withCredentials: true }
      );

      window.location.href = response.data.inviteURL;
    } catch (error) {
      console.error("Error inviting bot:", error);
    }
  };

  if (loading) {
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
      <h1 className="font-bold text-4xl">Select a server</h1>

      <div className="flex justify-center items-center flex-wrap">
        {guilds.map((guild) => (
          <Link
            href={`/dashboard/${guild.id}`}
            className="cursor-pointer w-80 m-8 bg-gray-600 rounded-lg  p-8 hover:bg-gray-500 transition"
            key={guild.id}
            // onClick={() => handleInvite(guild.id)}
          >
            <h1 className="font-bold text-2xl truncate">{guild.name}</h1>

            <Image
              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
              alt={guild.name}
              width={100}
              height={100}
              className="rounded-full mx-auto my-4 border-green-500 border-[3px] h-28 w-28"
            ></Image>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GuildsList;
