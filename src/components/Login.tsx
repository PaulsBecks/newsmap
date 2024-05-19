import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit() {
    navigate("/articles");
  }
  return (
    <Center>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
          />
        </CardContent>
        <CardContent>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Login
          </Button>
        </CardContent>
      </Card>
    </Center>
  );
}
