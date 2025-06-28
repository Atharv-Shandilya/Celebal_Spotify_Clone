import { Search } from "lucide-react";

export default () => {
  return (
    <article className=" w-[500px] flex items-center px-5 py-2 rounded-lg mb-[40px] mx-auto bg-[#292929]">
      <Search className="mr-6" />
      <input
        className="w-full outline-none"
        placeholder="Search songs, albums, artists, podcasts"
      />
    </article>
  );
};
