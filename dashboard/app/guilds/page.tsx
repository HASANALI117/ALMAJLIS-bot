import GuildsList from "@/components/pages/GuildsList";
import { GuildsProvider } from "@/contexts/GuildsContext";

const GuildsPage = () => {
  return (
    <GuildsProvider>
      <GuildsList />
    </GuildsProvider>
  );
};

export default GuildsPage;
