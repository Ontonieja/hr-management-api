import { ClipLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex z-50 justify-center items-center bg-white">
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={50} color={"#6f52f4"} loading={true} />
      </div>
    </div>
  );
}
