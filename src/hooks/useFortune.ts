import { useState, useCallback } from 'react'

interface UseFortuneReturn<T> {
  result: T | null
  loading: boolean
  error: string | null
  calculate: () => void
  reset: () => void
  setLoading: (v: boolean) => void
  setResult: (r: T | null) => void
  setError: (e: string | null) => void
}

export function useFortune<T>(calcFn: () => T | Promise<T>): UseFortuneReturn<T> {
  const [result, setResult] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await calcFn()
      setResult(res)
    } catch (e) {
      setError(e instanceof Error ? e.message : '计算出错，请重试')
    } finally {
      setLoading(false)
    }
  }, [calcFn])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, loading, error, calculate, reset, setLoading, setResult, setError }
}
