import { EnumCategory } from "@/shared/lib/types"

export enum EnumSortBy {
  NEWEST = "newest",
  OLDEST = "oldest",
  LOW = "lowPrice",
  HIGH = "highPrice"
}

export type TypeProductDataFilters = {
  component: EnumCategory
  searchTerm?: string
  // page?: string | number
  // perPage: string | number
  sortBy?: EnumSortBy
  minPrice?: string
  maxPrice?: string
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
