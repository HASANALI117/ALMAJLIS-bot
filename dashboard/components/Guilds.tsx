import Link from "next/link";
import Image from "next/image";
import { servers } from "../constants";
const Guilds = () => {
  return (
    <div className="mt-12 text-center">
      <h1 className="font-bold text-4xl">
        Hello, User! Please select a server to get started
      </h1>

      <div className="flex justify-center items-center flex-wrap">
        {servers.map((server) => (
          <Link
            href={`/guilds/${server.id}`}
            className="cursor-pointer w-80 m-8 bg-gray-600 rounded-lg  p-8 hover:bg-gray-500 transition"
            key={server.id}
          >
            <h1 className="font-bold text-2xl">{server.name}</h1>

            <Image
              src={`/${server.icon}`}
              alt={server.name}
              width={100}
              height={100}
              className="rounded-full mx-auto my-4 border-green-500 border-[3px]"
            ></Image>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Guilds;
