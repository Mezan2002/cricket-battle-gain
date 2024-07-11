import { addPlayer } from "../../redux/features/playersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TPlayer } from "../../types/Players";

type TPlayerProps = {
  player: TPlayer;
  cardHeight?: string;
};

const PlayerCard = ({ player }: TPlayerProps) => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.players);

  const isSinglePlayerSelected = players.some((p) => p.id === player.id);

  return (
    <div className="card" onClick={() => dispatch(addPlayer(player))}>
      <div className="content">
        <div className="back">
          <div className="back-content">
            <img
              src={
                isSinglePlayerSelected
                  ? player.imageUrl
                  : "/images/cricket-player.png"
              }
              alt=""
              className={
                isSinglePlayerSelected ? "w-full h-full" : "w-8/12 mx-auto"
              }
            />
            {isSinglePlayerSelected ? (
              ""
            ) : (
              <strong className="text-3xl">Hover Me</strong>
            )}
          </div>
        </div>

        <div className="front">
          <div className="img">
            <img
              src={player.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="front-content">
            <small className="badge">{player.handUsed}</small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong className="text-base">{player.name}</strong>
                </p>
              </div>
              <p className="card-footer text-xs">
                {player.position} &nbsp; | &nbsp; weight: {player.weight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
