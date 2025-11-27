import API from "../api/API";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const navigate = useNavigate();

  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async function getUsers() {
      const { data } = await API.get("/users");
      return data;
    },
    enabled: true,
  });

  return (
    <Container size="xl" py="xl">
      {isPending && "Loading..."}
      <Grid gutter="lg">
        {users?.map((user) => (
          <GridCol
            span={{ base: 12, sm: 6, lg: 4 }}
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            style={{ cursor: "pointer" }}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              h="100%"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Card cover"
                  fit="cover"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={700} size="lg" lineClamp={1}>
                  {user.name}
                </Text>
                <Badge color="pink" variant="light">
                  {user.phone}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" flex={1}>
                {user.address.city}
                <br />
                {user.address.street}
                <br />
                {user.address.suite}
                <br />
                {user.address.zipcode}
              </Text>

              <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                component="a"
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "auto" }}
              >
                {user.website}
              </Button>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
