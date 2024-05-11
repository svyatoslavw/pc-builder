import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { EnumCategory, IComponent } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBuildId(pathname: string) {
  return pathname.replace(/^\/i\/my-systems\//, "")
}

export function getPrice({ processor, motherboard, memory, case: pcCase, graphics_card }: IComponent) {
  return [processor, motherboard, memory, graphics_card, pcCase].filter(Boolean).reduce((total, value) => total + (value?.price || 0), 0)
}

export function getPrevFromLS() {
  const storedData = localStorage.getItem("filter_prev_state")
  return storedData ? JSON.parse(storedData) : null
}

export function setPrevToLS(state: EnumCategory) {
  localStorage.setItem("filter_prev_state", JSON.stringify(state))
}
