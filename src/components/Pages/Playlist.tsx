import type { PlaylistArtwork } from "@audius/sdk";
import axios from "axios";
import { ChevronRight, Heart, MoveLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import ApplicationStore from "../../store/Application-store";

export default () => {
  const { id } = useParams();

  const setPlaying = ApplicationStore((state) => state.setPlaying);
  const liked = ApplicationStore((state) => state.likedPlaylist);
  const add = ApplicationStore((state) => state.likePlaylist);
  const remove = ApplicationStore((state) => state.dislikePlaylist);

  const loading = ApplicationStore((state) => state.loading);
  const setLoading = ApplicationStore((state) => state.setLoading);

  const [playlist, selectPlaylist] = useState<{
    id: string;
    title: string;
    artwork: PlaylistArtwork;
    artist: string;
    totalTracks: number;
    playCount: number;
    tracks: any[];
  } | null>(null);
  useEffect(() => {
    async function getPlayistInfo() {
      setLoading(true);
      const result = await axios.get(`http://localhost:3000/playlists/${id}`);
      selectPlaylist(result.data.playlist);
      setLoading(false);
    }
    getPlayistInfo();
  }, []);

  console.log(playlist);

  return (
    <>
      <nav className="flex gap-x-4 items-center mb-[40px]">
        <NavLink to={"/"} className={"mr-10"}>
          <MoveLeft />
        </NavLink>
        <span className="opacity-60">Discovery</span>
        <ChevronRight height={16} width={16} />
        <span>Playlist</span>
      </nav>

      {
        <article className="flex items-stretch justify-between overflow-hidden h-fit max-h-[470px] gap-x-4 ">
          <article className="flex-1 flex items-center">
            {!loading && playlist && (
              <img src={playlist.artwork && playlist.artwork["_1000x1000"]} />
            )}

            {loading && <div className="bg-gray-300 w-full h-[470px] "></div>}
          </article>
          <article className="flex-1 flex flex-col ">
            <section className="flex items-center justify-between px-4">
              {!loading && playlist && (
                <>
                  <div>
                    <h2 className="font-semibold text-3xl mb-1">
                      {playlist.title}
                    </h2>
                    <section className="flex gap-x-2 items-center text-sm mb-4">
                      <p>{playlist.artist}</p>
                      <span className="w-1 h-1 bg-white rounded-full"></span>
                      <p>{playlist.totalTracks} songs</p>
                      <span className="w-1 h-1 bg-white rounded-full"></span>
                      <p>{playlist.playCount} views</p>
                    </section>
                  </div>
                  <div>
                    <Heart
                      className="cursor-pointer"
                      fill={liked[id as string] ? "white" : ""}
                      onClick={() => {
                        console.log(liked[id as string]);
                        if (liked[id as string]) {
                          remove(id as string);
                        } else {
                          add(playlist);
                        }
                      }}
                    />
                  </div>
                </>
              )}
              {loading && (
                <div className="relative -left-4">
                  <div className="bg-gray-500 w-[200px] h-6 rounded-full mb-4"></div>
                  <section className="flex gap-x-2 items-center text-sm mb-4">
                    <div className="bg-gray-400 w-[80px] h-2 rounded-full mr-1"></div>
                    <div className="bg-gray-400 w-[100px] h-2 rounded-full mr-1"></div>
                    <div className="bg-gray-400 w-[70px] h-2 rounded-full"></div>
                  </section>
                </div>
              )}
            </section>

            <section className="flex-1 flex flex-col h-full overflow-auto gap-y-2 no-scroll">
              {!loading &&
                playlist &&
                playlist.tracks.map((curr, i) => (
                  <div
                    className="px-4 py-2  rounded-lg flex items-center group cursor-pointer"
                    onClick={() => setPlaying(curr)}
                  >
                    <div className="mr-10 text-center">
                      <p className="group-hover:hidden ">
                        {i + 1 < 10 ? "0" : ""}
                        {i + 1}
                      </p>
                      <Play
                        className="hidden group-hover:block"
                        height={15}
                        width={15}
                      />
                    </div>
                    <p className="text-nowrap overflow-hidden w-[70%] text-ellipsis">
                      {curr.title}
                    </p>
                    <p className="ml-auto">
                      {Math.ceil(curr.duration / 60)}:
                      {curr.duration % 60 < 10
                        ? `0${curr.duration % 60}`
                        : curr.duration % 60}
                    </p>
                  </div>
                ))}

              {loading &&
                Array.from({ length: 8 }).map((curr, i) => (
                  <div className="px-3 py-3  rounded-lg flex items-center group cursor-pointer w-full bg-gray-300 ">
                    <div className="mr-10 text-center bg-gray-400 w-[30px] h-4 rounded-full"></div>
                    <div className="bg-gray-500 w-[100px] h-4 rounded-full"></div>
                    <div className="bg-gray-400 w-[50px] h-4 rounded-full ml-auto"></div>
                  </div>
                ))}
            </section>
          </article>
        </article>
      }
    </>
  );
};
