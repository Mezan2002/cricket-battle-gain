import { CheckCircle } from "lucide-react";
import { useState } from "react";
import playersData from "../../../public/playersData.json";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { addPlayer } from "../../redux/features/playersSlice";
import { useAppDispatch } from "../../redux/hooks";

const CreateNewMatch = () => {
  const [isPlayerSelectionDone, setIsPlayerSelectionDone] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <section className="text-white">
      <div className="p-10">
        {isPlayerSelectionDone ? (
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
                onClick={() => setIsPlayerSelectionDone(true)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                14 Players selected
                <CheckCircle className="ml-2" size={20} />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-5">
              {playersData.map((player) => (
                <div
                  key={player.id}
                  className="group relative block bg-black cursor-pointer"
                  onClick={() => dispatch(addPlayer(player))}
                >
                  <img
                    alt={player.name}
                    src={player.imageUrl}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <div className="mt-32 sm:mt-48 lg:mt-64">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                          {player.position}
                        </p>

                        <p className="text-xl font-bold text-white sm:text-2xl">
                          {player.name}{" "}
                          <span className="text-base">({player.handUsed})</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CreateNewMatch;
