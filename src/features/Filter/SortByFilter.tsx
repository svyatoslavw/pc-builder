"use client"

import { ListFilterIcon } from "lucide-react"
import React from "react"

import { useFilter } from "@/shared/lib/hooks/useFilters"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu"

const SortByFilter = () => {
  const [position, setPosition] = React.useState("newest")

  const { updateQueryParams } = useFilter()

  const sortByHandler = (pos: string) => {
    setPosition(pos)
    updateQueryParams("sortBy", pos)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="items-center gap-1">
          <ListFilterIcon size={18} />
          Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={(pos) => sortByHandler(pos)}>
          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lowPrice">Low Price</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="highPrice">High Price</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SortByFilter }
