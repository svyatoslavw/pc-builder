"use client"

import { CheckIcon, PlusIcon } from "lucide-react"
import toast from "react-hot-toast"

import { useActions, useTypedSelector } from "@/shared/lib/hooks"
import { IProduct } from "@/shared/lib/types"
import { Button } from "@/shared/ui/button"

const AddToConstructor = ({ product }: { product: IProduct }) => {
  const { addToConstructor } = useActions()
  const { category, product: productState } = useTypedSelector((state) => state)

  const isSelectedProduct = productState[category.name] === product

  const AddToConstructorHandler = () => {
    addToConstructor({ component: product, category: category.name })
    toast.success("Component added successfully")
  }

  return (
    <Button
      onClick={AddToConstructorHandler}
      variant={isSelectedProduct ? "default" : "outline"}
      className="absolute p-2 w-8 h-8 top-2 right-2"
    >
      {isSelectedProduct ? (
        <CheckIcon color="white" size={16} />
      ) : (
        <PlusIcon color="gray" size={16} />
      )}
    </Button>
  )
}

export { AddToConstructor }
