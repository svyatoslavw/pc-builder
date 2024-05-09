"use client"

import { CheckIcon, PlusIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"

import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import { useFilter } from "@/shared/lib/hooks/useFilters"
import { IProduct } from "@/shared/lib/types"
import { getBuildId } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"

const AddToConstructor = React.memo(({ product }: { product: IProduct }) => {
  const pathname = usePathname()
  if (!pathname) return null

  const { addToConstructor } = useActions()
  const { queryParams } = useFilter()
  const products = useTypedSelector((state) => state.products)

  const id = getBuildId(pathname)
  const state = products.find((item) => item.id === id)

  const isSelectedProduct = state && state.components[queryParams.component]?.id === product.id

  const AddToConstructorHandler = React.useCallback(() => {
    if (!isSelectedProduct) {
      addToConstructor({ id, component: product, category: queryParams.component })
      // toast.success("Component added!")
    } else {
      addToConstructor({ id, component: null, category: queryParams.component })
      // toast.error("Component removed!")
    }
  }, [id, product, queryParams.component, isSelectedProduct])
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
