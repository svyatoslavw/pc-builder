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

// export interface IProduct {
//   id: string
//   name: string
//   price: number
//   image_url: string
//   rating: number
//   in_stock: boolean
//   cores: string
//   threads: string
//   ghz: number
//   size: number
//   type: string
//   cooling: string
//   memory_size: string
//   memory_type: string
//   sockets: string
//   chipset: string
//   compatible_ram: string
// }

export type IProduct = IProcessor | IMotherboard | IMemory | IGraphicsCard

export const enum EnumCategory {
  PROCESSOR = "processor",
  MOTHERBOARD = "motherboard",
  MEMORY = "memory",
  GRAPHICSCARD = "graphics_card"
}

export interface ICategory {
  id: string
  name: string
  table: EnumCategory
}
