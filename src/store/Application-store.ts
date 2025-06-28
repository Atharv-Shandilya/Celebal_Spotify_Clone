import { darwinia } from "./../../node_modules/viem/chains/definitions/darwinia";
import axios from "axios";
import { create } from "zustand";
import type { Genre, Mood } from "../types/global";

interface SongI {
  trackId: string;
  title: string;
  artist: string;
  mood: string;
  tag: string[] | null;
  artwork: Record<string, string>;
}

interface PlayingI extends SongI {
  stream_link: string;
}

interface ApplicationI {
  trendingSongs: SongI[];
  moods: Record<Mood, string>;
  genre: Record<Genre, string>;
  playing: PlayingI | null;
  trendingPlaylists: any[];
  getForHomePage: () => void;
  setPlaying: (song: SongI) => void;
}
interface PlaylistI {
  playlistId: string;
  title: string;
  artwork: Record<string, string>;
  artist: string;
}

export default create<ApplicationI>()((set) => ({
  trendingSongs: [],
  trendingPlaylists: [],
  moods: {
    Empowering: "#3B6EF6",
    Other: "#C0C0C0",
    Cool: "#20B2AA",
    Defiant: "#FF3131",
    Peaceful: "#6FCF97",
    Fiery: "#FF7F11",
    Gritty: "#555555",
    Romantic: "#C2185B",
    Sentimental: "#B497BD",
    Energizing: "#FFD600",
    Aggressive: "#B80000",
    Rowdy: "#00BFFF",
    Tender: "#FFB6C1",
    Yearning: "#4B0082",
    Sensual: "#800020",
    Upbeat: "#32FF7A",
    Excited: "#FF40A1",
    Easygoing: "#87CEEB",
    Melancholy: "#6A5ACD",
    Sophisticated: "#FFFFFF",
  },
  genre: {
    "Hip-Hop/Rap": "#FFD700",
    "Progressive House": "#00FFFF",
    Electronic: "#9400D3",
    Techno: "#00FF00",
    Dubstep: "#FF00FF",
    Hardstyle: "#FF6600",
    "Tech House": "#20B2AA",
    "Deep House": "#1E90FF",
    Pop: "#FF69B4",
    Latin: "#FF0000",
    World: "#FF8C00",
    House: "#FFFF00",
    "Drum & Bass": "#7CFC00",
    Alternative: "#40E0D0",
    Downtempo: "#87CEEB",
    Rock: "#B22222",
    "Lo-Fi": "#B0E0E6",
    "R&B/Soul": "#9370DB",
    Hyperpop: "#FF00CC",
    Trap: "#4B0082",
    "Future Bass": "#00BFFF",
    "Jersey Club": "#FF4500",
    Soundtrack: "#8A2BE2",
    "Glitch Hop": "#7FFF00",
    Ambient: "#3CB371",
    Experimental: "#FF1493",
  },
  playing: null,

  getForHomePage: async () => {
    try {
      const result = await axios.get(
        "https://discoveryprovider2.audius.co/v1/tracks/trending"
      );

      const result1 = await axios.get(
        "http://localhost:3000/playlists/trending"
      );

      const trendingSongs: SongI[] = [];

      for (let song of result.data.data) {
        trendingSongs.push({
          trackId: song.id,
          title: song.title,
          artwork: song.artwork,
          artist: song.user.handle,
          tag: song.tags ? song.tags.split(",") : null,
          mood: song.mood,
        });
      }
      const trendingPlaylists: PlaylistI[] = [];

      for (let playlist of result1.data.data) {
        trendingPlaylists.push({
          playlistId: playlist.id,
          title: playlist.playlistName,
          artwork: playlist.artwork,
          artist: playlist.user.handle,
        });
      }

      set((prev) => ({
        ...prev,
        trendingSongs,
        trendingPlaylists,
      }));
    } catch (err) {
      console.log(err);
    }
  },

  setPlaying: (song) => {
    let link = `https://discoveryprovider2.audius.co/v1/tracks/${song.trackId}/stream`;
    set((prev) => ({
      ...prev,
      playing: { ...song, stream_link: link },
    }));
  },
}));
