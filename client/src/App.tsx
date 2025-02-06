import React from "react";
import { RouterProvider } from "react-router-dom";
import { useUserInfo } from "@/services/authService";
import { router } from "./router";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  useUserInfo();

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="font-nunito">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
