import ApplicationStore from "../../store/Application-store";
import type { Genre, Mood } from "../../types/global";
import Tag from "../UI/Tag";

export default () => {
  const moods = ApplicationStore((state) => state.moods);
  const genre = ApplicationStore((state) => state.genre);

  return (
    <article className="overflow-scroll">
      <h2 className="text-3xl font-bold mb-6">Search Based on Category</h2>

      <h3 className="text-xl mb-4 font-bold">Moods & Moments</h3>
      <section className="grid grid-cols-5 gap-3 mb-10">
        {Object.keys(moods)
          .filter((v) => v != null)
          .map((curr) => {
            const colour = `${moods[curr as Mood]}`;
            return <Tag colour={colour} value={curr} />;
          })}
      </section>

      <h3 className="text-xl mb-4 font-bold">Genres</h3>
      <section className="grid grid-cols-5 gap-3">
        {Object.keys(genre)
          .filter((v) => v != null)
          .map((curr) => {
            const colour = `${genre[curr as Genre]}`;
            return <Tag colour={colour} value={curr} />;
          })}
      </section>
    </article>
  );
};
