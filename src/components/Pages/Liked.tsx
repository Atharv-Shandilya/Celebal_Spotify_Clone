import { MoveLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";
import ApplicationStore from "../../store/Application-store";
import Card from "../UI/Card";

export default () => {
  const likedTracks = ApplicationStore((state) => state.likedTracks);
  const likedPlaylist = ApplicationStore((state) => state.likedPlaylist);

  return (
    <article>
      <nav className="flex gap-x-4 items-center mb-[40px]">
        <NavLink to={"/"} className={"mr-10"}>
          <MoveLeft />
        </NavLink>
        <span className="opacity-60">Discovery</span>
        <ChevronRight height={16} width={16} />
        <span>Trending Playlists</span>
      </nav>
      <h2 className="text-3xl mb-10">Liked Playlist</h2>
      <section className="grid grid-cols-5 gap-y-10 ">
        {Object.keys(likedPlaylist).map((id) => {
          return (
            <NavLink to={`/playlists/${id}`}>
              <Card curr={likedPlaylist[id]} image={2} />
            </NavLink>
          );
        })}
      </section>
    </article>
  );
};
