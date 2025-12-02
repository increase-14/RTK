import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { API_DUMMY } from "../api/API3";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { login, isAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const { mutate: loginMut } = useMutation({
    mutationFn: async (body) => {
      const res = await API_DUMMY.post("/auth/login", body);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    loginMut(data, {
      onSuccess: (res) => {
        login(res);
        notifications.show({
          title: "Kirish muvaffaqiyatli!",
          color: "green",
        });
      },
      onError: (err) => {
        notifications.show({
          title: err.response?.data?.message || "Login yoki parol xato",
          color: "red",
        });
      },
    });
  };

  if (isAuth) return <Navigate to="/" replace />;

  return (
    <Container size="xs" my="xl">
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Kirish</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Username"
          placeholder="Username kiriting"
          {...register("username", { required: "Username to'ldirish shart" })}
          error={errors.username?.message}
          mb="md"
        />

        <PasswordInput
          label="Parol"
          placeholder="Parolni kiriting"
          {...register("password", { required: "Parol to'ldirish shart" })}
          error={errors.password?.message}
          mb="xl"
        />

        <Button
          type="submit"
          color="blue"
          fullWidth
          loading={isSubmitting}
          loaderProps={{ type: "dots" }}
        >
          Kirish
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
