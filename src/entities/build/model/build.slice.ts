import { type PayloadAction, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import { type IAddToConstructor, type IInitialState, IUpdateConstructor } from "./build.types"
import { EnumCategory, type ICase, type IGraphicsCard, type IMemory, type IMotherboard, type IProcessor } from "@/shared/lib/types"
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
          case: null
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
        build.components.case = null
        build.total = 0
      }
    }
  }
})
