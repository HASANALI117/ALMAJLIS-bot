"use client";

// import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState(null);

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

  console.log(userData);

  const handleLogin = () => {
    window.location.href = "http://localhost:3002/auth/signin";
  };

  return (
    <div className="flex justify-center mt-20">
      {/* <Image src={"/logo.png"} alt="logo" height={200} width={200}></Image> */}
      <img
        src="/js.jpg"
        alt="logo"
        className="w-60 h-60 rounded-3xl border-4 border-white"
      />
      <div className="mx-20">
        <h1 className="font-extrabold text-5xl ">
          ALMAJLIS-bot <br /> Dashboard
        </h1>
        <p className="mt-6 text-xl">
          Serving <span className="font-extrabold">1,223,358,245</span> members
          <br />
          In <span className="font-extrabold">11,119,480</span> servers
        </p>
        <button
          onClick={handleLogin}
          className="border-[3px] rounded-full py-3 w-full mt-6 flex justify-center items-center hover:bg-gray-400 hover:text-black transition"
        >
          <i className="bx bxl-discord-alt text-2xl px-2"></i>
          Login with Discord
        </button>
      </div>
    </div>
  );
};

export default Home;
