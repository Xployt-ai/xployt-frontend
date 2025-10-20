import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRepoName(name: string): string {
  // URI-encode the repo identifier (e.g. "user/repo" -> "user%2Frepo")
  return encodeURIComponent(name);
}
