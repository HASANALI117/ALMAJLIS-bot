import GuildsList from "@/components/GuildsList";
import { GuildsProvider } from "@/contexts/GuildsContext";

const page = () => {
  return (
    <GuildsProvider>
      <GuildsList />
    </GuildsProvider>
  );
};

export default page;
