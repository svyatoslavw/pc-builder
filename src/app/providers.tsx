"use client"

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import toast, { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { persistor, store } from "@/shared/lib/store"

const DEFAULT_ERROR = "Something went wrong"
const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (cause) => {
      const { message } = cause
      toast.error(message ?? DEFAULT_ERROR)
    }
  }),
  mutationCache: new MutationCache({
    onError: (cause) => {
      const { message } = cause
      toast.error(message ?? DEFAULT_ERROR)
    }
  })
})

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {children}
        </PersistGate>
        <Toaster toastOptions={{ iconTheme: { primary: "black", secondary: "white" } }} />
      </Provider>
    </QueryClientProvider>
  )
}

export { Providers }
