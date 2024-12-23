import Link from "next/link";
import Image from "next/image";
import { servers } from "../../constants";

const page = () => {
  return (
    <div className="mt-8 flex justify-center text-center flex-wrap">
      {servers.map((server) => (
        <div
          key={server.id}
          className="m-8 bg-gray-400 rounded-lg w-80 p-8 hover:bg-gray-500 transition"
        >
          <Link href={`/guilds/${server.id}`} className="cursor-pointer">
            <h1 className="font-bold text-4xl">{server.name}</h1>

            <Image
              src={`/${server.icon}`}
              alt={server.name}
              width={100}
              height={100}
              className="rounded-full mx-auto my-4"
            ></Image>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default page;
