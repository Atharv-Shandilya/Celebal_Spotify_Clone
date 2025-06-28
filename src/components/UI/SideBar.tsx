import { Compass } from "lucide-react";
import { useLocation } from "react-router";

export default () => {
  const l = useLocation();

  return (
    <nav className=" w-[210px] mr-6">
      <h1 className="mb-[80px]">MusicFy</h1>
      <ul className="flex flex-col gap-y-2">
        <li
          className={` cursor-pointer flex items-center gap-x-4 px-3 py-2 rounded-lg ${
            l.pathname == "/" ? "border" : ""
          }`}
        >
          <Compass strokeWidth="1" />
          Discover
        </li>
      </ul>
    </nav>
  );
};
