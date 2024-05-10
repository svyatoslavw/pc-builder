import { ProductCard } from "@/entities/build/ui/ProductCard"
import { AddToConstructor } from "@/features/AddToConstructor"
import type { IProduct } from "@/shared/lib/types"

const ProductItem = ({ product }: { product: IProduct }) => {
  return (
    <ProductCard product={product}>
      <AddToConstructor product={product} />
    </ProductCard>
  )
}

export { ProductItem }
