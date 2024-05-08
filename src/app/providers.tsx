"use client"

import React from "react"
import { Provider } from "react-redux"

import { store } from "@/shared/lib/store"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}

export { Providers }
