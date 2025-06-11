"use client";

import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex justify-center mt-20">
      <Image
        src={"/js.jpg"}
        alt="logo"
        height={200}
        width={200}
        className="w-60 h-60 rounded-3xl border-4 border-white"
      ></Image>

      <div className="mx-20">
        <h1 className="font-extrabold text-5xl ">
          ALMAJLIS-bot <br /> Dashboard
        </h1>
        <p className="mt-6 text-xl">
          Serving <span className="font-extrabold">1,223,358,245</span> members
          <br />
          In <span className="font-extrabold">11,119,480</span> servers
        </p>

        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/discord`}
          className="border-[3px] rounded-full py-3 w-full mt-6 flex justify-center items-center hover:bg-gray-400 hover:text-black transition"
        >
          <i className="bx bxl-discord-alt text-2xl px-2"></i>
          Login with Discord
        </Link>
      </div>
    </div>
  );
};

export default Home;
