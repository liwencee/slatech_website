import { type ClassValue, clsx } from "clsx";

// Utility for conditionally joining classNames
// Install: npm install clsx
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
