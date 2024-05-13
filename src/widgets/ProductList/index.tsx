import { ProductItem } from "../ProductItem"

import { IProduct } from "@/shared/lib/types"
import { CardContent } from "@/shared/ui/card"
import { Empty } from "@/shared/ui/empty"

interface ProductListProps {
  products: IProduct[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <CardContent className="overflow-y-auto grid grid-cols-4 gap-6 p-0">
      {products.length ? products.map((products) => <ProductItem product={products} key={products.id} />) : <Empty />}
      {products.length ? products.reverse().map((products) => <ProductItem product={products} key={products.id} />) : <Empty />}
      {products.length ? products.map((products) => <ProductItem product={products} key={products.id} />) : <Empty />}
    </CardContent>
  )
}

export { ProductList }
