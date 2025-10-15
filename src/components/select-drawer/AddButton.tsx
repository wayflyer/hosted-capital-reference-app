import { Button, Flex } from "@mantine/core";

type AddButtonProps = {
  label: string;
  onClick: VoidFunction;
};

export const AddButton = ({ onClick, label }: AddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="subtle"
      color="#353A71"
      styles={{
        root: {
          paddingLeft: 12,
        },
        inner: {
          justifyContent: "flex-start",
        },
      }}
    >
      <Flex align="center" gap={5}>
        {label}
      </Flex>
    </Button>
  );
};
