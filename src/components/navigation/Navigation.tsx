import { Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";

import { navigationItems } from "./navigationItems";

export const Navigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      {navigationItems.map(({ label, path, Icon }) => (
        <Group
          px="md"
          justify="space-between"
          key={label}
          style={{ marginBottom: "24px" }}
          onClick={() => handleNavigate(path)}
        >
          <Icon size={20} style={{ color: "#161517" }} />
          <Group style={{ width: "70%" }}>
            <Text key={label} style={{ color: "#161517", cursor: "pointer" }}>
              {label}
            </Text>
          </Group>
        </Group>
      ))}
    </>
  );
};
