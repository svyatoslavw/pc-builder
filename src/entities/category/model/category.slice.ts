import { type PayloadAction, createSlice } from "@reduxjs/toolkit"

import type { IInitialState } from "./category.types"
import { EnumCategory } from "@/shared/lib/types"

const initialState: IInitialState = {
  name: EnumCategory.PROCESSOR
}

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<EnumCategory>) => {
      state.name = action.payload
    }
  }
})
