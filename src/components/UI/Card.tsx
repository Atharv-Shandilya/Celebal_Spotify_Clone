import ApplicationStore from "../../store/Application-store";

export default ({
  curr,
  isTrack = false,
  image = 1,
}: {
  curr: any;
  isTrack?: boolean;
  image?: number;
}) => {
  const setPlaying = ApplicationStore((state) => state.setPlaying);
  return (
    <div
      className="w-[190px] overflow-hidden cursor-pointer hover:border p-2 rounded-lg "
      onClick={() => {
        if (isTrack) setPlaying(curr);
      }}
    >
      <img
        src={curr.artwork[(image == 2 ? "_" : "") + "480x480"]}
        className="rounded-2xl mb-4"
      />
      <h2 className=" text-sm text-nowrap mb-1">{curr.title}</h2>
      <p className="text-xs text-gray-300">{curr.artist}</p>
    </div>
  );
};
