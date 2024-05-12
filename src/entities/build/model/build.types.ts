import type {
  EnumCategory,
  IBuild,
  ICase,
  IGraphicsCard,
  IHardDrive,
  IMemory,
  IMotherboard,
  IOs,
  IPowerSupply,
  IProcessor,
  ISsd
} from "@/shared/lib/types"

export type IInitialState = IBuild[]

export type IUpdateConstructor = {
  id: string
  name: string
}

export type IAddToConstructor = {
  id: string
  category: EnumCategory
  component: IProcessor | IMotherboard | IGraphicsCard | IMemory | IHardDrive | ISsd | IPowerSupply | IOs | ICase | null
}
