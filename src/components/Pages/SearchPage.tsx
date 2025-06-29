import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { SongI } from "../../types/global";
import Card from "../UI/Card";
import ApplicationStore from "../../store/Application-store";
import Loading from "../UI/Loading";
export default () => {
  const { id } = useParams();
  const loading = ApplicationStore((state) => state.loading);
  const setLoading = ApplicationStore((state) => state.setLoading);

  const [tracks, setTracks] = useState<SongI[]>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(
        "http://localhost:3000/tracks/search/categories/" + id
      );

      const songs: SongI[] = [];

      for (let song of result.data.tracks.data) {
        songs.push({
          id: song.id,
          title: song.title,
          artist: song.user.handle,
          mood: song.mood,
          tag: song.tags ? (song.tags as string).split(",") : null,
          artwork: song.artwork,
        });
      }
      setTracks(songs);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  return (
    <article className="overflow-scroll">
      <h2 className="text-3xl font-bold mb-10">You have searched for "{id}"</h2>
      <section className="grid grid-cols-5  gap-y-10 mx-auto ">
        {!loading &&
          tracks &&
          tracks.map((curr) => {
            return <Card curr={curr} image={2} isTrack />;
          })}

        {loading && Array.from({ length: 10 }).map(() => <Loading />)}
      </section>
    </article>
  );
};
