import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay = 500) {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const handler =
      setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}