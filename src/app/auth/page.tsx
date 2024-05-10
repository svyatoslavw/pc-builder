import React from "react"

import { AuthForm } from "./components/AuthForm"

export default async function Auth() {
  return (
    <React.Suspense>
      <AuthForm />
    </React.Suspense>
  )
}
