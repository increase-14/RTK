import { Flex, Button, Text } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = ({ isAuth }) => {
  const navigate = useNavigate();

  return (
    <Flex
      justify="space-around"
      align="center"
      p="lg"
      style={{
        borderBottom: "1px solid var(--mantine-color-default-border)",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Text size="xl" fw={700}>
        LOGO
      </Text>

      <Flex gap="xl" align="center">
        <NavLink
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/crud"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
          }
        >
          Crud
        </NavLink>

        {!isAuth ? (
          <Button onClick={() => navigate("/login")} variant="filled">
            Login
          </Button>
        ) : (
          <Button
            color="red"
            variant="filled"
            onClick={() => window.location.reload()}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Nav;
