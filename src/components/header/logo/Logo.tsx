import { Group, Image } from "@mantine/core";
import swiftcartLogo from "../../../assets/logo-swiftcart.svg";
import user from "../../../assets/user.svg";

export const Logo = () => (
  <Group justify="space-between" style={{ width: "170px" }}>
    <Image src={swiftcartLogo} alt="SwiftCart" fit="contain" style={{ width: 105 }} />
    <Image src={user} alt="User" fit="contain" style={{ width: "32px" }} />
  </Group>
);
