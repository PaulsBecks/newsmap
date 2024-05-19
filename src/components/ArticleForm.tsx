import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { MuiMarkdown } from "mui-markdown";
import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import articleExampleText from "../data/articleExampleText";

export default function ArticleForm() {
  const [articleText, setArticleText] = useState(articleExampleText);
  function handleArticleTextChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setArticleText(event.target.value);
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mb: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField label="Name" variant="outlined" fullWidth />
        <FormControl sx={{ mb: 1 }} fullWidth>
          <InputLabel id="employment-type-select-label">
            Arbeitsverhältnis
          </InputLabel>
          <Select
            labelId="employment-type-select-label"
            defaultValue={[]}
            label="Arbeitsverhältnis"
            fullWidth
          >
            <MenuItem value="free">Freier Journalist</MenuItem>
            <MenuItem value="permanent">Festangestellter</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Medienunternehmen" variant="outlined" fullWidth />
        <TextField label="Titel" variant="outlined" fullWidth />
        <TextField label="Thema" variant="outlined" fullWidth />
        <br />
        <FormControl sx={{ mb: 1 }} fullWidth>
          <InputLabel id="medium-select-label">Medium</InputLabel>
          <Select
            labelId="medium-select-label"
            defaultValue={[]}
            label="Medium"
            fullWidth
          >
            <MenuItem value="tv">TV</MenuItem>
            <MenuItem value="radio">Radio</MenuItem>
            <MenuItem value="newspaper">Zeitschrift</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} item>
            <TextField
              label="Artikel Text"
              aria-label="empty textarea"
              placeholder="Empty"
              multiline
              fullWidth
              onChange={handleArticleTextChange}
              value={articleText}
              minRows={3}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <Card>
              <CardContent>
                <MuiMarkdown
                  Highlight={Highlight}
                  themes={themes}
                  prismTheme={themes.github}
                >
                  {articleText}
                </MuiMarkdown>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
        <br />
      </div>
    </Box>
  );
}
