import BotSettings from "@/components/BotSettings";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <Menu />
        <BotSettings />
      </div>
    </main>
  );
};

export default Home;
