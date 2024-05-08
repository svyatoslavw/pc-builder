import type {
  EnumCategory,
  IGraphicsCard,
  IMemory,
  IMotherboard,
  IProcessor
} from "@/shared/lib/types"

export interface IInitialState {
  processor: IProcessor | null
  motherboard: IMotherboard | null
  memory: IMemory | null
  graphicsCard: IGraphicsCard | null
}

export type IAddToConstructorCategory = "processor" | "motherboard" | "graphicsCard" | "memory"

export type IAddToConstructor = {
  category: EnumCategory
  component: IProcessor | IMotherboard | IGraphicsCard | IMemory
}
