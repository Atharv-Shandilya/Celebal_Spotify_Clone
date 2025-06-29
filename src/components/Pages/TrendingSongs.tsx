import { MoveLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";
import ApplicationStore from "../../store/Application-store";
import Card from "../UI/Card";

export default () => {
  const trendingSongs = ApplicationStore((state) => state.trendingSongs);

  return (
    <article className="overflow-scroll">
      <nav className="flex gap-x-4 items-center mb-[40px]">
        <NavLink to={"/"} className={"mr-10"}>
          <MoveLeft />
        </NavLink>
        <span className="opacity-60">Discovery</span>
        <ChevronRight height={16} width={16} />
        <span>Trending Tracks</span>
      </nav>
      <h2 className="text-3xl mb-10">Trending Tracks</h2>
      <section className="grid grid-cols-5  gap-y-10 mx-auto ">
        {trendingSongs.map((curr) => {
          return <Card curr={curr} isTrack />;
        })}
      </section>
    </article>
  );
};
