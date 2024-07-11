import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";

const WelcomePage = () => {
  return (
    <section className="flex items-center justify-center h-screen text-white">
      <div>
        <h1 className="text-3xl font-medium uppercase mb-20 text-center">
          Welcome to Gain Cricket Battle App
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <Link to="/create-new-match">
            <Card className="bg-transparent">
              <CardContent className="p-5">
                <img
                  src="/images/cricket.png"
                  alt="cricket image"
                  className="w-11/12 mx-auto"
                />
                <h2 className="text-3xl font-semibold text-white uppercase text-center mt-5">
                  Create New Match
                </h2>
              </CardContent>
            </Card>
          </Link>
          <Link to="/see-all-players">
            <Card className="bg-transparent cursor-pointer">
              <CardContent className="p-5">
                <img
                  src="/images/cricket-player.png"
                  alt="all players"
                  className="w-11/12 mx-auto"
                />
                <h2 className="text-3xl font-semibold text-white uppercase text-center mt-5">
                  See All Players
                </h2>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
