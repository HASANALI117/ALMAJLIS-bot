import Dashboard from "@/components/Dashboard";
import { AuthProvider } from "@/contexts";

const page = async ({ params }: { params: { guildId: string } }) => {
  const { guildId } = params;

  return (
    <AuthProvider>
      <Dashboard guildId={guildId} />
    </AuthProvider>
  );
};

export default page;
