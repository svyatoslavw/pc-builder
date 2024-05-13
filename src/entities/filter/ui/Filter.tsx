import React from "react"

import { CardHeader } from "@/shared/ui/card"

const Filter = ({ children }: { children: React.ReactNode }) => {
  return <CardHeader className="p-0 flex flex-row justify-end gap-2 items-end py-2">{children}</CardHeader>
}

export { Filter }
