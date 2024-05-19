import { TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import NewsContainer from "./components/NewsContainer";
import NewsEntry from "./types/NewsEntry";
import newsData from "./data/news_data.json";

import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import DrawerDraggingContext from "./context/DrawerDraggingContext";
import LoginIcon from "@mui/icons-material/Login";

import "leaflet/dist/leaflet.css";
import "./App.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function App() {
  const map = useMap();
  const [bounds, setBounds] = useState(map.getBounds());
  const [regionalNews, setRegionalNews] = useState<NewsEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    map.addControl;
    map.addEventListener("moveend", () => {
      //e.preventDefault();
      setBounds(map.getBounds());
    });
  }, [map]);

  useEffect(() => {
    const regionalNews = newsData
      ?.sort(
        (newsA: NewsEntry, newsB: NewsEntry) =>
          newsB.intensity - newsA.intensity
      )
      .filter((n: NewsEntry) => bounds.contains([n.lat, n.lon]));
    setRegionalNews(regionalNews);
  }, [bounds]);

  return (
    <div className="newsmap-map-container">
      <HeatmapLayer
        points={newsData}
        longitudeExtractor={(m: NewsEntry) => m.lon}
        latitudeExtractor={(m: NewsEntry) => m.lat}
        intensityExtractor={(m: NewsEntry) => m.intensity}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <NewsContainer news={regionalNews} />
      <LoginButton onClick={() => navigate("/login")} />
    </div>
  );
}

function LoginButton(props: { onClick: () => void }) {
  return (
    <div style={{ position: "absolute", top: 15, right: 15, zIndex: 1000 }}>
      <Button
        aria-label="delete"
        variant="contained"
        endIcon={<LoginIcon />}
        onClick={props.onClick}
      >
        Login
      </Button>
    </div>
  );
}

function Map() {
  const [isDrawerDragging, setIsDrawerDragging] = useState(false);
  console.log(isDrawerDragging);

  return (
    <DrawerDraggingContext.Provider
      value={{ isDrawerDragging, setIsDrawerDragging }}
    >
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        dragging={!isDrawerDragging}
      >
        <App />
      </MapContainer>
    </DrawerDraggingContext.Provider>
  );
}

export default Map;
