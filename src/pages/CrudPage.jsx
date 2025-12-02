import React, { useEffect } from "react";
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Button,
  Paper,
  Group,
  Text,
  ActionIcon,
  Stack,
  Card,
  Divider,
  Loader,
  Center,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import useAuthStore from "../store/useAuthStore";

const CrudPage = () => {
  const { cruds = [], load, add, remove } = useAuthStore();

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const question = form.question.value.trim();
    const answer = form.answer.value.trim();

    if (question && answer) {
      add(question, answer);
      form.reset();
    }
  };

  return (
    <Container size="md" my="xl">
      <Title order={1} align="center" mb="xl" c="blue">
        CRUD
      </Title>

      <Paper withBorder shadow="md" p="xl" radius="lg" mb="xl">
        <form onSubmit={handleAdd}>
          <Stack gap="md">
            <TextInput
              name="question"
              label="Savol"
              placeholder="Savol kiriting..."
              required
              size="md"
            />
            <Textarea
              name="answer"
              label="Javob"
              placeholder="Javob yozing..."
              required
              minRows={4}
              autosize
              size="md"
            />
            <Button type="submit" color="blue" size="md" radius="md" fullWidth>
              Qo'shish
            </Button>
          </Stack>
        </form>
      </Paper>

      {cruds.length === 0 ? (
        <Center h={200}>
          <Text c="dimmed" size="lg">
            Hozircha hech narsa yo'q
          </Text>
        </Center>
      ) : (
        <Stack gap="md">
          {cruds.map((item) => (
            <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Text fw={600} size="lg" mb={4}>
                    {item.question}
                  </Text>
                  <Text c="dimmed">{item.answer}</Text>
                </div>

                <ActionIcon
                  color="red"
                  variant="subtle"
                  size="lg"
                  onClick={() => remove(item.id)}
                >
                  <IconTrash size={20} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default CrudPage;
