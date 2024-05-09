import { Dispatch, LegacyRef, SetStateAction, useEffect, useRef, useState } from "react"

type TypeOut = {
  ref: LegacyRef<HTMLDivElement>
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialVisible: boolean): TypeOut => {
  const [isActive, setIsActive] = useState(initialVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = (e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick, true)

    return () => {
      document.addEventListener("click", handleClick, true)
    }
  }, [])

  return { ref, isActive, setIsActive }
}
