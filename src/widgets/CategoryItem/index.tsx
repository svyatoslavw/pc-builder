"use client"

import { CircleCheckIcon, CirclePlusIcon } from "lucide-react"
import { memo, useMemo } from "react"

import type { IBuild, ICategory } from "@/shared/lib/types"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

interface ICategoryItem {
  selectCategoryHandler: (table: ICategory["table"]) => void
  build: IBuild
  category: ICategory
}

const CategoryItem = memo(
  ({ category, build, selectCategoryHandler }: ICategoryItem) => {
    const isSelected = useMemo(() => build && build.components[category.table], [build, category.table])

    return (
      <Button
        onClick={() => selectCategoryHandler(category.table)}
        variant={"ghost"}
        className={cn(
          "px-2 py-1 cursor-default flex items-center justify-start gap-1.5 text-sm font-medium text-gray-500 rounded-lg transition hover:bg-neutral-200",
          {
            ["bg-neutral-100 text-black"]: isSelected
          }
        )}
      >
        {isSelected ? (
          <>
            <CircleCheckIcon size={20} /> <span className="2xl:flex xl:flex lg:flex hidden">{category.name}</span>
          </>
        ) : (
          <>
            <CirclePlusIcon size={20} /> <span className="2xl:flex xl:flex lg:flex hidden">{category.name}</span>
          </>
        )}
      </Button>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.build.components[prevProps.category.table] === nextProps.build.components[nextProps.category.table]
  }
)

CategoryItem.displayName = "CategoryItem"

export { CategoryItem }
