import axios from "axios";
import { create } from "zustand";
import type { Genre, Mood, SongI } from "../types/global";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PlaylistArtwork } from "@audius/sdk";

interface PlayingI extends SongI {
  stream_link: string;
}

interface ApplicationI {
  loading: boolean;
  trendingSongs: SongI[];
  moods: Record<Mood, string>;
  genre: Record<Genre, string>;
  playing: PlayingI | null;
  trendingPlaylists: any[];
  likedPlaylist: Record<string, PlaylistI>;
  likePlaylist: (p: PlaylistI) => void;
  dislikePlaylist: (id: string) => void;
  likedTracks: Record<string, SongI>;
  likeTrack: (t: SongI) => void;
  dislikeTrack: (id: string) => void;

  getForHomePage: () => void;
  setPlaying: (song: SongI) => void;
  setLoading: (v: boolean) => void;
}
interface PlaylistI {
  id: string;
  title: string;
  artwork: PlaylistArtwork;
  artist: string;
}

export default create<ApplicationI>()(
  persist(
    (set, get) => ({
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
      likedPlaylist: {},
      likedTracks: {},
      playing: null,

      getForHomePage: async () => {
        try {
          get().setLoading(true);
          const result = await axios.get(
            "https://discoveryprovider2.audius.co/v1/tracks/trending"
          );

          const result1 = await axios.get(
            "http://localhost:3000/playlists/trending"
          );

          const trendingSongs: SongI[] = [];

          for (let song of result.data.data) {
            trendingSongs.push({
              id: song.id,
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
              id: playlist.id,
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
        get().setLoading(false);
      },

      setPlaying: (song) => {
        let link = `https://discoveryprovider2.audius.co/v1/tracks/${song.id}/stream`;
        set((prev) => ({
          ...prev,
          playing: { ...song, stream_link: link },
        }));
      },

      likePlaylist: (p) => {
        set((prev) => ({
          ...prev,
          likedPlaylist: { ...prev.likedPlaylist, [p.id]: p },
        }));
      },

      dislikePlaylist: (id) => {
        set((prev) => {
          const removedPlaylist = { ...prev.likedPlaylist };
          delete removedPlaylist[id];

          return {
            ...prev,
            likedPlaylist: removedPlaylist,
          };
        });
      },
      likeTrack: (s) => {
        set((prev) => ({
          ...prev,
          likedTracks: { ...prev.likedTracks, [s.id]: s },
        }));
      },
      dislikeTrack: (id) => {
        set((prev) => {
          const removedTracks = { ...prev.likedTracks };
          delete removedTracks[id];

          return {
            ...prev,
            likedTracks: removedTracks,
          };
        });
      },
      loading: false,
      setLoading: (v) => set((prev) => ({ ...prev, loading: v })),
    }),

    {
      name: "saved",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        likedPlaylist: state.likedPlaylist,
        likedTracks: state.likedTracks,
        trendingTracks: state.trendingSongs,
        trendingPlaylist: state.trendingPlaylists,
      }),
    }
  )
);
