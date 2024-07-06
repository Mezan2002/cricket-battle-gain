import { X } from "lucide-react";
import { removePlayer } from "../../redux/features/playersSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TPlayer } from "../../types/Players";

type TPlayerProps = {
  player: TPlayer;
  cardHeight?: string;
};
const PlayersListCard = ({ player }: TPlayerProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-2 justify-start p-2 h-full bg-gray-800 rounded-2xl border cursor-pointer relative">
      <p
        onClick={() => dispatch(removePlayer(player.id))}
        className="rounded-full absolute -right-2 -top-2 p-1 bg-red-600 text-white hover:bg-red-700"
      >
        <X className="size-3.5" />
      </p>
      <div>
        <img
          src={player?.imageUrl}
          className="rounded-lg h-24 w-28"
          alt={player?.name}
        />
      </div>
      <div className="w-full text-white">
        <div className="flex">
          <p className="text-lg font-bold">{player?.name}</p>
        </div>
        <p className="p text-sm font-light">Position: {player?.position}</p>
        <p className="p text-sm font-light">Hand Use: {player?.handUsed}</p>
        <p className="p text-sm font-light">weight: {player?.weight}</p>
      </div>
    </div>
  );
};

export default PlayersListCard;
