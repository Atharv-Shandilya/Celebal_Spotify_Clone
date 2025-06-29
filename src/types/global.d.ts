export type Mood =
  | "Empowering"
  | "Other"
  | "Cool"
  | "Defiant"
  | "Peaceful"
  | "Fiery"
  | "Gritty"
  | "Romantic"
  | "Sentimental"
  | "Energizing"
  | "Aggressive"
  | "Rowdy"
  | "Tender"
  | "Yearning"
  | "Sensual"
  | "Upbeat"
  | "Excited"
  | "Easygoing"
  | "Melancholy"
  | "Sophisticated";

export type Genre =
  | "Hip-Hop/Rap"
  | "Progressive House"
  | "Electronic"
  | "Techno"
  | "Dubstep"
  | "Hardstyle"
  | "Tech House"
  | "Deep House"
  | "Pop"
  | "Latin"
  | "World"
  | "House"
  | "Drum & Bass"
  | "Alternative"
  | "Downtempo"
  | "Rock"
  | "Lo-Fi"
  | "R&B/Soul"
  | "Hyperpop"
  | "Trap"
  | "Future Bass"
  | "Jersey Club"
  | "Soundtrack"
  | "Glitch Hop"
  | "Ambient"
  | "Experimental";

export interface SongI {
  id: string;
  title: string;
  artist: string;
  mood: string;
  tag: string[] | null;
  artwork: Record<string, string>;
}
