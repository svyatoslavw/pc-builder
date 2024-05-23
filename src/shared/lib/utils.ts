import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { EnumCategory, IComponent } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBuildId(pathname: string) {
  return pathname.replace(/^\/my-systems\//, "")
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

export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null

  return function (this: any, ...args: any[]) {
    const context = this

    const later = () => {
      timeout = null
      func.apply(context, args)
    }

    clearTimeout(timeout!)
    timeout = setTimeout(later, wait)
  }
}

export function formatDate(value: string) {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  const formattedDate = year + "-" + month + "-" + day
  return formattedDate
}
