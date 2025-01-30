import React from "react";
import { RouterProvider } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { router } from "./router";

const App: React.FC = () => {
  useAuth();

  return (
    <div className="font-nunito">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
