import { useEffect, useState } from "react";

import ApplicationStore from "../../store/Application-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Genre, Mood } from "../../types/global";
import { NavLink } from "react-router";
import Tag from "../UI/Tag";
import Card from "../UI/Card";
import Loading from "../UI/Loading";
export default () => {
  const trendingSongs = ApplicationStore((state) => state.trendingSongs);
  const trendingPlaylists = ApplicationStore(
    (state) => state.trendingPlaylists
  );

  const getForHomePage = ApplicationStore((state) => state.getForHomePage);
  const moods = ApplicationStore((state) => state.moods);
  const genre = ApplicationStore((state) => state.genre);
  const loading = ApplicationStore((state) => state.loading);

  useEffect(() => {
    if (trendingSongs) getForHomePage();
  }, []);

  const [mg, setmg] = useState(1);

  return (
    <article className=" flex-1 overflow-scroll no-scroll">
      <article className="mb-[80px]">
        <section>
          <div className="flex items-center justify-between ">
            <h2 className="mb-6 text-3xl  font-medium">Trending Songs</h2>
            <NavLink to={"/tracks/trending"}>Show All</NavLink>
          </div>

          <section className="grid grid-cols-5  mx-auto ">
            {!loading &&
              trendingSongs
                .filter((_, i) => i < 5)
                .map((curr) => {
                  return <Card curr={curr} isTrack key={curr.id} />;
                })}

            {loading && Array.from({ length: 5 }).map(() => <Loading />)}
          </section>
        </section>
      </article>
      <article className="mb-[80px]">
        <section>
          <div className="flex items-center justify-between ">
            <h2 className="mb-6 text-3xl  font-medium">Trending Playlists</h2>
            <NavLink to={"/playlists/trending"}>Show All</NavLink>
          </div>

          <section className="grid grid-cols-5 gap-5 ">
            {!loading &&
              trendingPlaylists
                .filter((_, i) => i < 5)
                .map((curr) => {
                  return (
                    <NavLink to={`/playlists/${curr.id}`} key={curr.id}>
                      <Card curr={curr} image={2} />
                    </NavLink>
                  );
                })}
            {loading && Array.from({ length: 5 }).map(() => <Loading />)}
          </section>
        </section>
      </article>
      <article className="mb-10">
        <div className="flex items-center justify-between">
          <h2 className="mb-6 text-3xl  font-medium">Moods & Genres</h2>
          <div className="flex items-center">
            <span className="flex items-center mr-6 gap-x-4">
              <button
                disabled={mg == 1}
                onClick={() => setmg(1)}
                className={`${mg == 1 ? "opacity-10" : ""} cursor-pointer`}
              >
                <ChevronLeft />
              </button>
              <button
                disabled={mg == 2}
                onClick={() => setmg(2)}
                className={`${mg == 2 ? "opacity-10" : ""} cursor-pointer`}
              >
                <ChevronRight />
              </button>
            </span>

            <NavLink to={"/categories"}>Show All</NavLink>
          </div>
        </div>

        <section className="grid grid-cols-5 gap-3">
          {mg == 1 &&
            Object.keys(moods)
              .filter((v) => v != null)
              .map((curr) => {
                const colour = `${moods[curr as Mood]}`;
                return <Tag colour={colour} value={curr} />;
              })}
          {mg == 2 &&
            Object.keys(genre)
              .filter((v) => v != null)
              .map((curr) => {
                const colour = `${genre[curr as Genre]}`;
                return <Tag colour={colour} value={curr} />;
              })}
        </section>
      </article>
    </article>
  );
};
