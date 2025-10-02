import type { ReactNode } from "react";
import { useIsRestoring } from "@tanstack/react-query";

export const HydrationGate = ({ children }: { children: ReactNode }) => {
  const isRestoring = useIsRestoring();

  if (isRestoring) return null;

  return children;
};