import { ProductItem } from "../ProductItem"

import { IProduct } from "@/shared/lib/types"
import { Card } from "@/shared/ui/card"
import { Empty } from "@/shared/ui/empty"

interface ProductListProps {
  products: IProduct[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Card className="filter border-none rounded-none overflow-y-auto p-6 grid grid-cols-4 w-full test gap-6">
      {products.length ? products.map((products) => <ProductItem product={products} key={products.id} />) : <Empty />}
    </Card>
  )
}

export { ProductList }
