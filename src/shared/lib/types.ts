import type { LucideIcon } from "lucide-react"

export interface ISidebarItem {
  Icon: LucideIcon
  text: string
  active?: boolean
  alert?: boolean
  href: string
}

export interface IProcessor {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  cores: string
  threads: string
  ghz: number
}

export interface IMotherboard {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  sockets: string
  chipset: string
  compatible_ram: string
}
export interface IMemory {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  size: number
  type: string
  ghz: number
}

export interface IGraphicsCard {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  cooling: string
  memory_size: string
  memory_type: string
}

export interface ICase {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  form_factor: string
}

export type IProduct = IProcessor | IMotherboard | IMemory | IGraphicsCard | ICase

export const enum EnumCategory {
  PROCESSOR = "processor",
  MOTHERBOARD = "motherboard",
  MEMORY = "memory",
  GRAPHICSCARD = "graphics_card",
  CASE = "case"
}

export interface IComponent {
  processor: IProcessor | null
  motherboard: IMotherboard | null
  memory: IMemory | null
  graphics_card: IGraphicsCard | null
  case: ICase | null
}

export interface IBuild {
  id: string
  name: string
  components: IComponent
  total: number
}

export interface ICategory {
  id: string
  name: string
  table: EnumCategory
}

export interface IUser {
  id: string
  created_at: string
  email: string
  role: string
}
