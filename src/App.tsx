import { TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import NewsContainer from "./components/NewsContainer";
import NewsEntry from "./types/NewsEntry";
import newsData from "./data/news_data.json";

import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const map = useMap();
  const [bounds, setBounds] = useState(map.getBounds());
  const [regionalNews, setRegionalNews] = useState<NewsEntry[]>([]);

  useEffect(() => {
    map.addEventListener("moveend", () => setBounds(map.getBounds()));
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
    </div>
  );
}

export default App;
