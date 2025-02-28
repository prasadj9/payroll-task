import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-bottom" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
