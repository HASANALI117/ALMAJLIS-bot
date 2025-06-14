import Dashboard from "@/components/Dashboard";

const page = async ({ params }: { params: { guildId: string } }) => {
  const { guildId } = params;

  return <Dashboard guildId={guildId} />;
};

export default page;
