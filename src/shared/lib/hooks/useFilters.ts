import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { useActions } from "./useActions"
import { useTypedSelector } from "./useTypedSelector"
import { TypeProductDataFilters } from "@/entities/product/model/filter.types"

export const useFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { updateQueryParam } = useActions()
  const { replace } = useRouter()

  const { queryParams, isFilterUpdated } = useTypedSelector((state) => state.filters)

  useEffect(() => {
    searchParams?.forEach((value, key) => {
      updateQueryParam({
        key: key as keyof TypeProductDataFilters,
        value
      })
    })
  }, [])

  const updateQueryParams = (key: keyof TypeProductDataFilters, value: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())

    if (value) {
      newParams.set(key, String(value))
    } else {
      newParams.delete(key)
    }

    replace(pathname + (newParams.toString() ? `?${newParams.toString()}` : ""))
    updateQueryParam({ key, value })
  }

  return {
    updateQueryParams,
    queryParams,
    isFilterUpdated
  }
}
