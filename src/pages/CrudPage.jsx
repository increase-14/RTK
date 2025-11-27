import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Title,
  TextInput,
  Button,
  Stack,
  Group,
  Card,
  Text,
  ActionIcon,
  Loader,
  Modal,
  Textarea,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash, IconEdit, IconInfoCircle } from "@tabler/icons-react";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const fetchPosts = async () => {
  const { data } = await api.get("/posts");
  return data.slice(0, 20);
};

const addPost = async (newPost) => {
  const { data } = await api.post("/posts", newPost);
  return data;
};

const updatePost = async ({ id, ...updated }) => {
  const { data } = await api.put(`/posts/${id}`, updated);
  return data;
};

const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};

const CrudPage = () => {
  const queryClient = useQueryClient();
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const addForm = useForm({
    initialValues: { title: "", body: "", userId: 1 },
    validate: {
      title: (v) => (!v.trim() ? "Sarlavha kiriting" : null),
      body: (v) => (!v.trim() ? "Matn kiriting" : null),
    },
  });

  const editForm = useForm({
    initialValues: { title: "", body: "", userId: 1 },
  });

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (old) => [
        { ...data, id: Date.now() },
        ...old,
      ]);
      addForm.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updated) => {
      queryClient.setQueryData(["posts"], (old) =>
        old.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditModalOpened(false);
      setEditingPost(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["posts"], (old) =>
        old.filter((p) => p.id !== id)
      );
    },
  });

  const openEditModal = (post) => {
    setEditingPost(post);
    editForm.setValues({
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
    setEditModalOpened(true);
  };

  const handleUpdate = (values) => {
    if (!editingPost) return;
    updateMutation.mutate({ id: editingPost.id, ...values });
  };

  if (isLoading) {
    return (
      <Loader size="xl" style={{ margin: "100px auto", display: "block" }} />
    );
  }

  return (
    <Container size="md" py="xl">
      <Title ta="center" mb="xl">
        CRUD
      </Title>

      <Card withBorder shadow="sm" p="lg" mb="xl">
        <Title order={3} mb="md">
          Yangi post qo‘shish
        </Title>
        <form onSubmit={addForm.onSubmit((v) => addMutation.mutate(v))}>
          <Stack gap="md">
            <TextInput
              label="Sarlavha"
              required
              {...addForm.getInputProps("title")}
            />
            <Textarea
              label="Matn"
              required
              minRows={4}
              {...addForm.getInputProps("body")}
            />
            <Button type="submit" loading={addMutation.isPending}>
              Qo‘shish
            </Button>
          </Stack>
        </form>
      </Card>

      <Title order={3} mb="md">
        Postlar ({posts.length})
      </Title>

      <Stack gap="md">
        {posts.map((post) => (
          <Card key={post.id} withBorder shadow="sm" p="md">
            <Group justify="space-between">
              <div style={{ flex: 1 }}>
                <Text fw={700} size="lg">
                  {post.title}
                </Text>
                <Text size="sm" c="dimmed" mt={4}>
                  {post.body}
                </Text>
                <Text size="xs" c="gray" mt={8}>
                  userId: {post.userId}
                </Text>
              </div>
              <Group gap="xs">
                <ActionIcon color="blue" onClick={() => openEditModal(post)}>
                  <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  onClick={() => deleteMutation.mutate(post.id)}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>

      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Postni tahrirlash"
      >
        <form onSubmit={editForm.onSubmit(handleUpdate)}>
          <Stack gap="md">
            <TextInput
              label="Sarlavha"
              required
              {...editForm.getInputProps("title")}
            />
            <Textarea
              label="Matn"
              required
              minRows={4}
              {...editForm.getInputProps("body")}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setEditModalOpened(false)}>
                Bekor qilish
              </Button>
              <Button type="submit" loading={updateMutation.isPending}>
                Saqlash
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default CrudPage;
