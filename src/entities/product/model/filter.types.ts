import { EnumCategory } from "@/shared/lib/types"

export type TypeProductDataFilters = {
  component: EnumCategory
  searchTerm?: string
  // page?: string | number
  // perPage: string | number
  // minPrice?: string
  // maxPrice?: string
  // categoryId?: string
  // genderId?: string
}

export interface IFilterState {
  isFilterUpdated: boolean
  queryParams: TypeProductDataFilters
}

export interface iFilterActiontsPayload {
  key: keyof TypeProductDataFilters
  value: string
}
