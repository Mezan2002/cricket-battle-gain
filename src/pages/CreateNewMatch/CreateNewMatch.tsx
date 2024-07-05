import { CheckCircle } from "lucide-react";
import { useState } from "react";
import playersData from "../../../public/playersData.json";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { Button } from "../../components/ui/button";
import { useAppSelector } from "../../redux/hooks";

const CreateNewMatch = () => {
  const [stage, setStage] = useState("player_selection");
  const { players } = useAppSelector((state) => state.players);
  console.log("🚀 ~ CreateNewMatch ~ players:", players);

  return (
    <section className="text-white">
      <div className="p-10">
        {stage === "creating_new_match" ? (
          <>
            {" "}
            <h1 className="text-3xl font-semibold mb-5">Create a new match</h1>
            <div className="grid grid-cols-3 gap-5">
              <div className="">
                <h6 className="font-bold text-lg">Player List</h6>
                <div className="grid grid-cols-3 gap-3">
                  {players.map((player) => (
                    <PlayerCard player={player} cardHeight="h-[200px]" />
                  ))}
                </div>
              </div>
              <div className="border-r">
                <h6 className="font-bold text-lg">Team Alpha</h6>
              </div>
              <div className="border-r">
                <h6 className="font-bold text-lg">Team Beta</h6>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl font-semibold">Please select players:</h1>
              <Button
                onClick={() => setStage("creating_new_match")}
                className="bg-[#4D8DFF] duration-500 hover:bg-blue-600"
              >
                14 Players selected
                <CheckCircle className="ml-2" size={20} />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-5">
              {playersData.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CreateNewMatch;
