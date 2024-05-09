import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"

import { filtersSlice } from "@/entities/product/model/filter.slice"
import { productSlice } from "@/entities/product/model/product.slice"

const isClient = typeof window !== "undefined"

export const rootActions = {
  ...productSlice.actions,
  ...filtersSlice.actions
}

const combinedReducers = combineReducers({
  products: productSlice.reducer,
  filters: filtersSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
  const { persistReducer } = require("redux-persist")
  const storage = require("redux-persist/lib/storage").default

  const persistConfig = {
    key: "builder",
    storage
  }

  mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof combinedReducers>
