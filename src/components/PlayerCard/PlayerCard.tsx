import { TPlayer } from "../../types/Players";

type TPlayerProps = {
  player: TPlayer;
};

const PlayerCard = ({ player }: TPlayerProps) => {
  return (
    <div className="group relative block bg-black h-96 cursor-pointer">
      <img
        alt={player.name}
        src="/src/assets/images/mezanur_rahman.png"
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-blue-500">
          {player.position}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">
          {player.name} <span className="text-base">({player.handUsed})</span>
        </p>
      </div>
    </div>
  );
};

export default PlayerCard;
