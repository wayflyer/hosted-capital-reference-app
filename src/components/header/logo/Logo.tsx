import { Group, Image } from "@mantine/core";
import swiftcartLogo from "../../../assets/logo-swiftcart.svg";
import wayflyerLogo from "../../../assets/logo-wayflyer.svg";
import user from "../../../assets/user.svg";
import type { Theme } from "../../select-theme/theme";

const LOGOS: Record<Theme, { src: string; alt: string }> = {
  wayflyer: { src: wayflyerLogo, alt: "Wayflyer" },
  whiteLabel: { src: swiftcartLogo, alt: "SwiftCart" },
};

type LogoProps = {
  theme: Theme;
};

export const Logo = ({ theme }: LogoProps) => {
  const { src, alt } = LOGOS[theme];

  return (
    <Group justify="space-between" style={{ width: "170px" }}>
      <Image src={src} alt={alt} fit="contain" style={{ width: 105 }} />
      <Image src={user} alt="User" fit="contain" style={{ width: "32px" }} />
    </Group>
  );
};
