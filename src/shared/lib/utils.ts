import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { IComponent } from "@/entities/product/model/product.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBuildId(pathname: string) {
  return pathname.replace(/^\/i\/systems\//, "")
}

export function getPrice({ processor, motherboard, memory, graphics_card }: IComponent) {
  return [processor, motherboard, memory, graphics_card].filter(Boolean).reduce((total, value) => total + (value?.price || 0), 0)
}
