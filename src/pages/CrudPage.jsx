import React, { useState } from "react";
import API2 from "../api/API2";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash, IconEdit } from "@tabler/icons-react";

const fetchPosts = async () => {
  const { data } = await API2.get("/posts");
  return data.data || [];
};

const addPost = async (newPost) => {
  const { data } = await API2.post("/posts", newPost);
  return data;
};

const updatePost = async ({ id, ...updated }) => {
  const { data } = await API2.put(`/posts/${id}`, updated);
  return data;
};

const deletePost = async (id) => {
  await API2.delete(`/posts/${id}`);
};

const CrudPage = () => {
  const queryClient = useQueryClient();
  const [editModal, setEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const addForm = useForm({
    initialValues: { title: "", content: "", author: "Noma'lum" },
  });

  const editForm = useForm({
    initialValues: { title: "", content: "", author: "" },
  });

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      addForm.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setEditModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const openEdit = (post) => {
    setEditingPost(post);
    editForm.setValues({
      title: post.title,
      content: post.content,
      author: post.author || "Xato",
    });
    setEditModal(true);
  };

  const handleUpdate = (values) => {
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
        <Title order={3}>Post qo‘shish</Title>
        <form onSubmit={addForm.onSubmit((v) => addMutation.mutate(v))}>
          <Stack gap="md" mt="md">
            <TextInput
              label="Sarlavha"
              required
              {...addForm.getInputProps("title")}
            />
            <Textarea
              label="Matn"
              required
              {...addForm.getInputProps("content")}
            />
            <TextInput label="Muallif" {...addForm.getInputProps("author")} />
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
              <div>
                <Text fw={600}>{post.title}</Text>
                <Text size="sm" c="dimmed">
                  {post.content}
                </Text>
                {post.author && (
                  <Text size="xs" c="gray.6">
                    — {post.author}
                  </Text>
                )}
              </div>
              <Group gap="xs">
                <ActionIcon color="blue" onClick={() => openEdit(post)}>
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
        opened={editModal}
        onClose={() => setEditModal(false)}
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
              {...editForm.getInputProps("content")}
            />
            <TextInput label="Muallif" {...editForm.getInputProps("author")} />
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setEditModal(false)}>
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
