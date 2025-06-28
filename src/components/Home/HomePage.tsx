import { useEffect, useState } from "react";

import AudioPlayer from "../AudioPlayer/AudioPlayer";
import ApplicationStore from "../../store/Application-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Genre, Mood } from "../../types/global";
import { NavLink } from "react-router";
export default () => {
  const trendingSongs = ApplicationStore((state) => state.trendingSongs);
  const trendingPlaylists = ApplicationStore(
    (state) => state.trendingPlaylists
  );

  const getForHomePage = ApplicationStore((state) => state.getForHomePage);
  const setPlaying = ApplicationStore((state) => state.setPlaying);

  const playing = ApplicationStore((state) => state.playing);
  const moods = ApplicationStore((state) => state.moods);
  const genre = ApplicationStore((state) => state.genre);

  useEffect(() => {
    getForHomePage();
  }, []);

  const [mg, setmg] = useState(1);

  return (
    <article className=" flex-1 overflow-scroll no-scroll">
      <article className="mb-[80px]">
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

            <button>Show All</button>
          </div>
        </div>

        <section className="grid grid-cols-5 gap-3">
          {mg == 1 &&
            Object.keys(moods)
              .filter((v) => v != null)
              .map((curr) => {
                const colour = `${moods[curr as Mood]}`;
                return (
                  <p className="bg-[#292929]  text-center py-3 rounded-lg relative overflow-hidden text-sm cursor-pointer">
                    <span
                      className="absolute left-0 top-0 bottom-0 w-[6px] "
                      style={{ backgroundColor: colour }}
                    ></span>
                    {curr}
                  </p>
                );
              })}
          {mg == 2 &&
            Object.keys(genre)
              .filter((v) => v != null)
              .map((curr) => {
                const colour = `${genre[curr as Genre]}`;
                return (
                  <p className="bg-[#292929]  text-center py-3 rounded-lg relative overflow-hidden text-sm cursor-pointer">
                    <span
                      className="absolute left-0 top-0 bottom-0 w-[6px] "
                      style={{ backgroundColor: colour }}
                    ></span>
                    {curr}
                  </p>
                );
              })}
        </section>
      </article>
      <article className="mb-[80px]">
        <section>
          <div className="flex items-center justify-between ">
            <h2 className="mb-6 text-3xl  font-medium">Trending Songs</h2>
            <button>Show All</button>
          </div>

          <section className="grid grid-cols-5  mx-auto ">
            {trendingSongs
              .filter((_, i) => i < 5)
              .map((curr) => {
                return (
                  <div
                    className="w-[190px] overflow-hidden cursor-pointer hover:border p-2 rounded-lg "
                    key={curr.trackId}
                    onClick={() => {
                      setPlaying(curr);
                    }}
                  >
                    <img
                      src={curr.artwork["480x480"]}
                      className="rounded-2xl mb-4"
                    />
                    <h2 className=" text-sm text-nowrap mb-1">{curr.title}</h2>
                    <p className="text-xs text-gray-300">{curr.artist}</p>
                  </div>
                );
              })}
          </section>
        </section>
      </article>
      <article>
        <section>
          <div className="flex items-center justify-between ">
            <h2 className="mb-6 text-3xl  font-medium">Trending Playlists</h2>
            <button>Show All</button>
          </div>

          <section className="grid grid-cols-5 gap-5 ">
            {trendingPlaylists
              .filter((_, i) => i < 5)
              .map((curr) => {
                return (
                  <NavLink to={`/playlists/${curr.playlistId}`}>
                    <div
                      className="w-[190px] overflow-hidden cursor-pointer hover:border p-2 rounded-lg "
                      key={curr.trackId}
                    >
                      <img
                        src={curr.artwork["_480x480"]}
                        className="rounded-2xl mb-4"
                      />
                      <h2 className=" text-sm text-nowrap mb-1">
                        {curr.title}
                      </h2>
                      <p className="text-xs text-gray-300">{curr.artist}</p>
                    </div>
                  </NavLink>
                );
              })}
          </section>
        </section>
      </article>

      {playing && (
        <section className="fixed right-0 bottom-0 left-0">
          <AudioPlayer />
        </section>
      )}
    </article>
  );
};
