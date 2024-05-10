import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { IFilterState, iFilterActiontsPayload } from "./filter.types"
import { EnumCategory } from "@/shared/lib/types"
import { setPrevToLS } from "@/shared/lib/utils"

const initialState: IFilterState = {
  isFilterUpdated: false,
  queryParams: {
    component: EnumCategory.PROCESSOR,
    searchTerm: ""
  }
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateQueryParam: (state, action: PayloadAction<iFilterActiontsPayload>) => {
      const { key, value } = action.payload
      if (key === "component") {
        state.queryParams[key] = value as EnumCategory
        setPrevToLS(state.queryParams[key])
      } else {
        state.queryParams[key] = value
      }

      state.isFilterUpdated = true
    },
    resetFilterUpdate: (state) => {
      state.isFilterUpdated = false
    }
  }
})
