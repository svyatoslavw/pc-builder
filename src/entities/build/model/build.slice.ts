import { type PayloadAction, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import { type IAddToConstructor, type IInitialState, IUpdateConstructor } from "./build.types"
import {
  EnumCategory,
  type ICase,
  type IGraphicsCard,
  IHardDrive,
  type IMemory,
  type IMotherboard,
  IOs,
  IPowerSupply,
  type IProcessor,
  ISsd
} from "@/shared/lib/types"
import { getPrice } from "@/shared/lib/utils"

const initialState: IInitialState = []

export const buildSlice = createSlice({
  name: "builds",
  initialState,
  reducers: {
    createBuild: (state) => {
      state.push({
        id: uuidv4(),
        name: "My System " + (state.length + 1),
        components: {
          processor: null,
          motherboard: null,
          graphics_card: null,
          memory: null,
          hard_drive: null,
          ssd: null,
          power_supply: null,
          case: null,
          os: null
        },
        total: 0
      })
    },
    updateBuildName: (state, action: PayloadAction<IUpdateConstructor>) => {
      const { id, name } = action.payload
      const index = state.findIndex((build) => build.id === id)
      if (index !== -1) {
        state[index].name = name
      }
    },

    deleteBuild: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.findIndex((build) => build.id === id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addComponentToBuild: (state, action: PayloadAction<IAddToConstructor>) => {
      const { id, category, component } = action.payload
      const index = state.findIndex((build) => build.id === id)
      if (index !== -1) {
        const build = state[index]

        switch (category) {
          case EnumCategory.PROCESSOR:
            build.components.processor = build.components.processor === component ? null : (component as IProcessor)
            break
          case EnumCategory.MOTHERBOARD:
            build.components.motherboard = build.components.motherboard === component ? null : (component as IMotherboard)
            break
          case EnumCategory.MEMORY:
            build.components.memory = build.components.memory === component ? null : (component as IMemory)
            break
          case EnumCategory.GRAPHICSCARD:
            build.components.graphics_card = build.components.graphics_card === component ? null : (component as IGraphicsCard)
            break
          case EnumCategory.POWERSUPPLY:
            build.components.power_supply = build.components.power_supply === component ? null : (component as IPowerSupply)
            break
          case EnumCategory.HARDDRIVE:
            build.components.hard_drive = build.components.hard_drive === component ? null : (component as IHardDrive)
            break
          case EnumCategory.SSD:
            build.components.ssd = build.components.ssd === component ? null : (component as ISsd)
            break
          case EnumCategory.OS:
            build.components.os = build.components.os === component ? null : (component as IOs)
            break
          case EnumCategory.CASE:
            build.components.case = build.components.case === component ? null : (component as ICase)
            break

          default:
            break
        }
        build.total = getPrice(build.components)
      }
    },
    resetConstructor: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.findIndex((build) => build.id === id)
      if (index !== -1) {
        const build = state[index]

        build.components.processor = null
        build.components.motherboard = null
        build.components.memory = null
        build.components.graphics_card = null
        build.components.power_supply = null
        build.components.hard_drive = null
        build.components.processor = null
        build.components.case = null
        build.components.ssd = null
        build.components.os = null
        build.total = 0
      }
    }
  }
})
