import { selectCurrentUser } from "@/store/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return <h1>Hello world</h1>;
}
