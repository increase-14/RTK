import { Flex, Text } from "@mantine/core";

const Footer = () => {
  return (
    <Flex
      justify="center"
      align="center"
      p="lg"
      style={{
        borderTop: "1px solid var(--mantine-color-default-border)",
        backgroundColor: "var(--mantine-color-body)",
        minHeight: 70,
      }}
    >
      <Text size="sm" c="dimmed">
        © 2025 LOGO.
      </Text>
    </Flex>
  );
};

export default Footer;
