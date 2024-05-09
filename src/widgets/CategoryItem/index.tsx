"use client"

import { CircleCheckIcon, CirclePlusIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"

import { useTypedSelector } from "@/shared/lib/hooks"
import { useFilter } from "@/shared/lib/hooks/useFilters"
import type { ICategory } from "@/shared/lib/types"
import { cn, getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const CategoryItem = React.memo(({ category }: { category: ICategory }) => {
  const pathname = usePathname()
  if (!pathname) return null

  const { updateQueryParams } = useFilter()
  const products = useTypedSelector((state) => state.products)

  const id = getBuildId(pathname)
  const product = products.find((item) => item.id === id)

  const isSelected = React.useMemo(() => product && product.components[category.table], [product])

  const selectCategoryHandler = () => {
    updateQueryParams("component", category.table)
  }

  return (
    <Button
      onClick={selectCategoryHandler}
      variant={"ghost"}
      className={cn(
        "px-2 py-1 cursor-default flex items-center justify-start gap-1.5 text-sm font-medium text-gray-500 rounded-lg transition hover:bg-gray-100",
        {
          ["bg-blue-100 text-blue-600 hover:text-blue-600 hover:bg-blue-200"]: isSelected
        }
      )}
    >
      {isSelected ? (
        <>
          <CircleCheckIcon size={20} /> {category.name}
        </>
      ) : (
        <>
          <CirclePlusIcon size={20} /> {category.name}
        </>
      )}
    </Button>
  )
})

export { CategoryItem }