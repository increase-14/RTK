import { Button, TextInput, Card, Stack, Title, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const correctPassword = "12345"; // PAROL

    if (password === correctPassword) {
      setIsAuth(true);
      navigate("/crud"); 
    } else {
      setError("Parol noto‘g‘ri!");
    }
  };

  return (
    <Card w={350} mx="auto" mt={100} p="lg" shadow="sm" withBorder>
      <Title order={3} ta="center" mb="md">
        Kirish
      </Title>

      <Stack>
        <TextInput
          label="Parol"
          type="password"
          placeholder="Parol kiriting"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Text c="red">{error}</Text>}

        <Button onClick={handleLogin}>Kirish</Button>
      </Stack>
    </Card>
  );
};

export default LoginPage;
