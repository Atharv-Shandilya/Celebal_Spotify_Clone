import { MoveLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";
import ApplicationStore from "../../store/Application-store";
import Card from "../UI/Card";

export default () => {
  const trendingPlaylists = ApplicationStore(
    (state) => state.trendingPlaylists
  );
  return (
    <article className="overflow-scroll">
      <nav className="flex gap-x-4 items-center mb-[40px]">
        <NavLink to={"/"} className={"mr-10"}>
          <MoveLeft />
        </NavLink>
        <span className="opacity-60">Discovery</span>
        <ChevronRight height={16} width={16} />
        <span>Trending Playlists</span>
      </nav>
      <h2 className="text-3xl mb-10">Trending Tracks</h2>
      <section className="grid grid-cols-5 gap-y-10 ">
        {trendingPlaylists.map((curr) => {
          return (
            <NavLink to={`/playlists/${curr.playlistId}`}>
              <Card curr={curr} image={2} />
            </NavLink>
          );
        })}
      </section>
    </article>
  );
};
