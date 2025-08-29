import { Group, Text } from "@mantine/core";
import { navigationItems } from "./navigationItems";

export const Navigation = () => {
  return (
    <>
      {navigationItems.map((item) => (
        <Group
          px="md"
          justify="space-between"
          key={item.label}
          style={{ marginBottom: "24px" }}
        >
          <item.icon size={20} style={{ color: "#98A2B3" }} />
          <Group style={{ width: "70%" }}>
            <Text key={item.label} style={{ color: "#98A2B3", cursor: "auto" }}>
              {item.label}
            </Text>
          </Group>
        </Group>
      ))}
    </>
  );
};
