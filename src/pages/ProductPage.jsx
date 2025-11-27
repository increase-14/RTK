import { useParams } from "react-router-dom";
import API from "../api/API";
import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Badge,
  Anchor,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const ProductPage = () => {
  const { id } = useParams();

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await API.get(`/users/${id}`);
      return data;
    },
    enabled: !!id,
  });

  console.log(user);

  if (error) {
    <h1 style={{ color: "red" }}>{error.message}</h1>;
  }

  console.log(error);

  return (
    <div>
      <Container size="sm" my="xl">
        {isPending && "Loading..."}
        <Paper withBorder shadow="lg" p="xl" radius="md">
          <Stack align="center" gap="lg">
            <Title order={1} c="blue.6">
              {user?.name}
            </Title>

            <Badge size="xl" color="pink" variant="light">
              {user?.username}
            </Badge>

            <Stack gap="xs" align="start" w="100%">
              <Text fw={600}>Email:</Text>
              <Anchor href={`mailto:${user?.email}`} c="blue">
                {user?.email}
              </Anchor>

              <Text fw={600} mt="md">
                Телефон:
              </Text>
              <Text>{user?.phone}</Text>

              <Text fw={600} mt="md">
                Сайт:
              </Text>
              <Anchor
                href={`https://${user?.website}`}
                target="_blank"
                c="blue"
              >
                {user?.website}
              </Anchor>

              <Text fw={600} mt="md">
                Компания:
              </Text>
              <Text fs="italic" c="dimmed">
                {user?.company?.name}
              </Text>
              <Text size="sm" c="gray.6" ta="center">
                "{user?.company?.catchPhrase}"
              </Text>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default ProductPage;
