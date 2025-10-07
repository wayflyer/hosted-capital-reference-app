import type { ReactNode } from 'react'
import { Drawer } from "@mantine/core";

type CustomDrawerProps = {
  opened: boolean;
  onClose: VoidFunction;
  title: string;
  children: ReactNode;
};

export const CustomDrawer = ({
  opened,
  onClose,
  title,
  children,
}: CustomDrawerProps) => (
  <Drawer.Root
    opened={opened}
    position="right"
    onClose={onClose}
  >
    <Drawer.Overlay />
    <Drawer.Content style={{ zIndex: 201 }}>
      <Drawer.Header>
        <Drawer.Title>{title}</Drawer.Title>
        <Drawer.CloseButton />
      </Drawer.Header>
      <Drawer.Body>
        {children}
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);
