import { combineReducers, configureStore, createSelector } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"

import { buildSlice } from "@/entities/build/model/build.slice"
import { filtersSlice } from "@/entities/filter/model/filter.slice"

const isClient = typeof window !== "undefined"

export const rootActions = {
  ...buildSlice.actions,
  ...filtersSlice.actions
}

const combinedReducers = combineReducers({
  builds: buildSlice.reducer,
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
export const createAppSelector = createSelector.withTypes<TypeRootState>()
