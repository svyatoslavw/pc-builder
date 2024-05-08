import { useCallback } from "react"
import { useSelector } from "react-redux"

import type { TypeRootState } from "../store"

export const useTypedSelector = <TSelected = unknown>(
  selector: (state: TypeRootState) => TSelected
) => {
  const memoizedSelector = useCallback(selector, [])
  return useSelector<TypeRootState, TSelected>(memoizedSelector)
}
