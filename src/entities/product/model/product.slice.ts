import { type PayloadAction, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import { type IAddToConstructor, type IInitialState, IUpdateConstructor } from "./product.types"
import { EnumCategory, type IGraphicsCard, type IMemory, type IMotherboard, type IProcessor } from "@/shared/lib/types"
import { getPrice } from "@/shared/lib/utils"

const initialState: IInitialState = []

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createConstructor: (state) => {
      state.push({
        id: uuidv4(),
        name: "My System " + (state.length + 1),
        components: {
          processor: null,
          motherboard: null,
          graphics_card: null,
          memory: null
        },
        total: 0
      })
    },
    updateConstructor: (state, action: PayloadAction<IUpdateConstructor>) => {
      const { id, name } = action.payload
      const index = state.findIndex((build) => build.id === id)
      if (index !== -1) {
        state[index].name = name
      }
    },

    deleteConstructor: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.findIndex((build) => build.id === id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addToConstructor: (state, action: PayloadAction<IAddToConstructor>) => {
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
        build.total = 0
      }
    }
  }
})
