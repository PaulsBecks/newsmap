import { Button, Container } from "@mui/material";
import ArticleForm from "./ArticleForm";
import { useNavigate } from "react-router-dom";

export default function CreateArticle() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>Artikel hinzufügen</h1>
      <ArticleForm />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/articles")}
      >
        Anlegen
      </Button>
    </Container>
  );
}
