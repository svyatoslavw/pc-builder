"use client"

import { useQuery } from "@tanstack/react-query"
import { LoaderIcon } from "lucide-react"

import { ProductItem } from "../ProductItem"

import { EnumSortBy, TypeProductDataFilters } from "@/entities/filter/model/filter.types"
import { createClient } from "@/shared/api/client"
import { useFilter } from "@/shared/lib/hooks/useFilters"
import { IProduct } from "@/shared/lib/types"
import { CardContent } from "@/shared/ui/card"
import { Empty } from "@/shared/ui/empty"

interface ProductListProps {
  initialProducts: IProduct[]
}

async function getAll(searchParams: TypeProductDataFilters) {
  const { component, sortBy, minPrice, maxPrice } = searchParams
  const supabase = createClient()

  const orderColumn = sortBy === EnumSortBy.NEWEST ? "created_at" : sortBy === EnumSortBy.OLDEST ? "created_at" : "price"
  const orderAscending = sortBy === EnumSortBy.NEWEST || sortBy === EnumSortBy.LOW
  let query = supabase.from(`${component}`).select("*").order(orderColumn, { ascending: orderAscending })

  if (minPrice) query = query.gt("price", minPrice)

  if (maxPrice) query = query.lt("price", maxPrice)

  return ((await query).data as IProduct[]) || []
}

const ProductList = ({ initialProducts }: ProductListProps) => {
  const { isFilterUpdated, queryParams } = useFilter()

  const { data: products, isFetching } = useQuery({
    queryKey: ["build products", queryParams],
    queryFn: () => getAll(queryParams),
    initialData: initialProducts,
    enabled: isFilterUpdated
  })

  return (
    <CardContent className="overflow-y-auto grid grid-cols-4 gap-6 p-0">
      {!isFetching ? (
        products.length ? (
          products.map((products) => <ProductItem product={products} key={products.id} />)
        ) : (
          <Empty />
        )
      ) : (
        <div className="flex w-full h-[60vh] overflow-hidden items-center justify-center col-span-full">
          <LoaderIcon size={28} className="animate-spin" />
        </div>
      )}
    </CardContent>
  )
}

export { ProductList }
