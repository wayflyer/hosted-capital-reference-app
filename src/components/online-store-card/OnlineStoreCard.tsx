import { Button, Card, Group, Image, Title } from "@mantine/core";
import product from "../../assets/product.jpg";
import {
  SalesByProduct,
  type ProductRow,
} from "./sales-by-product/SalesByProduct";

type OnlineStoreCardProps = { rows: ProductRow[] };

export const OnlineStoreCard = ({ rows }: OnlineStoreCardProps) => {
  return (
    <Card
      radius="lg"
      p="lg"
      h="100%"
      w="100%"
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <Group justify="space-between" mb="md">
        <Title order={3} fw={500}>
          Your online store
        </Title>
        <Button variant="outline" size="xs">
          Preview site
        </Button>
      </Group>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100%",
          marginTop: "20px",
        }}
      >
        <Image src={product} alt="Store preview" fit="contain" />
      </div>

      <Title order={4} mt="lg" mb="md" fw={500}>
        Sales by product
      </Title>
      <SalesByProduct rows={rows} />
    </Card>
  );
};
