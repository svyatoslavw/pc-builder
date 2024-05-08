"use client"

import { CircleCheckIcon, CirclePlusIcon } from "lucide-react"
import React from "react"

import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import type { ICategory } from "@/shared/lib/types"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const CategoryCard = React.memo(({ category }: { category: ICategory }) => {
  const { selectCategory } = useActions()
  const { product } = useTypedSelector((state) => state)

  const isCategorySelected = React.useMemo(() => product[category.table], [product, category.table])
  const handleClick = React.useCallback(() => {
    selectCategory(category.table)
  }, [category.table, selectCategory])
  return (
    <Button
      onClick={handleClick}
      variant={"ghost"}
      className={cn(
        "px-2 py-1 cursor-default flex items-center justify-start gap-1.5 text-sm font-medium text-gray-500 rounded-lg transition hover:bg-gray-100",
        {
          ["bg-blue-100 text-blue-600"]: isCategorySelected
        }
      )}
    >
      {isCategorySelected ? (
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

export { CategoryCard }
