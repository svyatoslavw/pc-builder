import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo } from "react"

import { getPrevFromLS } from "../utils"

import { useActions } from "./useActions"
import { useTypedSelector } from "./useTypedSelector"
import { TypeProductDataFilters } from "@/entities/filter/model/filter.types"

export const useFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { updateQueryParam } = useActions()
  const { replace } = useRouter()

  const { queryParams, isFilterUpdated } = useTypedSelector((state) => state.filters)

  const updateParams = useCallback(
    (key: keyof TypeProductDataFilters, value: string) => {
      const newParams = new URLSearchParams(searchParams?.toString())

      if (value) {
        newParams.set(key, String(value))
      } else {
        newParams.delete(key)
      }

      replace(pathname + (newParams.toString() ? `?${newParams.toString()}` : ""))
      updateQueryParam({ key, value })
    },
    [pathname, searchParams, replace, updateQueryParam]
  )

  useEffect(() => {
    const prevState = getPrevFromLS()

    if (prevState) {
      updateParams("component", prevState)
    }
  }, [updateParams])

  useEffect(() => {
    searchParams?.forEach((value, key) => {
      updateParams(key as keyof TypeProductDataFilters, value)
    })
  }, [updateParams, searchParams])

  const values = useMemo(() => queryParams, [queryParams])

  return { updateQueryParams: updateParams, queryParams: values, isFilterUpdated }
}
