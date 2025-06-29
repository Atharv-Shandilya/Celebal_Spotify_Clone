import { Compass, Heart, LibraryBig } from "lucide-react";
import { NavLink, useLocation } from "react-router";

export default () => {
  const l = useLocation();

  return (
    <nav className=" w-[210px] mr-6 border-r-[0.5px] pr-5 ">
      <NavLink to={"/"}>
        <h1 className="mb-[80px] font-bold text-3xl">Beatr</h1>
      </NavLink>
      <ul className="flex flex-col gap-y-2">
        <NavLink to={"/"}>
          <li
            className={`flex items-center gap-x-4 px-3 py-2 rounded-lg ${
              l.pathname == "/" ? "border" : ""
            }`}
          >
            <Compass strokeWidth="1" />
            Discovery
          </li>
        </NavLink>
        <NavLink to={"/liked"}>
          <li
            className={`flex items-center gap-x-4 px-3 py-2 rounded-lg ${
              l.pathname == "/liked" ? "border" : ""
            }`}
          >
            <Heart />
            Favourites
          </li>
        </NavLink>

        <NavLink to={"/library"}>
          <li
            className={`flex items-center gap-x-4 px-3 py-2 rounded-lg ${
              l.pathname == "/library" ? "border" : ""
            }`}
          >
            <LibraryBig strokeWidth={1} />
            Library
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};
