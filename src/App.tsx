import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/Home/HomePage";
import Search from "./components/UI/Search";
import SideBar from "./components/UI/SideBar";
import Playlist from "./components/SearchPage/Playlist";

function App() {
  return (
    <main className="flex justify-between p-5 h-dvh">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Search />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/playlists/:id" index element={<Playlist />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
