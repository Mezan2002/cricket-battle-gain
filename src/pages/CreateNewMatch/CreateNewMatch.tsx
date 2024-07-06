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
                <div>
                  <div className="space-y-3">
                    {players.map((player) => (
                      <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-gray-700 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
                        <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500 overflow-hidden ">
                          <img src={player.imageUrl} alt="" />
                        </div>
                        <div className="z-10 group-hover:-translate-y-5 transition-all duration-500">
                          <span className="text-2xl font-semibold text-black">
                            {player.name}
                          </span>
                          <p className="text-black">{player.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
              {players.length !== 0 && (
                <Button
                  onClick={() => setStage("creating_new_match")}
                  className="bg-[#4D8DFF] duration-500 hover:bg-blue-600"
                >
                  {players.length <= 9 ? `0${players.length}` : players.length}{" "}
                  Players selected
                  <CheckCircle className="ml-2" size={20} />
                </Button>
              )}
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
