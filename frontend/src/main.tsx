import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { getUsers, getMe, getWeather, getHeartbeat } from "./api";

getUsers().then((users) => console.log("users", users));
getMe().then((me) => console.log("me", me));
getWeather().then((weather) => console.log("weather", weather));
getHeartbeat().then((alive) => console.log("heartbeat", alive));
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
