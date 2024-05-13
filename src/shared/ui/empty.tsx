"use client"

import * as React from "react"

import { cn } from "../lib/utils"

import { Button } from "./button"
import { CardContent } from "./card"

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  reload?: boolean
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, reload = true, text = "Components not found!", ...props }, ref) => (
    <CardContent
      ref={ref}
      className={cn("grid w-full h-28 place-items-center border text-2xl col-span-full my-4 p-4 font-medium justify-center", className)}
      {...props}
    >
      {text}
      {reload && (
        <Button onClick={() => window.location.reload()} variant={"outline"} className="text-sm m-0 flex items-center gap-2">
          Please try to reload the page
        </Button>
      )}
    </CardContent>
  )
)
Empty.displayName = "Empty"

export { Empty }
