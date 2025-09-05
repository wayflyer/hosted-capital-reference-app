import { Card, Stack, Table, Text, Title } from "@mantine/core";
import { Fragment, useMemo, type CSSProperties } from "react";
import type { PaymentRow } from "./data";
import { MethodCell } from "./MethodCell";
import { Money } from "./Money";
import { NameCell } from "./NameCell";

export type RecentPaymentsCardProps = {
  period?: string;
  rows: PaymentRow[];
  fullHeight?: boolean;
};

const BORDER = "var(--mantine-color-gray-3)";
const cardFlexColumn: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "80px",
};

const buildTableCss = (border: string) => `
  .rp-table { border-collapse: separate; border-spacing: 0; width: 100%; }
  .rp-table thead th { border-bottom: 1px solid ${border}; }
  .rp-separator td { padding: 0; height: 0; }
  .rp-divider { height: 1px; width: 100%; background: ${border}; }
`;

export const RecentPaymentsCard = ({
  period = "Apr - Mar 2025",
  rows,
  fullHeight,
}: RecentPaymentsCardProps) => {
  const tableCss = useMemo(() => buildTableCss(BORDER), []);

  const groups = rows.reduce<Record<string, PaymentRow[]>>((acc, r) => {
    (acc[r.date] ||= []).push(r);
    return acc;
  }, {});
  const orderedDates = Object.keys(groups);

  return (
    <Card
      radius="lg"
      p="lg"
      shadow="sm"
      h={fullHeight ? "100%" : undefined}
      w="100%"
      style={cardFlexColumn}
    >
      <style>{tableCss}</style>

      <Stack gap="md">
        <div>
          <Title order={2} fw={500}>
            Recent payments
          </Title>
          <Text c="dimmed" size="sm">
            {period}
          </Text>
        </div>

        <Table
          className="rp-table"
          highlightOnHover={false}
          verticalSpacing="lg"
          withRowBorders={false}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: 110 }}>Date</Table.Th>
              <Table.Th>To/From</Table.Th>
              <Table.Th style={{ width: 160 }}>Amount</Table.Th>
              <Table.Th style={{ width: 180 }}>Account</Table.Th>
              <Table.Th style={{ width: 220 }}>Method</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {orderedDates.map((date, groupIdx) => {
              const items = groups[date];
              const rowSpan = items.length;
              const isLastGroup = groupIdx === orderedDates.length - 1;

              return (
                <Fragment key={date}>
                  {items.map((r, idx) => (
                    <Table.Tr key={`${date}-${r.name}-${idx}`}>
                      {idx === 0 && (
                        <Table.Td
                          rowSpan={rowSpan}
                          style={{ verticalAlign: "top" }}
                        >
                          <Text fw={500}>{date}</Text>
                        </Table.Td>
                      )}

                      <Table.Td style={{ minWidth: 0, overflow: "hidden" }}>
                        <NameCell
                          name={r.name}
                          avatar={r.avatar}
                          status={r.status}
                        />
                      </Table.Td>

                      <Table.Td>
                        <Money amount={r.amount} />
                      </Table.Td>

                      <Table.Td>
                        <Text>{r.account}</Text>
                      </Table.Td>

                      <Table.Td>
                        <MethodCell method={r.method} />
                      </Table.Td>
                    </Table.Tr>
                  ))}

                  {!isLastGroup && (
                    <Table.Tr className="rp-separator">
                      <Table.Td colSpan={5}>
                        <div className="rp-divider" />
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Fragment>
              );
            })}
          </Table.Tbody>
        </Table>
      </Stack>
    </Card>
  );
};
