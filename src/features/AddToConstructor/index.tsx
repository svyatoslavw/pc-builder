"use client"

import { CheckIcon, PlusIcon } from "lucide-react"
import { notFound, usePathname } from "next/navigation"
import toast from "react-hot-toast"

import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import { useFilter } from "@/shared/lib/hooks/useFilters"
import { IProduct } from "@/shared/lib/types"
import { getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const AddToConstructor = ({ product }: { product: IProduct }) => {
  const { addComponentToBuild } = useActions()
  const { queryParams } = useFilter()
  const builds = useTypedSelector((state) => state.builds)

  const pathname = usePathname()
  if (!pathname) return null

  const id = getBuildId(pathname)

  const state = builds.find((item) => item.id === id)
  if (!state) return notFound()

  const isSelectedProduct = state.components[queryParams.component]?.id === product.id

  const AddToConstructorHandler = () => {
    if (!isSelectedProduct) {
      addComponentToBuild({ id, component: product, category: queryParams.component })
      toast.success("Component added!")
    } else {
      addComponentToBuild({ id, component: null, category: queryParams.component })
      toast.error("Component removed!")
    }
  }

  return (
    <Button
      onClick={AddToConstructorHandler}
      variant={isSelectedProduct ? "default" : "outline"}
      className="absolute p-2 w-8 h-8 top-2 right-2 disabled:opacity-100"
    >
      {isSelectedProduct ? <CheckIcon color="white" size={16} /> : <PlusIcon color="gray" size={16} />}
    </Button>
  )
}

export { AddToConstructor }
