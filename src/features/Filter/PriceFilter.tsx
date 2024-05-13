"use client"

import { ArrowUpWideNarrowIcon } from "lucide-react"
import React from "react"

import { useFilter } from "@/shared/lib/hooks/useFilters"
import { debounce } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Input } from "@/shared/ui/input"

const PriceFilter = () => {
  const { updateQueryParams } = useFilter()

  const updateMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => updateQueryParams("minPrice", e.target.value), 700)()
  }

  const updateMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => updateQueryParams("maxPrice", e.target.value), 700)()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="items-center gap-1">
          <ArrowUpWideNarrowIcon size={18} />
          Price
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 px-2">
        <DropdownMenuLabel>Price</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Input onChange={(e) => updateMinPrice(e)} placeholder="From..." className="my-2" />
        <Input onChange={(e) => updateMaxPrice(e)} placeholder="To..." className="my-2" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { PriceFilter }
