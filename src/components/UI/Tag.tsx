import axios from "axios";
import { useNavigate } from "react-router";

export default ({ value, colour }: { value: string; colour: string }) => {
  const navigate = useNavigate();

  return (
    <p
      className="bg-[#292929]  text-center py-3 rounded-lg relative overflow-hidden text-sm cursor-pointer"
      key={value}
      onClick={() => {
        navigate("/search/" + value);
      }}
    >
      <span
        className="absolute left-0 top-0 bottom-0 w-[6px] "
        style={{ backgroundColor: colour }}
      ></span>
      {value}
    </p>
  );
};
