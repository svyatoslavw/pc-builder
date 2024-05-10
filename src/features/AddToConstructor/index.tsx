"use client"

import { CheckIcon, PlusIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import { useFilter } from "@/shared/lib/hooks/useFilters"
import { IProduct } from "@/shared/lib/types"
import { getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const AddToConstructor = React.memo(({ product }: { product: IProduct }) => {
  const pathname = usePathname()
  if (!pathname) return null

  const { addComponentToBuild } = useActions()
  const { queryParams } = useFilter()
  const builds = useTypedSelector((state) => state.builds)

  const id = getBuildId(pathname)
  const state = builds.find((item) => item.id === id)

  const isSelectedProduct = React.useMemo(() => state && state.components[queryParams.component]?.id === product.id, [product, state])

  const AddToConstructorHandler = React.useCallback(() => {
    if (!isSelectedProduct) {
      addComponentToBuild({ id, component: product, category: queryParams.component })
      toast.success("Component added!")
    } else {
      addComponentToBuild({ id, component: null, category: queryParams.component })
      toast.error("Component removed!")
    }
  }, [id, isSelectedProduct])
  return (
    <Button
      onClick={AddToConstructorHandler}
      variant={isSelectedProduct ? "default" : "outline"}
      className="absolute p-2 w-8 h-8 top-2 right-2 disabled:opacity-100"
    >
      {isSelectedProduct ? <CheckIcon color="white" size={16} /> : <PlusIcon color="gray" size={16} />}
    </Button>
  )
})

export { AddToConstructor }
