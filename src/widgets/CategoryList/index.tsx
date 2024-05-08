import { CategoryCard } from "@/entities/category/ui/CategoryCard"
import { EnumCategory } from "@/shared/lib/types"

const PC_COMPONENTS = [
  { id: "wdqder43167", name: "CPU", table: EnumCategory.PROCESSOR },
  { id: "54365238ffwe", name: "Motherboard", table: EnumCategory.MOTHERBOARD },
  { id: "32ed32g563", name: "Grapphics Card", table: EnumCategory.GRAPHICSCARD },
  { id: "45543dfdc343", name: "Memory", table: EnumCategory.MEMORY }
  // { key: "Hard Drives", value: "Hard Drives" },
  // { key: "Case/Housing", value: "Case/Housing" },
  // { key: "Power Supply", value: "Power Supply" },
  // { key: "Operating System", value: "Operating System" },
  // { key: "Software", value: "Software" },
  // { key: "Assembly", value: "Assembly" }
]

const CategoryList = () => {
  return (
    <div className="flex flex-col gap-1 my-2">
      {PC_COMPONENTS.map((category) => (
        <CategoryCard category={category} key={category.id} />
      ))}
    </div>
  )
}

export { CategoryList }
