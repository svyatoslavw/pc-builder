import type { EnumCategory, IBuild, ICase, IGraphicsCard, IMemory, IMotherboard, IProcessor } from "@/shared/lib/types"

export type IInitialState = IBuild[]

export type IUpdateConstructor = {
  id: string
  name: string
}

export type IAddToConstructor = {
  id: string
  category: EnumCategory
  component: IProcessor | IMotherboard | IGraphicsCard | IMemory | ICase | null
}
