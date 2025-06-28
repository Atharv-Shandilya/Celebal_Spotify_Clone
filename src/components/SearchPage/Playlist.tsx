import type { PlaylistArtwork } from "@audius/sdk";
import axios from "axios";
import { ChevronRight, MoveLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import ApplicationStore from "../../store/Application-store";

export default () => {
  const { id } = useParams();
  const playing = ApplicationStore((state) => state.playing);
  const setPlaying = ApplicationStore((state) => state.setPlaying);
  const [playlist, selectPlaylist] = useState<{
    id: string;
    title: string;
    artwork: PlaylistArtwork | undefined;
    artist: string;
    totalTracks: number;
    playCount: number;
    tracks: any[];
  } | null>(null);
  useEffect(() => {
    async function getPlayistInfo() {
      const result = await axios.get(`http://localhost:3000/playlists/${id}`);
      selectPlaylist(result.data.playlist);
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

      {playlist && (
        <article className="flex items-stretch justify-between  overflow-hidden h-fit max-h-[470px] gap-x-4 ">
          <article className="flex-1 flex items-center">
            <img
              src={playlist.artwork && playlist.artwork["_1000x1000"]}
              className="rounded-xl"
            />
          </article>
          <article className="flex-1 flex flex-col ">
            <h2 className="font-semibold text-3xl mb-1">{playlist.title}</h2>
            <section className="flex gap-x-2 items-center text-sm mb-4">
              <p>{playlist.artist}</p>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <p>{playlist.totalTracks} songs</p>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <p>{playlist.playCount} views</p>
            </section>
            <section className="flex-1 flex flex-col h-full overflow-auto gap-y-2 no-scroll">
              {playlist.tracks.map((curr, i) => (
                <div
                  className="px-4 py-2  rounded-lg flex items-center group cursor-pointer"
                  onClick={() => setPlaying(curr)}
                >
                  <div className="mr-10 text-center">
                    <p className="group-hover:hidden">
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
            </section>
          </article>
          {playing && (
            <section className="fixed right-0 bottom-0 left-0">
              <AudioPlayer />
            </section>
          )}
        </article>
      )}
    </>
  );
};
