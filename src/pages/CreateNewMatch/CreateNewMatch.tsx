import { ArrowLeftCircle, ArrowRightCircle, CheckCircle } from "lucide-react";
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
  const [selectedPlayers, setSelectedPlayers] = useState<TPlayer[]>([]);

  const playerList = playersData;
  const isNoData =
    selectedPlayers.length === 0 &&
    teamAlpha.length === 0 &&
    teamBeta.length === 0;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const items = Array.from(
        source.droppableId === "playerList"
          ? selectedPlayers
          : source.droppableId === "teamAlpha"
          ? teamAlpha
          : teamBeta
      );
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);

      if (source.droppableId === "playerList") {
        setSelectedPlayers(items);
      } else if (source.droppableId === "teamAlpha") {
        setTeamAlpha(items);
      } else if (source.droppableId === "teamBeta") {
        setTeamBeta(items);
      }
    } else {
      // Moving between different lists
      const sourceClone = Array.from(
        source.droppableId === "playerList"
          ? selectedPlayers
          : source.droppableId === "teamAlpha"
          ? teamAlpha
          : teamBeta
      );
      const destClone = Array.from(
        destination.droppableId === "playerList"
          ? selectedPlayers
          : destination.droppableId === "teamAlpha"
          ? teamAlpha
          : teamBeta
      );

      const [removed] = sourceClone.splice(source.index, 1);
      destClone.splice(destination.index, 0, removed);

      if (source.droppableId === "playerList") {
        setSelectedPlayers(sourceClone);
      } else if (source.droppableId === "teamAlpha") {
        setTeamAlpha(sourceClone);
      } else if (source.droppableId === "teamBeta") {
        setTeamBeta(sourceClone);
      }

      if (destination.droppableId === "playerList") {
        setSelectedPlayers(destClone);
      } else if (destination.droppableId === "teamAlpha") {
        setTeamAlpha(destClone);
      } else if (destination.droppableId === "teamBeta") {
        setTeamBeta(destClone);
      }
    }
  };

  const togglePlayerSelection = (player: TPlayer) => {
    if (selectedPlayers.some((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleRemovePlayer = (id: string) => {
    setSelectedPlayers(selectedPlayers.filter((player) => player.id !== id));
    setTeamAlpha(teamAlpha.filter((player) => player.id !== id));
    setTeamBeta(teamBeta.filter((player) => player.id !== id));
  };

  const handleGoBack = () => {
    if (stage === "team_creation") {
      setStage("player_selection");
    } else if (stage === "confirm_teams") {
      setStage("team_creation");
    }
  };

  const handleGotoNext = () => {
    if (stage === "player_selection") {
      setStage("team_creation");
    } else if (stage === "team_creation") {
      setStage("confirm_teams");
    }
  };

  return (
    <section className="text-white">
      <div className="p-10">
        {stage === "player_selection" && (
          <>
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl font-semibold">Please select players:</h1>
              {selectedPlayers.length !== 0 && (
                <Button
                  onClick={handleGotoNext}
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
              {playerList.map((player) => (
                <div
                  key={player.id}
                  onClick={() => togglePlayerSelection(player)}
                >
                  <PlayerCard player={player} />
                </div>
              ))}
            </div>
          </>
        )}

        {stage === "team_creation" && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-3xl font-semibold">Create a new match</h1>
              <Button
                className="bg-[#4D8DFF] duration-500 hover:bg-blue-600"
                onClick={isNoData ? handleGoBack : handleGotoNext}
              >
                {isNoData ? (
                  <p className="flex items-center">
                    <ArrowLeftCircle className="mr-2" size={20} /> Go Back
                  </p>
                ) : (
                  <p className="flex items-center">
                    Go Next
                    <ArrowRightCircle className="ml-2" size={20} />
                  </p>
                )}
              </Button>
            </div>
            {isNoData ? (
              <p className="flex items-center justify-center h-[60vh]">
                No Data Found!
              </p>
            ) : (
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
                          {selectedPlayers.map((player, index) => (
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
                                  <PlayersListCard
                                    player={player}
                                    onRemove={handleRemovePlayer}
                                  />
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
                                <PlayersListCard
                                  player={player}
                                  onRemove={handleRemovePlayer}
                                />
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
                                <PlayersListCard
                                  player={player}
                                  onRemove={handleRemovePlayer}
                                />
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
            )}
          </div>
        )}

        {stage === "confirm_teams" && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-3xl font-semibold">Confirm Teams</h1>
              <Button
                className="bg-[#4D8DFF] duration-500 hover:bg-blue-600"
                onClick={handleGoBack}
              >
                <p className="flex items-center">
                  <ArrowLeftCircle className="mr-2" size={20} /> Go Back
                </p>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h6 className="font-bold text-lg mb-4">Team Alpha</h6>
                <div
                  className="border h-max min-h-[40rem] relative"
                  style={{
                    backgroundImage: "url('/images/BDCricket.png')",
                    backgroundPosition: "right",
                    opacity: "1",
                  }}
                >
                  <div className="absolute w-full h-full bg-black opacity-50 z-20" />
                  <div className="z-30 flex flex-row items-end">
                    <img
                      src="/images/captain.png"
                      alt=""
                      className="w-fit h-fit"
                    />
                    <p className="text-3xl font-medium absolute bottom-3 left-7 bg-black p-3 rounded-2xl bg-opacity-70">
                      Mashrafi Bin Mortaza
                    </p>
                  </div>
                  {/* {teamAlpha.map((player) => (
                    <div key={player.id}>
                      <PlayersListCard player={player} onRemove={() => {}} />
                    </div>
                  ))} */}
                </div>
              </div>
              <div>
                <h6 className="font-bold text-lg mb-4">Team Beta</h6>
                {teamBeta.map((player) => (
                  <div key={player.id}>
                    <PlayersListCard player={player} onRemove={() => {}} />
                  </div>
                ))}
              </div>
            </div>
            <Button className="mt-5 bg-[#4D8DFF] duration-500 hover:bg-blue-600">
              Confirm Teams
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateNewMatch;
