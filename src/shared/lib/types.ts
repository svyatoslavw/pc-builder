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

export interface IHardDrive {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  drive_size: string
}

export interface ISsd {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  ssd_size: string
}

export interface IPowerSupply {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  watt: string
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

export interface IOs {
  id: string
  name: string
  price: number
  image_url: string
  rating: number
  in_stock: boolean
  windows: string
}

export type IProduct = IProcessor | IMotherboard | IMemory | IGraphicsCard | IHardDrive | ISsd | IPowerSupply | ICase | IOs

export const enum EnumCategory {
  PROCESSOR = "processor",
  MOTHERBOARD = "motherboard",
  MEMORY = "memory",
  GRAPHICSCARD = "graphics_card",
  HARDDRIVE = "hard_drive",
  SSD = "ssd",
  POWERSUPPLY = "power_supply",
  CASE = "case",
  OS = "os"
}

export enum EnumOrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED"
}

export interface IComponent {
  processor: IProcessor | null
  motherboard: IMotherboard | null
  memory: IMemory | null
  graphics_card: IGraphicsCard | null
  hard_drive: IHardDrive | null
  ssd: ISsd | null
  power_supply: IPowerSupply | null
  case: ICase | null
  os: IOs | null
}

export interface IBuild {
  id: string
  name: string
  components: IComponent
  total: number
  success?: boolean
}

export interface ISystem {
  id: string
  name: string
  processor_id: string
  motherboard_id: string
  memory_id: string
  graphics_card_id: string
  hard_drive_id: string
  ssd_id: string
  power_supply_id: string
  case_id: string
  os_id: string
  total: number
  success: boolean
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

export interface IOrder {
  id: string
  user_id: string
  system_id: string
  status: EnumOrderStatus
}
