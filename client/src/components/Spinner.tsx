import { ClipLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader size={50} color={"#6f52f4"} loading={true} />
    </div>
  );
}
