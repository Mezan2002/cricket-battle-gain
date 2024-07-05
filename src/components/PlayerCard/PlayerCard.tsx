import { addPlayer } from "../../redux/features/playersSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TPlayer } from "../../types/Players";

type TPlayerProps = {
  player: TPlayer;
  cardHeight?: string;
};

const PlayerCard = ({ player, cardHeight = "h-[400px]" }: TPlayerProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`group relative block bg-black cursor-pointer ${cardHeight}`}
      onClick={() => dispatch(addPlayer(player))}
    >
      <img
        alt={player.name}
        src={player.imageUrl}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="mt-32 sm:mt-48 lg:mt-72">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm font-medium uppercase tracking-widest text-[#4D8DFF]">
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
  );
};

export default PlayerCard;
