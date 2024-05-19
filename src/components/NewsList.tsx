import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import NewsEntry from "../types/NewsEntry";
import { Fragment } from "react/jsx-runtime";

export default function NewsList({ news }: { news: NewsEntry[] }): JSX.Element {
  return (
    <>
      {news?.map((newsEntry: NewsEntry) => (
        <Fragment key={newsEntry.url}>
          <Card key={newsEntry.url}>
            <CardActionArea href={newsEntry.url}>
              {newsEntry.thumbnailUrl !== null && (
                <CardMedia
                  sx={{ height: 140 }}
                  image={newsEntry.thumbnailUrl}
                  title=""
                />
              )}
              <CardContent>
                <Typography variant="body1">{newsEntry.title}</Typography>
                <Chip
                  label={newsEntry.source}
                  size="small"
                  variant="outlined"
                />
              </CardContent>
            </CardActionArea>
          </Card>
          <br />
        </Fragment>
      ))}
    </>
  );
}
