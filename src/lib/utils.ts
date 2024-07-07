import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateMiddle(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  const separator = "...";
  const seperatorLength = separator.length;
  const charsToShow = maxLength - seperatorLength;

  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    str.substring(0, frontChars) +
    separator +
    str.substring(str.length - backChars)
  );
}
