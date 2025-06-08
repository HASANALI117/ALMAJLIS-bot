import GuildsList from "@/components/GuildsList";
import { AuthProvider } from "@/contexts/AuthContext";
import { GuildsProvider } from "@/contexts/GuildsContext";

const page = () => {
  return (
    <AuthProvider>
      <GuildsProvider>
        <GuildsList />
      </GuildsProvider>
    </AuthProvider>
  );
};

export default page;
