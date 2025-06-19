import axios from "axios";
import { useEffect, useState } from "react";

import AudioPlayer from "../AudioPlayer/AudioPlayer";
export default () => {
  const [trending, setTrending] = useState<
    {
      title: string;
      id: string;
      artwork: Record<string, string>;
      handle: string;
    }[]
  >([]);

  const [selectedAudio, setSelectedAudio] = useState<{
    selectedAudio: string;
    title: string;
    artwork: Record<string, string>;
    handle: string;
  }>();

  useEffect(() => {
    const getSongsForHomePage = async () => {
      const result = await axios.get(
        "https://discoveryprovider2.audius.co/v1/tracks/trending"
      );
      const trendingSongs = [];

      for (let songs of result.data.data) {
        trendingSongs.push({
          title: songs.title,
          id: songs.id,
          artwork: songs.artwork,
          handle: songs.user.handle,
        });
      }

      setTrending(trendingSongs);
    };
    getSongsForHomePage();
  }, []);

  const playAudio = async (
    title: string,
    handle: string,
    artwork: Record<string, string>,
    id: string
  ) => {
    setSelectedAudio({
      title,
      handle,
      selectedAudio: `https://discoveryprovider2.audius.co/v1/tracks/${id}/stream`,
      artwork,
    });
  };
  return (
    <main className="p-4">
      <article>
        <h2 className="mb-6 text-3xl ml-10 font-medium">Trending</h2>
        <section className="grid grid-cols-5 gap-10 w-fit mx-auto ">
          {trending
            .filter((_, i) => i < 10)
            .map((curr) => {
              return (
                <div
                  className="w-[200px] overflow-hidden cursor-pointer hover:border p-2 rounded-lg "
                  key={curr.id}
                  onClick={() => {
                    playAudio(curr.title, curr.handle, curr.artwork, curr.id);
                  }}
                >
                  <img
                    src={curr.artwork["480x480"]}
                    className="rounded-2xl mb-4"
                  />
                  <h2 className=" text-sm text-nowrap mb-1">{curr.title}</h2>
                  <p className="text-xs text-gray-300">{curr.handle}</p>
                </div>
              );
            })}
        </section>
        {selectedAudio && (
          <section className="fixed right-0 bottom-0 left-0">
            <AudioPlayer
              selectedAudio={selectedAudio.selectedAudio}
              title={selectedAudio.title}
              handle={selectedAudio.handle}
              artwork={selectedAudio.artwork}
            />
          </section>
        )}
      </article>
    </main>
  );
};
