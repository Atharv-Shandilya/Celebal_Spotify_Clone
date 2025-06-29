import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default () => {
  const [search, setSearch] = useState<string>("");
  const navigation = useNavigate();
  return (
    <article className=" w-[500px] flex items-center px-5 py-2 rounded-lg mb-[40px] mx-auto bg-[#292929]">
      <Search className="mr-6" />
      <input
        className="w-full outline-none"
        placeholder="Search songs, albums, artists, podcasts"
        value={search}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            if (search != "")
              navigation("/search/" + search, { replace: true });
          }
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </article>
  );
};
