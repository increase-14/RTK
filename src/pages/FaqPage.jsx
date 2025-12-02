import React from "react";
import { API3 } from "../api/API3";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Accordion,
  TextInput,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../store/useAuthStore";

const FaqPage = () => {
  const queryClient = useQueryClient();
  const { isAuth } = useAuthStore();

  const { data: faqs = [] } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await API3.get("/faqs");
      return res.data.data;
    },
  });

  const { mutate: createFaq } = useMutation({
    mutationFn: async (body) => API3.post("/faqs", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      notifications.show({ title: "Yaratildi", color: "green" });
    },
    onError: () => notifications.show({ title: "Xatolik", color: "red" }),
  });

  const { mutate: deleteFaq } = useMutation({
    mutationFn: async (id) => API3.delete(`/faqs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      notifications.show({ title: "O'chirildi", color: "green" });
    },
    onError: () => notifications.show({ title: "Xatolik", color: "red" }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = e.target.question.value.trim();
    const answer = e.target.answer.value.trim();

    if (!question || !answer) return;

    createFaq({ question, answer });
    e.target.reset();
  };

  return (
    <Container my="xl">
      {isAuth && (
        <form onSubmit={handleSubmit}>
          <TextInput
            name="question"
            placeholder="Savol kiriting"
            mb="sm"
            required
          />
          <TextInput
            name="answer"
            placeholder="Javob kiriting"
            mb="md"
            required
          />
          <Button type="submit" color="blue">
            Qo'shish
          </Button>
        </form>
      )}

      <Accordion mt="xl">
        {faqs.map((faq, index) => (
          <Accordion.Item key={faq.id} value={String(faq.id)}>
            <Accordion.Control>
              <Group justify="space-between" wrap="nowrap">
                <Text fw={500}>
                  {index + 1}. {faq.question}
                </Text>

                {isAuth && (
                  <Button
                    size="compact-xs"
                    color="red"
                    variant="subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFaq(faq.id);
                    }}
                  >
                    O'chirish
                  </Button>
                )}
              </Group>
            </Accordion.Control>
            <Accordion.Panel>{faq.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {!isAuth && (
        <Text c="dimmed" ta="center" mt="xl">
          FAQ ni o'zgartirish uchun <strong>kirish</strong> kerak
        </Text>
      )}
    </Container>
  );
};

export default FaqPage;
