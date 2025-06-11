import Dashboard from "@/components/Dashboard";

const page = ({ params }: { params: { guildID: string } }) => {
  return (
    <>
      <Dashboard guildId={params.guildID} />
    </>
  );
};

export default page;
