import {
  IconActivity,
  IconBell,
  IconBuildingBank,
  IconCashBanknote,
  IconCreditCard,
  IconFileText,
  IconHome,
  IconPackage,
  IconSettings,
  IconTag,
  IconUsers,
} from "@tabler/icons-react";

export const navigationItems = [
  { label: "Home", Icon: IconHome, active: true, path: "/" },
  { label: "Products", Icon: IconTag, path: "/products" },
  { label: "Orders", Icon: IconPackage },
  { label: "Customers", Icon: IconUsers },
  { label: "Marketing", Icon: IconActivity },
  { label: "Reports", Icon: IconFileText },
  { label: "Banking", Icon: IconBuildingBank },
  { label: "Payments", Icon: IconCreditCard },
  { label: "Financing", Icon: IconCashBanknote },
  { label: "Notifications", Icon: IconBell },
  { label: "Settings", Icon: IconSettings },
];
