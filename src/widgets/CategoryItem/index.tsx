"use client"

import { CircleCheckIcon, CirclePlusIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"

import { useTypedSelector } from "@/shared/lib/hooks"
import { useFilter } from "@/shared/lib/hooks/useFilters"
import type { ICategory } from "@/shared/lib/types"
import { cn, getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const CategoryItem = ({ category }: { category: ICategory }) => {
  const { updateQueryParams } = useFilter()

  const builds = useTypedSelector((state) => state.builds)

  const pathname = usePathname() || ""

  const id = getBuildId(pathname)
  const build = builds.find((item) => item.id === id)

  const isSelected = React.useMemo(() => build && build.components[category.table], [build, category.table])

  const selectCategoryHandler = () => {
    updateQueryParams("component", category.table)
  }

  return (
    <Button
      onClick={selectCategoryHandler}
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
          <CircleCheckIcon size={20} /> {category.name}
        </>
      ) : (
        <>
          <CirclePlusIcon size={20} /> {category.name}
        </>
      )}
    </Button>
  )
}

export { CategoryItem }
