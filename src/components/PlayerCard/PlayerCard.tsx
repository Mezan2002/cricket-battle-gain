import { addPlayer } from "../../redux/features/playersSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TPlayer } from "../../types/Players";

type TPlayerProps = {
  player: TPlayer;
  cardHeight?: string;
};

const PlayerCard = ({ player }: TPlayerProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="card" onClick={() => dispatch(addPlayer(player))}>
      <div className="content">
        <div className="back">
          <div className="back-content">
            <img
              src="../../../src/assets/images/cricket-player.png"
              alt=""
              className="w-8/12 mx-auto"
            />
            <strong className="text-3xl">Hover Me</strong>
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
              <p className="card-footer">30 Mins &nbsp; | &nbsp; 1 Serving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
{
  // basic card with hover
  /* <div
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
    </div> */
}

{
  // right corner image
  {
    /* <div
      className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-36 before:rounded-t-2xl before:bg-gradient-to-bl from-[#0052D4] via-[#4364F7] to-[#6FB1FC] before:absolute before:top-0 w-80 h-72 relative bg-transparent border flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden"
      onClick={() => dispatch(addPlayer(player))}
    >
      <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500 overflow-hidden ">
        <img src={player.imageUrl} alt="" />
      </div>
      <div className="z-10 group-hover:-translate-y-5 transition-all duration-500 text-white">
        <span className="text-2xl font-semibold ">{player.name}</span>
        <p>{player.position}</p>
      </div>
    </div> */
  }
}
