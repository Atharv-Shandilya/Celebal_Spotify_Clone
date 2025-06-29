import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./PlayerStyle.css";
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import ApplicationStore from "../../store/Application-store";

export default () => {
  const playing = ApplicationStore((state) => state.playing);
  const liked = ApplicationStore((state) => state.likedTracks);
  const add = ApplicationStore((state) => state.likeTrack);
  const remove = ApplicationStore((state) => state.dislikeTrack);

  return (
    <article className="flex items-center card p-6 py-1">
      <div
        className="flex items-center absolute
      "
      >
        <img
          src={playing?.artwork[Object.keys(playing?.artwork)[0]]}
          className="w-[100px] p-4w-[100px] p-4"
        />
        <div>
          <h2 className="text-sm font-medium">{playing?.title}</h2>
          <p className="text-xs">{playing?.artist}</p>
        </div>
      </div>
      <H5AudioPlayer
        src={playing?.stream_link}
        layout={"stacked-reverse"}
        customControlsSection={[
          <Shuffle className=" text-gray-400 cursor-pointer" height={20} />,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.LOOP,
          <div className="ml-6 cursor-pointer">
            <Heart
              fill={liked[playing?.id as string] ? "white" : ""}
              onClick={() => {
                if (playing)
                  if (liked[playing?.id as string]) {
                    remove(playing.id);
                  } else {
                    add(playing);
                  }
              }}
            />
          </div>,
        ]}
        customIcons={{
          forward: (
            <SkipForward className="text-white" fill="white" height={15} />
          ),
          rewind: <SkipBack fill="white" height={15} className="text-white" />,
          play: (
            <div className="bg-white flex items-center justify-center rounded-full w-[35px] h-[35px] ">
              <Play fill="black" className="text-white" height={20} />
            </div>
          ),
          loop: <Repeat1 height={20} className="text-white" />,
          loopOff: <Repeat height={20} className="text-gray-400" />,
          pause: (
            <div className="bg-white flex items-center justify-center rounded-full w-[35px] h-[35px]">
              <Pause
                fill="black"
                className="text-black font-extralight"
                strokeWidth={0.5}
                height={16}
              />
            </div>
          ),
          volume: <Volume2 className="text-white" height={20} />,
          volumeMute: <VolumeX className="text-white" height={20} />,
        }}
        customProgressBarSection={[RHAP_UI.PROGRESS_BAR, RHAP_UI.VOLUME]}
      />
    </article>
  );
};
