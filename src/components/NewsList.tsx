import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import NewsEntry from "../types/NewsEntry";

export default function NewsList({ news }: { news: NewsEntry[] }): JSX.Element {
  return (
    <>
      {news?.map((newsEntry: NewsEntry) => (
        <>
          <Card>
            <CardActionArea href={newsEntry.url}>
              <CardMedia
                sx={{ height: 140 }}
                image={newsEntry.thumbnailUrl}
                title=""
              />
              <CardContent>
                <Typography variant="body1">{newsEntry.title}</Typography>
                <Chip
                  spacing={1}
                  label={newsEntry.source}
                  size="small"
                  variant="outlined"
                />
              </CardContent>
            </CardActionArea>
          </Card>
          <br />
        </>
      ))}
    </>
  );
}
