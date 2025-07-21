import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRepoName(name: string): string {
  // remove username from the repo name
  const parts = name.split("/");
  return parts.slice().join("-");

}
