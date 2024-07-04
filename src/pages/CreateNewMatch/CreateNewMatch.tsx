import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { Button } from "../../components/ui/button";
import { CheckCircle } from "lucide-react";
import playersData from "../../../public/playersData.json";

const CreateNewMatch = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handlePlayerSelected = () => {
    setSelectedPlayers([]);
  };

  return (
    <section className="text-white">
      <div className="p-10">
        {selectedPlayers.length !== 0 ? (
          <>
            {" "}
            <h1 className="text-3xl font-semibold mb-5">Create a new match</h1>
            <div className="grid grid-cols-2 gap-5">
              <Card className="bg-transparent text-white">
                <CardContent className="p-10">
                  <h2 className="text-xl font-bold text-center">Team Alpha</h2>
                </CardContent>
              </Card>
              <Card className="bg-transparent text-white">
                <CardContent className="p-10">
                  <h2 className="text-xl font-bold text-center">Team Beta</h2>
                </CardContent>
              </Card>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl font-semibold">Please select players:</h1>
              <Button
                onClick={() => handlePlayerSelected()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                14 Players selected
                <CheckCircle className="ml-2" size={20} />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-5">
              {playersData.map((player) => (
                <PlayerCard player={player} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CreateNewMatch;
