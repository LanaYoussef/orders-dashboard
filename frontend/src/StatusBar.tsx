import { useEffect, useState } from "react";
import { getHeartbeat, getMe, getWeather } from "./api";
import type { Weather } from "./types";

type Props = {
  onAdd: () => void;
};
export default function statusBar({ onAdd }: Props) {
  const [welcome, setWelcome] = useState("welcome");
  const [heartbeat, setHeartbeat] = useState("heartbeat...");
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      if (user.firstName) setWelcome(`Welcome ${user.firstName}`);
    });
  }, []);

  useEffect(() => {
    async function loadHeartbeat() {
      const alive = await getHeartbeat();
      setHeartbeat(alive ? "alive" : "dead");
    }
    loadHeartbeat();
    const id = setInterval(loadHeartbeat, 3000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    async function loadWeather() {
      const data = await getWeather();
      if (data) setWeather(data);
    }
    loadWeather();
    const id = setInterval(loadWeather, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="form1">
      <h3>{welcome}</h3>
      <p className="heartbeat">{heartbeat}</p>
      <p className="city">{weather?.city ?? "City"}</p>
      <p className="temp">{weather?.temp ?? "Temp"}</p>
      <p className="humidity">{weather?.humidity ?? "Humidity"}</p>
      <p className="wind">{weather?.wind ?? "Wind"}</p>
      <button className="btn btn-primary" type="button" onClick={onAdd}>
        Add User
      </button>
    </div>
  );
}
