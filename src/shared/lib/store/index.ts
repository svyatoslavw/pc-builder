import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { categorySlice } from "@/entities/category/model/category.slice"
import { productSlice } from "@/entities/product/model/product.slice"

const combinedReducers = combineReducers({
  product: productSlice.reducer,
  category: categorySlice.reducer
})

export const rootActions = {
  ...productSlice.actions,
  ...categorySlice.actions
}

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type TypeRootState = ReturnType<typeof combinedReducers>
