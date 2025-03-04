import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Suspense } from "react";
import Loader from "./components/Loader.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <App />
        </Provider>
      {/* <ErrorBoundary>
      </ErrorBoundary> */}
    </Suspense>
  </LocalizationProvider>
);
