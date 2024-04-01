import { useMap } from "react-leaflet";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import NewsEntry from "../types/NewsEntry";

export default function NewsList({ news }: { news: NewsEntry[] }): JSX.Element {
  const map = useMap();
  const [bounds, setBounds] = useState(map.getBounds());

  useEffect(() => {
    map.addEventListener("moveend", () => setBounds(map.getBounds()));
  }, [map]);

  const regionalNews = news
    ?.sort(
      (newsA: NewsEntry, newsB: NewsEntry) => newsB.intensity - newsA.intensity
    )
    .filter((n: NewsEntry) => bounds.contains([n.lat, n.lon]));

  return (
    <>
      {regionalNews?.map((n: NewsEntry) => (
        <>
          <Card>
            <CardActionArea href={n.url}>
              <CardMedia
                sx={{ height: 140 }}
                image={n.thumbnailUrl}
                title="green iguana"
              />
              <CardContent>
                <Typography variant="body1">{n.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <br />
        </>
      ))}
    </>
  );
}
