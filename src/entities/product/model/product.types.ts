import type { EnumCategory, IGraphicsCard, IMemory, IMotherboard, IProcessor } from "@/shared/lib/types"

export type IInitialState = IBuild[]

export interface IBuild {
  id: string
  name: string
  components: IComponent
  total: number
}

export interface IComponent {
  processor: IProcessor | null
  motherboard: IMotherboard | null
  memory: IMemory | null
  graphics_card: IGraphicsCard | null
}

export type IUpdateConstructor = {
  id: string
  name: string
}

export type IAddToConstructor = {
  id: string
  category: EnumCategory
  component: IProcessor | IMotherboard | IGraphicsCard | IMemory | null
}
