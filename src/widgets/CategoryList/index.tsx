"use client"

import { createSelector } from "@reduxjs/toolkit"
import { usePathname } from "next/navigation"

import { useTypedSelector } from "@/shared/lib/hooks"
import { useFilter } from "@/shared/lib/hooks/useFilters"
import { EnumCategory, IBuild, ICategory } from "@/shared/lib/types"
import { getBuildId } from "@/shared/lib/utils"
import { CategoryItem } from "@/widgets/CategoryItem"

const PC_COMPONENTS = [
  { id: "wdqder43167", name: "CPU", table: EnumCategory.PROCESSOR },
  { id: "54365238ffwe", name: "Motherboard", table: EnumCategory.MOTHERBOARD },
  { id: "32ed32g563", name: "Grapphics Card", table: EnumCategory.GRAPHICSCARD },
  { id: "45543dfdc343", name: "Memory", table: EnumCategory.MEMORY },
  { id: "45643dasdfre", name: "Power Supply", table: EnumCategory.POWERSUPPLY },
  { id: "32432432423", name: "Hard Drive", table: EnumCategory.HARDDRIVE },
  { id: "wefewf", name: "SSD", table: EnumCategory.SSD },
  { id: "4t4tfewrf43", name: "Case", table: EnumCategory.CASE },
  { id: "fewfewfewfew", name: "Operating System", table: EnumCategory.OS }
]

const selectBuildById = createSelector(
  (state) => state.builds,
  (_, id) => id,
  (builds, id) => builds.find((item: IBuild) => item.id === id)
)

const CategoryList = () => {
  const { updateQueryParams } = useFilter()

  const pathname = usePathname() ?? ""
  const id = getBuildId(pathname)

  const build = useTypedSelector((state) => selectBuildById(state, id))

  const selectCategoryHandler = (table: ICategory["table"]) => {
    updateQueryParams("component", table)
  }

  return (
    <span className="flex flex-col gap-1 my-2">
      {PC_COMPONENTS.map((category) => (
        <CategoryItem build={build} selectCategoryHandler={selectCategoryHandler} category={category} key={category.id} />
      ))}
    </span>
  )
}

export { CategoryList }
