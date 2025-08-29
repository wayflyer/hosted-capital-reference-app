import { Stack, Text } from "@mantine/core";

export type ProductRow = { name: string; percent: number; count?: number };

type Props = {
  rows: ProductRow[];
  barColor?: string;
  barHeight?: number;
  nameMinWidthPx?: number;
  reserveRightPx?: number;
};

export const SalesByProduct = ({
  rows,
  barColor = "#EAE9DE",
  barHeight = 12,
  nameMinWidthPx = 132,
  reserveRightPx = 96,
}: Props) => {
  return (
    <>
      <style>{`
        .sbp-row{
          display:flex;
          align-items:center;
          gap:24px;
        }
        .sbp-name{
          min-width:${nameMinWidthPx}px;
          white-space:nowrap;
        }
        .sbp-right{
          display:flex;
          align-items:center;
          gap:8px;
          flex:1 1 auto;
          min-width:0;
          --reserve:${reserveRightPx}px;
        }
        .sbp-bar{
          height:${barHeight}px;
          background:${barColor};
          max-width: calc(100% - var(--reserve));
          flex:0 0 auto;
        }
        .sbp-val{ white-space:nowrap; }

        @media (max-width: 640px){
          .sbp-row{ flex-direction:column; align-items:flex-start; gap:10px; }
          .sbp-name{ min-width:0; }
          .sbp-right{ width:100%; }
        }
      `}</style>

      <Stack gap="12">
        {rows.map((r) => {
          return (
            <div className="sbp-row" key={r.name}>
              <Text
                size="lg"
                className="sbp-name"
                fz="var(--font-size-sm, 15px)"
                fs="normal"
                fw={400}
                lh="150%"
              >
                {r.name}
              </Text>

              <div className="sbp-right">
                <div className="sbp-bar" style={{ width: `${r.percent}%` }} />
                <Text size="md" className="sbp-val">
                  {r.percent}%{r.count !== undefined ? ` (${r.count})` : ""}
                </Text>
              </div>
            </div>
          );
        })}
      </Stack>
    </>
  );
};
