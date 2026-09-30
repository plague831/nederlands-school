import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Склеює класи й розв'язує конфлікти Tailwind-утиліт. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
