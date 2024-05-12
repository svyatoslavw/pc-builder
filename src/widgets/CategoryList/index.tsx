import { EnumCategory } from "@/shared/lib/types"
import { CategoryItem } from "@/widgets/CategoryItem"

const PC_COMPONENTS = [
  { id: "wdqder43167", name: "CPU", table: EnumCategory.PROCESSOR },
  { id: "54365238ffwe", name: "Motherboard", table: EnumCategory.MOTHERBOARD },
  { id: "32ed32g563", name: "Grapphics Card", table: EnumCategory.GRAPHICSCARD },
  { id: "45543dfdc343", name: "Memory", table: EnumCategory.MEMORY },
  { id: "45643dasdfre", name: "Power Supply", table: EnumCategory.POWERSUPPLY },
  { id: "32432432423", name: "Hard Drive", table: EnumCategory.HARDDRIVE },
  { id: "45643dasdfre", name: "SSD", table: EnumCategory.SSD },
  { id: "4t4tfewrf43", name: "Case", table: EnumCategory.CASE },
  { id: "45643dasdfre", name: "Operating System", table: EnumCategory.OS }
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
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  )
}

export { CategoryList }
