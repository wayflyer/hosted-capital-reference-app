export type PaymentRow = {
  date: string;
  name: string;
  avatar?: { kind: "icon" | "letter"; value: string };
  amount: number;
  account: string;
  method:
    | { type: "wire"; label?: string }
    | { type: "transfer_out"; label?: string }
    | { type: "transfer_in"; label?: string }
    | { type: "card"; label?: string };
  status?: "cancelled";
};

export const RECENT_PAYMENTS_FIXTURES: PaymentRow[] = [
  {
    date: "Mar 23",
    name: "Google",
    avatar: { kind: "icon", value: "google" },
    amount: -2000,
    account: "Marketing",
    method: { type: "card", label: "Reggie Jones" },
  },
  {
    date: "Mar 23",
    name: "Elizabeth Windo",
    avatar: { kind: "letter", value: "EW" },
    amount: -500,
    account: "Operations",
    method: { type: "wire" },
  },
  {
    date: "Mar 22",
    name: "Checking •• 1234",
    avatar: { kind: "letter", value: "M" },
    amount: +542.5,
    account: "Marketing",
    method: { type: "transfer_out" },
  },
  {
    date: "Mar 22",
    name: "Marketing",
    avatar: { kind: "letter", value: "C" },
    amount: +2000,
    account: "Checking •• 1234",
    method: { type: "transfer_in" },
  },
  {
    date: "Mar 21",
    name: "Trustpilot",
    avatar: { kind: "letter", value: "★" },
    amount: +542.5,
    account: "Marketing",
    method: { type: "transfer_out" },
  },
  {
    date: "Mar 20",
    name: "Google Ads",
    avatar: { kind: "icon", value: "google" },
    amount: +542.5,
    account: "Marketing",
    method: { type: "transfer_out" },
    status: "cancelled",
  },
];
