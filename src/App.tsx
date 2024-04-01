import { MapContainer, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import NewsContainer from "./components/NewsContainer";
import NewsEntry from "./types/NewsEntry";
import newsData from "./data/news_data.json";

import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  return (
    <div className="newsmap-map-container">
      <MapContainer
        center={[51.163375, 10.447683]}
        zoom={7}
        scrollWheelZoom={false}
      >
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
        <NewsContainer news={newsData} />
      </MapContainer>
    </div>
  );
}

export default App;
