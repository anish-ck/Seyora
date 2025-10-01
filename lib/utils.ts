// lib/utils.ts
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Add other utility functions as needed
export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString();
};