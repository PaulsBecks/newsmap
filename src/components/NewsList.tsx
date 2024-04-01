import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import NewsEntry from "../types/NewsEntry";

export default function NewsList({ news }: { news: NewsEntry[] }): JSX.Element {
  return (
    <>
      {news?.map((n: NewsEntry) => (
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
