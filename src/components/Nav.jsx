import { Button, Flex, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { API_DUMMY } from "../api/API3";
import { useEffect } from "react";

const Nav = () => {
  const { isAuth, user, logout, updateUser } = useAuthStore();

  const { data: freshUser } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await API_DUMMY.get("/auth/me");
      return res.data;
    },
    enabled: isAuth,
    retry: false,
  });

  useEffect(() => {
    if (freshUser) {
      updateUser(freshUser);
    }
  }, [freshUser, updateUser]);

  return (
    <Flex
      h={65}
      align="center"
      justify="space-between"
      px="xl"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Text size="28px" fw={800} c="dark">
        LOGO
      </Text>

      <Flex gap="30px" align="center">
        <NavLink
          to="/"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/crud"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          Crud
        </NavLink>

        <NavLink
          to="/faq"
          style={{ textDecoration: "none" }}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          Faq
        </NavLink>
      </Flex>

      <Flex align="center" gap="md">
        {isAuth ? (
          <>
            <Text c="gray.8" fw={500}>
              {user?.firstName || user?.username || "User"}
            </Text>
            <Button color="red" size="sm" onClick={logout}>
              Chiqish
            </Button>
          </>
        ) : (
          <NavLink
            to="/login"
            style={{ textDecoration: "none" }}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Kirish
          </NavLink>
        )}
      </Flex>
    </Flex>
  );
};

export default Nav;
