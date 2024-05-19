import { useNavigate } from "react-router-dom";
import NewsList from "./NewsList";
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewsEntry from "../types/NewsEntry";
import styled from "styled-components";
import MapIcon from "@mui/icons-material/Map";

const AlignLeft = styled.div`
  display: flex;
  justify-items: flex-start;
  flex-direction: row;
  gap: 10px;
`;

export default function Articles() {
  const navigate = useNavigate();

  const news: NewsEntry[] = [
    {
      title: "Tolle Nachrichten",
      source: "Radio",
      url: "/newsmap/articles/1",
      thumbnailUrl: null,
      lon: 0,
      lat: 0,
      intensity: 0,
    },
    {
      title: "Super Story",
      source: "TV",
      url: "/newsmap/articles/1",
      thumbnailUrl: null,
      lon: 0,
      lat: 0,
      intensity: 0,
    },
    {
      title: "Breaking News",
      source: "Internet",
      url: "/newsmap/articles/1",
      thumbnailUrl: null,
      lon: 0,
      lat: 0,
      intensity: 0,
    },
  ];

  return (
    <Container>
      <h1>Artikel</h1>
      <AlignLeft>
        <Button
          onClick={() => navigate("/articles/new")}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Aktikel Hinzufügen
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => navigate("/")}
        >
          <MapIcon />
          Zur Karte
        </Button>
      </AlignLeft>
      <br />
      <NewsList news={news} />
    </Container>
  );
}
