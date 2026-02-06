import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const toLink = (string: string) => string
    .replace(/([a-z])([A-Z])/g, "$1-$2")      // handle camelCase
    .replace(/[\s_]+/g, '-')                  // spaces and underscores to dashes
    .replace(/[^\w\-]+/g, '-')                // remove non-word characters except dash
    .replace(/--+/g, '-')                     // collapse multiple dashes
    .replace(/^-+|-+$/g, '')                  // trim dashes from start/end
    .toLowerCase();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
