import { type PayloadAction, createSlice } from "@reduxjs/toolkit"

import { type IAddToConstructor, type IInitialState } from "./product.types"
import {
  EnumCategory,
  type IGraphicsCard,
  type IMemory,
  type IMotherboard,
  type IProcessor
} from "@/shared/lib/types"

const initialState: IInitialState = {
  processor: null,
  motherboard: null,
  memory: null,
  graphicsCard: null
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToConstructor: (state, action: PayloadAction<IAddToConstructor>) => {
      switch (action.payload.category) {
        case EnumCategory.PROCESSOR:
          state.processor = action.payload.component as IProcessor
          break
        case EnumCategory.MOTHERBOARD:
          state.motherboard = action.payload.component as IMotherboard
          break
        case EnumCategory.MEMORY:
          state.memory = action.payload.component as IMemory
          break
        case EnumCategory.GRAPHICSCARD:
          state.graphicsCard = action.payload.component as IGraphicsCard
          break
        default:
          break
      }
    },
    resetConstructor: (state) => {
      state.processor = null
      state.motherboard = null
      state.memory = null
      state.graphicsCard = null
    }
  }
})
