import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import newstore from "./redux/newstore";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(newstore)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={newstore}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
