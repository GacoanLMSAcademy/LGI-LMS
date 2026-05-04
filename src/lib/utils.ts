import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLGI(pre: number, post: number): number {
  if (pre >= 100) return 0;
  return ((post - pre) / (100 - pre)) * 100;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}
