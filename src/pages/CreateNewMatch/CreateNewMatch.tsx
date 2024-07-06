import { CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import playersData from "../../../public/playersData.json";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import PlayersListCard from "../../components/PlayersListCard/PlayersListCard";
import { Button } from "../../components/ui/button";
import { TPlayer } from "../../types/Players";

const CreateNewMatch = () => {
  const [stage, setStage] = useState("player_selection");
  const [teamAlpha, setTeamAlpha] = useState<TPlayer[]>([]);
  const [teamBeta, setTeamBeta] = useState<TPlayer[]>([]);
  const [playerList, setPlayerList] = useState<TPlayer[]>(playersData); // Managing players locally
  const [selectedPlayers, setSelectedPlayers] = useState<TPlayer[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    }

    const sourceClone = Array.from(
      source.droppableId === "playerList"
        ? playerList
        : source.droppableId === "teamAlpha"
        ? teamAlpha
        : teamBeta
    );
    const destClone = Array.from(
      destination.droppableId === "playerList"
        ? playerList
        : destination.droppableId === "teamAlpha"
        ? teamAlpha
        : teamBeta
    );

    const [removed] = sourceClone.splice(source.index, 1);
    destClone.splice(destination.index, 0, removed);

    if (source.droppableId === "playerList") {
      setPlayerList(sourceClone);
    } else if (source.droppableId === "teamAlpha") {
      setTeamAlpha(sourceClone);
    } else if (source.droppableId === "teamBeta") {
      setTeamBeta(sourceClone);
    }

    if (destination.droppableId === "playerList") {
      setPlayerList(destClone);
    } else if (destination.droppableId === "teamAlpha") {
      setTeamAlpha(destClone);
    } else if (destination.droppableId === "teamBeta") {
      setTeamBeta(destClone);
    }
  };

  /* const togglePlayerSelection = (player: TPlayer) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  }; */

  return (
    <section className="text-white">
      <div className="p-10">
        {stage === "creating_new_match" ? (
          <>
            <h1 className="text-3xl font-semibold mb-5">Create a new match</h1>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <h6 className="font-bold text-lg mb-4">Player List</h6>
                  <Droppable droppableId="playerList">
                    {(provided) => (
                      <div
                        className="space-y-5"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {playerList.map((player, index) => (
                          <Draggable
                            key={player.id}
                            draggableId={player.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <PlayersListCard player={player} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <Droppable droppableId="teamAlpha">
                  {(provided) => (
                    <div
                      className="space-x-5 space-y-5"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <h6 className="font-bold text-lg">Team Alpha</h6>
                      {teamAlpha.map((player, index) => (
                        <Draggable
                          key={player.id}
                          draggableId={player.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <PlayersListCard player={player} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId="teamBeta">
                  {(provided) => (
                    <div
                      className="space-x-5 space-y-5"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <h6 className="font-bold text-lg">Team Beta</h6>
                      {teamBeta.map((player, index) => (
                        <Draggable
                          key={player.id}
                          draggableId={player.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <PlayersListCard player={player} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl font-semibold">Please select players:</h1>
              {playerList.length !== 0 && (
                <Button
                  onClick={() => setStage("creating_new_match")}
                  className="bg-[#4D8DFF] duration-500 hover:bg-blue-600"
                >
                  {selectedPlayers.length <= 9
                    ? `0${selectedPlayers.length}`
                    : selectedPlayers.length}{" "}
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
