import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import Search from "./components/UI/Search";
import SideBar from "./components/UI/SideBar";
import Playlist from "./components/Pages/Playlist";
import TrendingSongs from "./components/Pages/TrendingSongs";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import ApplicationStore from "./store/Application-store";
import TrendingPlayLists from "./components/Pages/TrendingPlayLists";
import MoodGenre from "./components/Pages/MoodGenre";
import Liked from "./components/Pages/Liked";
import SearchPage from "./components/Pages/SearchPage";

function App() {
  const playing = ApplicationStore((state) => state.playing);
  return (
    <main
      className={`flex justify-between p-5 h-dvh ${
        playing ? "pb-[100px]" : ""
      }`}
    >
      <SideBar />
      <div className="flex flex-col flex-1">
        <Search />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/playlists/:id" element={<Playlist />} />
          <Route path="/tracks/trending" element={<TrendingSongs />} />
          <Route path="/playlists/trending" element={<TrendingPlayLists />} />
          <Route path="/categories" element={<MoodGenre />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/search/:id" element={<SearchPage />} />
        </Routes>
      </div>
      {playing && (
        <section className="fixed right-0 bottom-0 left-0">
          <AudioPlayer />
        </section>
      )}
    </main>
  );
}

export default App;
